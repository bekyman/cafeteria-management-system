import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../shared/layouts/DashboardLayout";
import AuthLayout from "../shared/layouts/AuthLayout";

import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import Orders from "../pages/Orders";
import Menu from "../pages/Menu";
import Kitchen from "../pages/Kitchen";
import Reports from "../pages/Reports";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/inventory", element: <Inventory /> },
      { path: "/orders", element: <Orders /> },
      { path: "/menu", element: <Menu /> },
      { path: "/kitchen", element: <Kitchen /> },
      { path: "/reports", element: <Reports /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/login/staff", element: <Login /> },
      { path: "/login/access", element: <Login /> },
    ],
  },
]);