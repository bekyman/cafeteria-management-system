const navigation = [
  {
    name: "Dashboard",
    path: "/",
    roles: ["admin"]
  },
  {
    name: "Menu",
    path: "/menu",
    roles: ["employee", "admin"]
  },
  {
    name: "Orders",
    path: "/orders",
    roles: ["cashier", "admin"]
  },
  {
    name: "Inventory",
    path: "/inventory",
    roles: ["inventory", "admin"]
  },
  {
    name: "Kitchen",
    path: "/kitchen",
    roles: ["kitchen", "admin"]
  },
  {
    name: "Reports",
    path: "/reports",
    roles: ["admin", "manager"]
  }
];

export default navigation;