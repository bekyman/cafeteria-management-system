import { Outlet } from "react-router-dom";
import "../../styles/app-shell.css";

const AuthLayout = () => {
  return (
    <div className="auth-wrapper">
      <Outlet />
    </div>
  );
};

export default AuthLayout;