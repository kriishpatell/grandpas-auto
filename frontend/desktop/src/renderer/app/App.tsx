import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { RequireAuth, RequireRole } from "./routes/guards";
import Shell from "./layout/Shell";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import Unauthorized from "./pages/Unauthorized";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route element={<Shell />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route element={<RequireRole role="owner" />}>
                <Route path="finance" element={<OwnerDashboard />} />
              </Route>
              <Route path="unauthorized" element={<Unauthorized />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
