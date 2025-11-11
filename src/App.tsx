import { Toaster } from "@/components/ui/toaster";
import { useEffect } from 'react';
import { clearAllHasSeenData } from '@/utils/clearUserData';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EntryDetail from "./pages/EntryDetail";
import Submit from "./pages/Submit";
import ReviewSubmission from "./pages/ReviewSubmission";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Clear all hasSeen data on app load
    clearAllHasSeenData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/entry/:id" element={<EntryDetail />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/submit/review" element={<ReviewSubmission />} />
            <Route path="/about" element={<About />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
