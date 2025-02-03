import { Button, Container } from "react-bootstrap";

import { addToCart } from "store/cartSlice";
import useRedux from "components/hooks/redux";
import { ProductListI } from "pages/products/interfaces";

interface DetailedViewProps {
  selectedProduct: ProductListI;
}

const DetailedView = ({ selectedProduct }: DetailedViewProps) => {
  const { dispatch, appSelector } = useRedux();
  const cart = appSelector((state) => state.cart.cartItems);

  const isExist = cart.find((item) => item.id === selectedProduct.id)
    ? true
    : false;

  return (
    <Container fluid="xxl">
      <div className="w-100 text-center">
        <img
          src={selectedProduct.images[0].url}
          alt={selectedProduct.name}
          className="rounded-2 mb-4"
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

export default DetailedView;
