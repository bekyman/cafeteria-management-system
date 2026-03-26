import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Kitchen from "./pages/Kitchen";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="p-6 w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;