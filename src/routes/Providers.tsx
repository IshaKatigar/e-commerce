import React, { Suspense } from "react";
import { Container } from "react-bootstrap";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";

import store from "store/configureStore";
import Loader from "components/loader";

const Providers = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <Container fluid className="p-4">
          <Outlet />
        </Container>
      </Provider>
    </Suspense>
  );
};

export default Providers;
