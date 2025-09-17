import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import "@/i18n/i18n";

// Pages (all use default export)
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import UserDashboard from "./pages/user/UserDashboard";
import DoctorsPage from "./pages/doctors/DoctorsPage";
import PharmacyPage from "./pages/pharmacy/PharmacyPage";
import NotFound from "./pages/NotFound";

// Role-based registration pages (all use default export)
import Register from "./pages/auth/RegisterPage";
import UserRegisterPage from "./pages/auth/UserRegisterPage";
import DoctorRegisterPage from "./pages/auth/DoctorRegisterPage";
import PharmacyRegisterPage from "./pages/auth/PharmacyRegisterPage";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing & Auth */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Role selection */}
            <Route path="/register" element={<Register />} />

            {/* Role-based registration */}
            <Route path="/user/register" element={<UserRegisterPage />} />
            <Route path="/doctor/register" element={<DoctorRegisterPage />} />
            <Route path="/pharmacy/register" element={<PharmacyRegisterPage />} />

            {/* Dashboards & main pages */}
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/pharmacy" element={<PharmacyPage />} />

            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
