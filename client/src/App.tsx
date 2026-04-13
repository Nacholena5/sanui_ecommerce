import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/contexts/CartContext";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lazy, Suspense, useEffect } from "react";
import Analytics from "./components/Analytics";

// Lazy load pages for better performance
const Home = lazy(() => import("@/pages/Home"));
const Store = lazy(() => import("@/pages/Store"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const About = lazy(() => import("@/pages/About"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const MyOrders = lazy(() => import("@/pages/MyOrders"));
const AdminOrders = lazy(() => import("@/pages/AdminOrders"));
const OrderDetail = lazy(() => import("@/pages/OrderDetail"));
const ThankYou = lazy(() => import("@/pages/ThankYou"));
const Community = lazy(() => import("@/pages/Community"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sanui-off-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-sanui-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sanui-dark font-semibold">Cargando SANUI...</p>
      </div>
    </div>
  );
}

// Scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tienda" component={Store} />
        <Route path="/producto/:id" component={ProductPage} />
        <Route path="/sobre" component={About} />
        <Route path="/faq" component={FAQ} />
        <Route path="/carrito" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/mis-pedidos" component={MyOrders} />
        <Route path="/admin/pedidos" component={AdminOrders} />
        <Route path="/admin/pedido/:orderId" component={OrderDetail} />
        <Route path="/gracias" component={ThankYou} />
        <Route path="/comunidad" component={Community} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function AppLayout() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <main>
        <Router />
      </main>
      <Footer />
    </CartProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Analytics />
          <Toaster />
          <AppLayout />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
