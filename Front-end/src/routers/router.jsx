import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Dashboard from "../Dashboard/Dashboard";
import Navbar from  "../componentes/Navbar";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [{
        path: "/",
        element: <Navbar/>
      },
      {
        path: "/menu",
        element: <Dashboard/>
      }
        
      ]
    },
  ]);
export default router;