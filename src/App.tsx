import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import { AuthProvider } from "@/lib/auth";
import { CartProvider } from "@/lib/cart";
import Layout from "@/components/Layout";

const Index = lazy(() => import("./pages/Index"));
const Masters = lazy(() => import("./pages/Masters"));
const MasterDetail = lazy(() => import("./pages/MasterDetail"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Auth = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));
const ProfileInfo = lazy(() => import("./pages/ProfileInfo"));
const ProfileOrders = lazy(() => import("./pages/ProfileOrders"));
const ProfileSettings = lazy(() => import("./pages/ProfileSettings"));
const BarberDashboard = lazy(() => import("./pages/barber/dashboard"));
const BarberAppointments = lazy(() => import("./pages/barber/appointments"));
const BarberClients = lazy(() => import("./pages/barber/clients"));
const BarberSchedule = lazy(() => import("./pages/barber/schedule"));
const BarberSettings = lazy(() => import("./pages/barber/settings"));
const BarberServices = lazy(() => import("./pages/barber/services"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteLoader = () => (
  <div className="mx-auto max-w-7xl px-6 py-16 text-sm text-muted-foreground">Loading...</div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<RouteLoader />}>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Index />} />
                    <Route path="/masters" element={<Masters />} />
                    <Route path="/masters/:id" element={<MasterDetail />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/profile" element={<Profile />}>
                      <Route index element={<ProfileInfo />} />
                      <Route path="orders" element={<ProfileOrders />} />
                      <Route path="records" element={<Navigate to="/profile/orders" replace />} />
                      <Route path="settings" element={<ProfileSettings />} />
                    </Route>
                    <Route path="/barber/dashboard" element={<BarberDashboard />} />
                    <Route path="/barber/appointments" element={<BarberAppointments />} />
                    <Route path="/barber/clients" element={<BarberClients />} />
                    <Route path="/barber/services" element={<BarberServices />} />
                    <Route path="/barber/schedule" element={<BarberSchedule />} />
                    <Route path="/barber/settings" element={<BarberSettings />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
