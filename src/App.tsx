import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import EmploymentAgency from "./pages/EmploymentAgency";
import LaborInspection from "./pages/LaborInspection";
import CNAS from "./pages/funds/CNAS";
import CNR from "./pages/funds/CNR";
import CNAC from "./pages/funds/CNAC";
import CASNOS from "./pages/funds/CASNOS";
import CACOBATPH from "./pages/funds/CACOBATPH";
import NESDA from "./pages/agencies/NESDA";
import ANGEM from "./pages/agencies/ANGEM";
import ONAAPH from "./pages/agencies/ONAAPH";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/employment-agency" element={<EmploymentAgency />} />
                  <Route path="/labor-inspection" element={<LaborInspection />} />
                  <Route path="/funds/cnas" element={<CNAS />} />
                  <Route path="/funds/cnr" element={<CNR />} />
                  <Route path="/funds/cnac" element={<CNAC />} />
                  <Route path="/funds/casnos" element={<CASNOS />} />
                  <Route path="/funds/cacobatph" element={<CACOBATPH />} />
                  <Route path="/agencies/nesda" element={<NESDA />} />
                  <Route path="/agencies/angem" element={<ANGEM />} />
                  <Route path="/agencies/onaaph" element={<ONAAPH />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MainLayout>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;