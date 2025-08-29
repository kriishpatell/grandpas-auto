import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export function RequireAuth() {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <div className="p-6">Loading…</div>;
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: loc }} />
  );
}

export function RequireRole({ role }: { role: "owner" | "employee" }) {
  const { user } = useAuth();
  return user?.role === role ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
}
