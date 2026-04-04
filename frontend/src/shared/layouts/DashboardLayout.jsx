import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "../../styles/app-shell.css";

const DashboardLayout = () => {
  return (
    <div className="app-shell">

      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="content">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default DashboardLayout;