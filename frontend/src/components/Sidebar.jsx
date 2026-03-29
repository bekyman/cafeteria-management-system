import { NavLink } from "react-router-dom";

const links = [
  { path: "/", label: "Dashboard" },
  { path: "/inventory", label: "Inventory" },
  { path: "/orders", label: "Orders" },
  { path: "/menu", label: "Menu" },
  { path: "/kitchen", label: "Kitchen" },
  { path: "/reports", label: "Reports" },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) =>
              `sidebar-link${isActive ? " active" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
