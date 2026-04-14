import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import {
  handleMercadoPagoWebhook,
  verifyMercadoPagoWebhookSignature,
} from "./mercadoPago";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // CORS configuration
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
  }));
  // Configure body parser with larger size limit for file uploads and save raw body for webhook signature validation
  app.use(express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      (req as any).rawBody = buf;
    },
  }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  app.post("/api/mercadopago/webhook", async (req, res) => {
    const signature =
      req.headers["x-hub-signature"] ||
      req.headers["x-hub-signature-256"] ||
      req.headers["x-mp-signature"] ||
      req.headers["x-hub-signature-sha256"];
    const rawBody = (req as any).rawBody;

    console.info("[MercadoPago] Webhook received", {
      path: req.path,
      method: req.method,
      signature: signature ? "present" : "missing",
      rawBodyLength: rawBody ? rawBody.length : 0,
    });

    if (!(await verifyMercadoPagoWebhookSignature(signature, rawBody))) {
      console.warn("[MercadoPago] Webhook signature validation failed", {
        signature,
      });
      return res.sendStatus(400);
    }

    try {
      await handleMercadoPagoWebhook(req.body);
      console.info("[MercadoPago] Webhook processed successfully");
      res.sendStatus(200);
    } catch (error) {
      console.error("[MercadoPago] Webhook processing failed:", error);
      res.sendStatus(200);
    }
  });

  // Rate limiting for API endpoints
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });

  // tRPC API
  app.use(
    "/api/trpc",
    apiLimiter,
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
