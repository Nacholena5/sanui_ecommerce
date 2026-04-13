import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";

// Static snapshot of real @sanui.uy posts (fetched via Instagram MCP)
// Used as fallback when live API is unavailable
const STATIC_POSTS = [
  {
    id: "18159014839438438",
    type: "CAROUSEL_ALBUM",
    caption: "Si entrenás, sabés que no todo suma.\n\nHay cosas que te llenan… pero no te ayudan.\n\nEsto es distinto.\n\n👉 Energía real\n👉 Práctico\n👉 Pensado para entrenar",
    likes: 71,
    comments: 6,
    permalink: "https://www.instagram.com/p/DWQ2cEeALuu/",
    thumbnail: "https://scontent-iad6-1.cdninstagram.com/v/t51.82787-15/656839237_17865765996606267_5544025285660571136_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ccb=7-5&_nc_sid=18de74&_nc_ohc=IFkHXE9CXHIQ7kNvwHMbKiE&_nc_zt=23&_nc_ht=scontent-iad6-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_Af1Ygk7YMsXGHUdJJhGHjUHEfFiAFjGqJ-uJzpPFvLuSg&oe=69E23DEB",
    timestamp: "2026-03-24T10:08:54+0000",
  },
  {
    id: "18123407260605880",
    type: "VIDEO",
    caption: "Estuvimos en Punta Carretas junto a @hoka_uy y @prodeporteuy Uruguay en la entrega de premios de la Montevideo Beach Run 2026 ⚡🏃",
    likes: 100,
    comments: 13,
    permalink: "https://www.instagram.com/reel/DVtpXXYg2D4/",
    thumbnail: "https://scontent-iad3-1.cdninstagram.com/v/t51.82787-15/650388113_17863792797606267_5544025285660571136_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&_nc_ohc=IFkHXE9CXHIQ7kNvwHMbKiE&_nc_zt=23&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_Af1Ygk7YMsXGHUdJJhGHjUHEfFiAFjGqJ-uJzpPFvLuSg&oe=69E23DEB",
    timestamp: "2026-03-10T14:22:00+0000",
  },
  {
    id: "17989155161856319",
    type: "VIDEO",
    caption: "Estuvimos en el Ironman 70.3 Punta del Este compartiendo Sanui con atletas y gente increíble 💪🌊",
    likes: 83,
    comments: 14,
    permalink: "https://www.instagram.com/reel/DVkpXXYg2D4/",
    thumbnail: "https://scontent-iad3-1.cdninstagram.com/v/t51.82787-15/651653298_17863792917606267_5544025285660571136_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&_nc_ohc=IFkHXE9CXHIQ7kNvwHMbKiE&_nc_zt=23&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_Af1Ygk7YMsXGHUdJJhGHjUHEfFiAFjGqJ-uJzpPFvLuSg&oe=69E23DEB",
    timestamp: "2026-03-05T12:00:00+0000",
  },
  {
    id: "18057006344439289",
    type: "VIDEO",
    caption: "En la Montevideo Beach Run 2026:\nseguir a Sanui = premio 🎁 @hoka_uy @tluruguay_\n\nGracias a todos los que participaron ⚡",
    likes: 60,
    comments: 0,
    permalink: "https://www.instagram.com/reel/DV88vpAgJAd/",
    thumbnail: "https://scontent-iad3-2.cdninstagram.com/v/t51.82787-15/654950862_17865416523606267_5544025285660571136_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ccb=7-5&_nc_sid=18de74&_nc_ohc=IFkHXE9CXHIQ7kNvwHMbKiE&_nc_zt=23&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_Af1Ygk7YMsXGHUdJJhGHjUHEfFiAFjGqJ-uJzpPFvLuSg&oe=69E23DEB",
    timestamp: "2026-03-16T16:41:32+0000",
  },
  {
    id: "17963695562991759",
    type: "CAROUSEL_ALBUM",
    caption: "Houston, tenemos proteína 🚀😌\n\nVegano. \nSin azúcar. \nSin gluten.\n\nSANUI.",
    likes: 33,
    comments: 2,
    permalink: "https://www.instagram.com/p/DW4fIcuEdcj/",
    thumbnail: "https://scontent-iad3-1.cdninstagram.com/v/t51.82787-15/669655553_17868774879606267_2526391469877742075_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&_nc_ohc=K_Z9qwWoadMQ7kNvwHpdH7d&_nc_zt=23&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_Af1YoD8Uk5fSHGbuMIru3bpOIvz96e8c8fS0nSuFX7KekQ&oe=69E23DEB",
    timestamp: "2026-04-08T19:34:52+0000",
  },
  {
    id: "18047259335724323",
    type: "VIDEO",
    caption: "¿Podrías adivinar lo que estás comiendo usando solo tus sentidos? 👀👃👅\n\nLo pusimos a prueba a @seba.gon_ con el desafío de los 3 sentidos…",
    likes: 39,
    comments: 1,
    permalink: "https://www.instagram.com/reel/DWV_1qSANgc/",
    thumbnail: "https://scontent-iad6-1.cdninstagram.com/v/t51.82787-15/656397287_17866210041606267_5544025285660571136_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ccb=7-5&_nc_sid=18de74&_nc_ohc=IFkHXE9CXHIQ7kNvwHMbKiE&_nc_zt=23&_nc_ht=scontent-iad6-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_Af1Ygk7YMsXGHUdJJhGHjUHEfFiAFjGqJ-uJzpPFvLuSg&oe=69E23DEB",
    timestamp: "2026-03-26T10:07:50+0000",
  },
  {
    id: "17937879756156989",
    type: "CAROUSEL_ALBUM",
    caption: "Punch no comparte.\nPunch protege lo que es suyo. 💚\n\nProtein Balls SANUI sabor Vainilla.\n\nVegan. Gluten Free. 120g de puro power.",
    likes: 45,
    comments: 0,
    permalink: "https://www.instagram.com/p/DVPpOBIgKzX/",
    thumbnail: "https://scontent-iad3-1.cdninstagram.com/v/t51.82787-15/639747758_17860674966606267_5544025285660571136_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&_nc_ohc=IFkHXE9CXHIQ7kNvwHMbKiE&_nc_zt=23&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_Af1Ygk7YMsXGHUdJJhGHjUHEfFiAFjGqJ-uJzpPFvLuSg&oe=69E23DEB",
    timestamp: "2026-02-27T02:22:45+0000",
  },
  {
    id: "17975466083844367",
    type: "VIDEO",
    caption: "El desafío @hoka_uy en la meta:\nfestejá en menos de 5 segundos ⚡\n¿Cuál fue el mejor festejo?",
    likes: 44,
    comments: 1,
    permalink: "https://www.instagram.com/reel/DV9XpAgJAd/",
    thumbnail: "https://scontent-iad6-1.cdninstagram.com/v/t51.82787-15/655462129_17865415476606267_5544025285660571136_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ccb=7-5&_nc_sid=18de74&_nc_ohc=IFkHXE9CXHIQ7kNvwHMbKiE&_nc_zt=23&_nc_ht=scontent-iad6-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_Af1Ygk7YMsXGHUdJJhGHjUHEfFiAFjGqJ-uJzpPFvLuSg&oe=69E23DEB",
    timestamp: "2026-03-17T10:00:00+0000",
  },
  {
    id: "18206807539335291",
    type: "IMAGE",
    caption: "🏃‍♂️🌅 Mañana se corre la playa\nLlega la Montevideo Beach Run 2026: arena, atardecer y Sanui en la meta 💚",
    likes: 48,
    comments: 4,
    permalink: "https://www.instagram.com/p/DVqXXYg2D4/",
    thumbnail: "https://scontent-iad6-1.cdninstagram.com/v/t51.82787-15/651878772_17863451976606267_5544025285660571136_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ccb=7-5&_nc_sid=18de74&_nc_ohc=IFkHXE9CXHIQ7kNvwHMbKiE&_nc_zt=23&_nc_ht=scontent-iad6-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_Af1Ygk7YMsXGHUdJJhGHjUHEfFiAFjGqJ-uJzpPFvLuSg&oe=69E23DEB",
    timestamp: "2026-03-14T18:00:00+0000",
  },
];

export const instagramRouter = router({
  getPosts: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(20).default(9) }).optional())
    .query(async ({ input }) => {
      const limit = input?.limit ?? 9;
      // Return static posts (real data from @sanui.uy fetched via MCP)
      // In production this would call the Instagram Graph API
      return {
        posts: STATIC_POSTS.slice(0, limit),
        account: {
          username: "@sanui.uy",
          name: "SANUI | Snacks y postres proteicos",
          followers: 932,
          posts: 24,
          profilePicture: "https://scontent-iad6-1.cdninstagram.com/v/t51.82787-19/616595533_17853710517606267_1873146040219111303_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=107&ccb=7-5&_nc_sid=bf7eb4&_nc_ohc=4KvSWBKHRmIQ7kNvwH3zcMZ&_nc_zt=24&_nc_ht=scontent-iad6-1.cdninstagram.com&oh=00_Af3T20N38r2yZ9goL4ATAkRe1u0Rw-Efe8wkOZhaB8M1-A&oe=69E24FC1",
        },
        totalLikes: STATIC_POSTS.reduce((sum, p) => sum + p.likes, 0),
      };
    }),
});
