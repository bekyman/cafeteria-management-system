import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Kitchen from "./pages/Kitchen";
import Reports from "./pages/Reports";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["cashier","admin"]} />}>
          <Route path="/orders" element={<Orders />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["inventory","admin"]} />}>
          <Route path="/inventory" element={<Inventory />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["kitchen","admin"]} />}>
          <Route path="/kitchen" element={<Kitchen />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["employee","admin"]} />}>
          <Route path="/menu" element={<Menu />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;