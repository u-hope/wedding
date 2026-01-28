import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";

// Public Pages
import LandingPage from "@/pages/LandingPage";
import PricingPage from "@/pages/PricingPage";
import JoinEventPage from "@/pages/JoinEventPage";

// Auth Pages
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

// Dashboard Pages
import DashboardPage from "@/pages/dashboard/DashboardPage";

// Event Management Pages
import CreateEventPage from "@/pages/events/CreateEventPage";
import EventAccessPage from "@/pages/events/EventAccessPage";
import EventBrandingPage from "@/pages/events/EventBrandingPage";
import EventModerationPage from "@/pages/events/EventModerationPage";
import EventInsightsPage from "@/pages/events/EventInsightsPage";

// Guest Pages
import GuestEventPage from "@/pages/guest/GuestEventPage";

// Not Found
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes with Layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/join" element={<JoinEventPage />} />
          </Route>

          {/* Auth Routes (no layout) */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />

          {/* Dashboard Routes (authenticated) */}
          <Route element={<PublicLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          {/* Event Management Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/events/new" element={<CreateEventPage />} />
            <Route path="/events/:id/access" element={<EventAccessPage />} />
            <Route path="/events/:id/branding" element={<EventBrandingPage />} />
            <Route path="/events/:id/moderation" element={<EventModerationPage />} />
            <Route path="/events/:id/insights" element={<EventInsightsPage />} />
          </Route>

          {/* Guest Event Routes (no footer for cleaner experience) */}
          <Route path="/e/:slug" element={<GuestEventPage />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
