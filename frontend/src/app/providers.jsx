import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const Providers = () => {
  return <RouterProvider router={router} />;
};

export default Providers;