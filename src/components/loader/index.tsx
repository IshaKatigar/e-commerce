import Spinner from "react-bootstrap/Spinner";

import "./Loader.css";

const Loader = () => {
  return (
    <div>
      <div className="overlay"></div>
      <div className="spanner show">
        <div className="d-flex flex-column justify-content-center align-items-center loading-spinner">
          <Spinner animation="border" role="status"></Spinner>
          <span className="mt-3">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
