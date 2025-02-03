import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Carousel } from "react-bootstrap";

import { getProducts } from "services";
import Loader from "components/loader";

import { ProductListI } from "types";
import "./Products.css";

const Products = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductListI[]>([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredProducts, setFilteredProducts] = useState<ProductListI[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    const response = await getProducts();
    if (response.success) {
      setProducts(response.data);
      setFilteredProducts(response.data);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // fetch the products
    fetchProducts();
  }, [fetchProducts]);

  // navigate to detailed view of the product
  const onCardClick = (product: ProductListI) => {
    const navigatePath = product?.name?.split(" ")?.join("-");
    navigate(`/${navigatePath}`, { state: { selectedProduct: product } });
  };

  useEffect(() => {
    // manage the search functionality using the debouncing
    const delaySearch = setTimeout(() => {
      const filtered: ProductListI[] = [...products].filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, 500);

    // clear the timeout when the component is unmounted
    return () => clearTimeout(delaySearch);
  }, [searchTerm, products]);

  useEffect(() => {
    // show the product list based on the sort order
    setFilteredProducts((prevState) =>
      [...prevState].sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      )
    );
  }, [sortOrder]);

  return (
    <>
      {isLoading && <Loader />}
      <h1
        className="w-100 text-center cursor-pointer mb-4"
        onClick={() => navigate("/")}
      >
        Products
      </h1>
      <div>
        <div className="w-100 d-flex justify-content-end align-items-center my-4">
          <div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-secondary rounded-2 me-2 p-1 px-3"
            />
          </div>
          <div>
            <label className="font-semibold me-2">Sort by:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border p-2 rounded-2"
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* render the list of products */}
        {filteredProducts.length > 0 ? (
          <Row className="g-4">
            {filteredProducts?.map((product) => {
              return (
                <Col
                  xs={6}
                  md={3}
                  key={product.id.toString()}
                  onClick={() => onCardClick(product)}
                >
                  <Card className="cursor-pointer h-100">
                    <Carousel slide={false}>
                      {product.images?.map((item, index) => {
                        return (
                          <Carousel.Item key={index + item.title}>
                            <Card.Img variant="top" src={item.url} />
                          </Carousel.Item>
                        );
                      })}
                    </Carousel>
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>${product.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          // manage empty state
          <div className="d-flex justify-content-center w-100 my-4">
            <h3 className="text-muted">No products are available.</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
