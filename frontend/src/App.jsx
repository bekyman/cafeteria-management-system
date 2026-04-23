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

        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["CASHIER","ADMIN"]} />}>
          <Route path="/orders" element={<Orders />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["INVENTORY","ADMIN"]} />}>
          <Route path="/inventory" element={<Inventory />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["KITCHEN","ADMIN"]} />}>
          <Route path="/kitchen" element={<Kitchen />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["EMPLOYEE","ADMIN"]} />}>
          <Route path="/menu" element={<Menu />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;