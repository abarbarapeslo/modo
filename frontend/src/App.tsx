import { Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/dashboard/Overview";
import AttentionPage from "./pages/dashboard/AttentionPage";
import AlignmentPage from "./pages/dashboard/AlignmentPage";
import InfluencePage from "./pages/dashboard/InfluencePage";
import MarketMapPage from "./pages/MarketMapPage";
import DriftPage from "./pages/dashboard/DriftPage";
import ReimaginePage from "./pages/dashboard/ReimaginePage";
import ReportsPage from "./pages/dashboard/ReportsPage";
import ChatPage from "./pages/ChatPage";
import SettingsPage from "./pages/dashboard/SettingsPage";

export default function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<Navigate to="/dashboard/chat" replace />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Overview />} />
          <Route path="attention" element={<AttentionPage />} />
          <Route path="alignment" element={<AlignmentPage />} />
          <Route path="influence" element={<InfluencePage />} />
          <Route path="market-map" element={<MarketMapPage />} />
          <Route path="drift" element={<DriftPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="reimagine" element={<ReimaginePage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UserProvider>
  );
}
