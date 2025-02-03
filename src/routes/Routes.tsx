import React from "react";
import { useRoutes } from "react-router-dom";

import Products from "pages/Products";
import Cart from "pages/Cart";

import Providers from "./Providers";

const Routes = () => {
  // manage all routes of the application
  let routes = useRoutes([
    {
      element: <Providers />,
      children: [
        {
          path: "/",
          element: <Products />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
  ]);

  return routes;
};

export default Routes;
