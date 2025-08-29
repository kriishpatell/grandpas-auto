import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Shell() {
  const { user, logout } = useAuth();
  return (
    <div className="h-screen grid grid-cols-[240px_1fr] grid-rows-[56px_1fr]">
      <aside className="col-start-1 row-span-2 border-r p-3 space-y-2">
        <div className="font-bold text-lg mb-3">DealerDesk</div>
        <NavLink
          to="/dashboard"
          className="block px-2 py-1 rounded hover:bg-gray-100"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/inventory"
          className="block px-2 py-1 rounded hover:bg-gray-100"
        >
          Inventory
        </NavLink>
        <NavLink
          to="/customers"
          className="block px-2 py-1 rounded hover:bg-gray-100"
        >
          Customers
        </NavLink>
        {user?.role === "owner" && (
          <NavLink
            to="/finance"
            className="block px-2 py-1 rounded hover:bg-gray-100"
          >
            Finance
          </NavLink>
        )}
        <NavLink
          to="/settings"
          className="block px-2 py-1 rounded hover:bg-gray-100"
        >
          Settings
        </NavLink>
      </aside>
      <header className="col-start-2 row-start-1 border-b flex items-center justify-end px-4 gap-3">
        <span className="text-sm">
          {user?.name} ({user?.role})
        </span>
        <button onClick={logout} className="text-sm px-3 py-1 border rounded">
          Sign out
        </button>
      </header>
      <main className="col-start-2 row-start-2 overflow-auto p-4 bg-white">
        <Outlet />
      </main>
    </div>
  );
}
