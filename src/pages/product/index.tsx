import { Button, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import { addToCart } from "store/cartSlice";
import useRedux from "hooks/redux";

const Product = () => {
  const navigate = useNavigate();
  const { dispatch, appSelector } = useRedux();
  const cart = appSelector((state) => state.cart.cartItems);
  const {
    state: { selectedProduct },
  } = useLocation();

  // check if the product exist in the cart or not
  const isExist = cart.find((item) => item.id === selectedProduct.id)
    ? true
    : false;

  return (
    <Container fluid="xxl">
      <div className="w-100 d-flex justify-content-between align-items-center">
        <Button
          variant="outline-secondary"
          className="py-1 px-4"
          onClick={() => navigate("/")}
        >
          Back
        </Button>

        <div className="w-100 text-end">
          <Button
            variant="outline-primary"
            className="py-1 px-4"
            onClick={() => navigate("/cart")}
          >
            Cart
          </Button>
        </div>
      </div>
      <div className="w-100 text-center">
        <img
          src={selectedProduct.images[0].url}
          alt={selectedProduct.name}
          className="rounded-2 mb-4 img-fluid"
        />
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="flex-1">
          <h3>${selectedProduct.price}</h3>
          <h3>{selectedProduct.name}</h3>
          <p>{selectedProduct.description}</p>
        </div>
        <Button
          size="sm"
          onClick={() => !isExist && dispatch(addToCart(selectedProduct))}
          disabled={isExist ?? false}
        >
          {isExist ? "Added to Cart" : "Add to Cart"}
        </Button>
      </div>
    </Container>
  );
};

export default Product;
