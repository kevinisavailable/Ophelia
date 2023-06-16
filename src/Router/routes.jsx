import { createBrowserRouter } from "react-router-dom";
import ProtectedAuth from "../Components/Auth/ProtectedAuth";
import Welcome from "../Pages/Welcome/Welcome";
import Dashboard from "../Pages/Dashboard/Dashboard";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />,
    },
    {
      path: "/dashboard",
      element: <ProtectedAuth children={<Dashboard />} />,
    },
  ]);