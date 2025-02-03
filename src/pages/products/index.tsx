import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Carousel, Button } from "react-bootstrap";

import { getProducts } from "services/products";
import Loader from "components/loader";
import DetailedView from "pages/detailedView";

import { ProductListI } from "./interfaces";
import "./Products.css";

const Products = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductListI[]>([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const [showDetailedView, setShowDetailedView] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductListI>();
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
    fetchProducts();
  }, [fetchProducts]);

  const onCardClick = (product: ProductListI) => {
    setShowDetailedView(true);
    setSelectedProduct(product);
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const filtered: ProductListI[] = [...products].filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, 350);

    return () => clearTimeout(delaySearch);
  }, [searchTerm, products]);

  useEffect(() => {
    setFilteredProducts((prevState) =>
      [...prevState].sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      )
    );
  }, [sortOrder]);

  return (
    <>
      {isLoading && <Loader />}

      <div className="w-100 text-end">
        <Button variant="outline-primary" onClick={() => navigate("/cart")}>
          Cart
        </Button>
      </div>
      <h1
        className="w-100 text-center cursor-pointer mb-4"
        onClick={() => setShowDetailedView(false)}
      >
        Products
      </h1>

      {showDetailedView && selectedProduct ? (
        <div>
          <DetailedView selectedProduct={selectedProduct} />
        </div>
      ) : (
        <div>
          <div className="w-100 d-flex justify-content-end align-items-center my-4">
            <div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-secondary rounded-2 me-2 p-1"
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

          {filteredProducts.length > 0 ? (
            <Row className="g-4">
              {filteredProducts?.map((product) => {
                return (
                  <Col
                    xs={4}
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
            <div className="d-flex justify-content-center w-100 my-4">
              <h3 className="text-muted">No products are available.</h3>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Products;
