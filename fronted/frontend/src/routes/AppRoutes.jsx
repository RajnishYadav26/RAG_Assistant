import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Chat from "../pages/Chat";
import Upload from "../pages/Upload";
import History from "../pages/History";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/chat" element={<Chat />} />

      <Route path="/upload" element={<Upload />} />

      <Route path="/history" element={<History />} />

      <Route path="/settings" element={<Settings />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;