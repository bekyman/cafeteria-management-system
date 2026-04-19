import { NavLink } from "react-router-dom";
import logo from "../assets/moh-logo.png";
import navigation from "../config/navigation";

const Sidebar = () => {

  const role = localStorage.getItem("role");

  const allowedMenus = navigation.filter(menu =>
    menu.roles.includes(role)
  );

  return (
    <aside className="sidebar">

      <div className="logo">
        <img src={logo} alt="MOH" />
        <h3>MOH CMS</h3>
      </div>

      <nav>
        {allowedMenus.map(menu => (
          <NavLink key={menu.path} to={menu.path}>
            {menu.name}
          </NavLink>
        ))}
      </nav>

      <button
        className="logout"
        onClick={()=>{
          localStorage.clear();
          window.location="/login";
        }}
      >
        Logout
      </button>

    </aside>
  );
};

export default Sidebar;