import React from "react";
import { useRoutes } from "react-router-dom";

import Products from "pages/products";
import Cart from "pages/cart";
import Providers from "./Providers";
import Product from "pages/product";

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
          path: "/:id",
          element: <Product />,
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
