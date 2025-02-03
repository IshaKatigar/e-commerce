import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";

import useRedux from "components/hooks/redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "store/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const { dispatch, appSelector } = useRedux();
  const cart = appSelector((state) => state.cart.cartItems);
  const totalAmount = appSelector((state) => state.cart.totalAmount);

  return (
    <div>
      <h1
        className="w-100 text-center cursor-pointer mb-4"
        onClick={() => navigate("/")}
      >
        Cart
      </h1>

      {cart?.map((item) => {
        return (
          <div key={item.id} className="border p-2 rounded-2 mb-4">
            <Row className="w-100 align-items-center">
              <Col xs={10}>
                <div className="d-flex align-items-center gap-4">
                  <img
                    src={item.images[0]?.url}
                    alt=""
                    width={150}
                    className="img-fluid rounded-2"
                  />
                  <div>
                    <h4 className="mb-0">{item.name}</h4>
                    <p className="text-muted mb-0">${item.price}</p>
                  </div>
                </div>
              </Col>
              <Col xs={1}>
                <ButtonGroup>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() =>
                      item.quantity > 1
                        ? dispatch(decrementQuantity(item.id))
                        : dispatch(removeFromCart(item.id))
                    }
                  >
                    -
                  </Button>
                  <Button
                    variant="outline-secondary"
                    disabled
                    className="text-dark"
                  >
                    <span className="fw-bold">{item.quantity}</span>
                  </Button>

                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => dispatch(incrementQuantity(item.id))}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </Col>
              <Col xs={1}>
                <Button
                  variant="outline-danger"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          </div>
        );
      })}

      {cart.length > 0 ? (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => dispatch(clearCart())}
          >
            Clear cart
          </Button>
          <h4>
            <span className="fw-normal"> Total ({cart.length} items) :</span> $
            {totalAmount.toFixed(2)}
          </h4>
        </div>
      ) : (
        <div className="text-muted fs-2 w-100 text-center">
          No items are added to the cart.
        </div>
      )}
    </div>
  );
};

export default Cart;
