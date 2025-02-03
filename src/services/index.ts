import api, { APiResponse } from "utils/api";

// fetch the list of products
export const getProducts = (): Promise<APiResponse> => {
  return api().get("/products");
};
