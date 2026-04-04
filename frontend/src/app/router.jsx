import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../shared/layouts/DashboardLayout";
import AuthLayout from "../shared/layouts/AuthLayout";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import Inventory from "../pages/Inventory";
import Kitchen from "../pages/Kitchen";
import Menu from "../pages/Menu";
import Reports from "../pages/Reports";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
    ],
  },

  {
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/orders", element: <Orders /> },
      { path: "/inventory", element: <Inventory /> },
      { path: "/kitchen", element: <Kitchen /> },
      { path: "/menu", element: <Menu /> },
      { path: "/reports", element: <Reports /> },
    ],
  },
]);