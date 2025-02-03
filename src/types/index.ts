export interface ProductListI {
  id: number;
  name: string;
  description: string;
  ean: string;
  upc: string;
  image: string;
  images: {
    title: string;
    description: string;
    url: string;
  }[];
  net_price: number;
  taxes: number;
  price: number;
  categories: number[];
  tags: string[];
}
