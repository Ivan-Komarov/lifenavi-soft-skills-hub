import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import EducationPage from "./pages/EducationPage";
import EducationCoursePage from "./pages/EducationCoursePage";
import TrainingPage from "./pages/TrainingPage";
import DictionLabPage from "./pages/DictionLabPage";
import SpeechCoachPage from "./pages/SpeechCoachPage";
import InterviewPage from "./pages/InterviewPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/education/:courseKey" element={<EducationCoursePage />} />
              <Route path="/training" element={<TrainingPage />} />
              <Route path="/training/diction" element={<DictionLabPage />} />
              <Route path="/training/speech" element={<SpeechCoachPage />} />
              <Route path="/training/interview" element={<InterviewPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
