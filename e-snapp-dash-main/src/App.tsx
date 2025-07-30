import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useIsPortrait } from "@/hooks/use-mobile";
import { Home } from "./pages/Home";
import { Trends } from "./pages/Trends";
import { Realtime } from "./pages/Realtime";
import { Billing } from "./pages/Billing";
import { EnergyConsumptionScreen } from "./pages/EnergyConsumptionScreen";
import NotFound from "./pages/NotFound";
import { Onboarding } from "./pages/Onboarding";
import { SignIn } from "./pages/SignIn";
import { CodeVerification } from "./pages/CodeVerification";
import { PasswordVerification } from "./pages/PasswordVerification";
import { PasswordReset } from "./pages/PasswordReset";
import { EmailVerified } from "./pages/EmailVerified";
import { SplashScreen } from "./pages/SplashScreen";
import { EnergyTariffScreen } from "./pages/EnergyTariffScreen";
import { UploadBillScreen } from "./pages/UploadBillScreen";
import { ElectricalSystemsScreen } from "./pages/ElectricalSystemsScreen";
import { HomeSetupScreen } from "./pages/HomeSetupScreen";
import BetterTariffsScreen from "./pages/BetterTariffsScreen";
import MyProfileScreen from "./pages/MyProfileScreen";
import { WiFiSetupScreen } from "./pages/WiFiSetupScreen";
import { WiFiPasswordScreen } from "./pages/WiFiPasswordScreen";
import { WiFiErrorScreen } from "./pages/WiFiErrorScreen";
import { DeviceSetupScreen } from "./pages/DeviceSetupScreen";
import { DeviceConnectingScreen } from "./pages/DeviceConnectingScreen";
import { DeviceManualEntryScreen } from "./pages/DeviceManualEntryScreen";
import { DeviceSetupCompleteScreen } from "./pages/DeviceSetupCompleteScreen";
import { DeviceNamingScreen } from "./pages/DeviceNamingScreen";
import { WiFiSuccessScreen } from "./pages/WiFiSuccessScreen";
import { BottomNavigation } from "@/components/BottomNavigation";
import { PortraitWarning } from "@/components/PortraitWarning";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { isAuthenticated } from "./lib/api";

const queryClient = new QueryClient();

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const isPortrait = useIsPortrait();
  
  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (hasSeenOnboarding) {
      setShowOnboarding(false);
    }
    
    // Force portrait orientation
    if (screen.orientation) {
      try {
        screen.orientation.lock("portrait").catch(() => {
          console.log("Orientation lock not supported")
        });
      } catch (error) {
        console.log("Orientation API not supported");
      }
    }
  }, []);
  
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative">
          <PortraitWarning />
          <Routes>
            <Route path="/" element={showOnboarding ? <Onboarding /> : isAuthenticated() ? <Navigate to="/home" /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/signin" element={<SignIn />} />
            
            {/* Protected Routes */}
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/trends" element={<ProtectedRoute><Trends /></ProtectedRoute>} />
            <Route path="/realtime" element={<ProtectedRoute><Realtime /></ProtectedRoute>} />
            <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
            <Route path="/energy-consumption" element={<ProtectedRoute><EnergyConsumptionScreen /></ProtectedRoute>} />
            <Route path="/better-tariffs" element={<ProtectedRoute><BetterTariffsScreen /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><MyProfileScreen /></ProtectedRoute>} />
            
            {/* Unprotected Routes */}
            <Route path="/code-verification" element={<CodeVerification />} />
            <Route path="/password-verification" element={<PasswordVerification />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/email-verified" element={<EmailVerified />} />
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/energy-tariff" element={<EnergyTariffScreen />} />
            <Route path="/upload-bill" element={<UploadBillScreen />} />
            <Route path="/electrical-systems" element={<ElectricalSystemsScreen />} />
            <Route path="/home-setup" element={<HomeSetupScreen />} />
            <Route path="/wifi-setup" element={<WiFiSetupScreen />} />
            <Route path="/wifi-password/:networkId" element={<WiFiPasswordScreen />} />
            <Route path="/wifi-error" element={<WiFiErrorScreen />} />
            <Route path="/wifi-success" element={<WiFiSuccessScreen />} />
            <Route path="/device-setup" element={<DeviceSetupScreen />} />
            <Route path="/device-connecting" element={<DeviceConnectingScreen />} />
            <Route path="/device-manual-entry" element={<DeviceManualEntryScreen />} />
            <Route path="/device-naming" element={<DeviceNamingScreen />} />
            <Route path="/device-setup-complete" element={<DeviceSetupCompleteScreen />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          {!showOnboarding && <BottomNavigation />}
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
};

export default App;
