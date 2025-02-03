import api, { APiResponse } from "helpers/api";

export const getProducts = (): Promise<APiResponse> => {
  return api().get("/products");
};
