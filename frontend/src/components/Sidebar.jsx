import { NavLink } from "react-router-dom";
import logo from "../assets/moh-logo.png";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      <div className="logo">
        <img src={logo} alt="MOH" />
        <h3>MOH CMS</h3>
      </div>

      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/inventory">Inventory</NavLink>
        <NavLink to="/kitchen">Kitchen</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/reports">Reports</NavLink>
      </nav>

    </aside>
  );
};

export default Sidebar;