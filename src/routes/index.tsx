import { BrowserRouter } from "react-router-dom";

import AllRoutes from "./Routes";

const Routes = () => {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
};

export default Routes;
