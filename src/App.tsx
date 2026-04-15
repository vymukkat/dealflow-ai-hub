import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import BrandRadar from "./pages/BrandRadar";
import Drafts from "./pages/Drafts";
import Pipeline from "./pages/Pipeline";
import Sent from "./pages/Sent";
import MediaKit from "./pages/MediaKit";
import Audience from "./pages/Audience";
import ScanDebug from "./pages/ScanDebug";
import SettingsPage from "./pages/Settings";
import Analytics from "./pages/Analytics";
import Brands from "./pages/Brands";
import AIAdvisor from "./pages/AIAdvisor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/brand-radar" element={<BrandRadar />} />
            <Route path="/ai-advisor" element={<AIAdvisor />} />
            <Route path="/drafts" element={<Drafts />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/sent" element={<Sent />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/media-kit" element={<MediaKit />} />
            <Route path="/audience" element={<Audience />} />
            <Route path="/scan-debug" element={<ScanDebug />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
