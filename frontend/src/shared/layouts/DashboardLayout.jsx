import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import "../../styles/app-shell.css";

const DashboardLayout = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="layout-body">
      <Sidebar />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;