import axios, { AxiosError, AxiosResponse } from "axios";

export interface APiResponse {
  success: boolean;
  message: string;
  errors?: Array<{ [key: string]: string | boolean | null }>;
  data?: any;
}

export default function api() {
  const axiosInstance = axios.create({
    baseURL: "https://fakerapi.it/api/v2",
  });

  const ResponseBody = (response: AxiosResponse) => {
    return {
      ...response.data,
      success: response.status === 200 ? true : false,
    };
  };

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      return error.response || {};
    }
  );

  return {
    get: (url: string, config?: any): Promise<APiResponse> =>
      axiosInstance.get(url, config).then(ResponseBody),
    post: (url: string, data?: any, config?: any): Promise<APiResponse> =>
      axiosInstance.post(url, data, config).then(ResponseBody),
    put: (url: string, data?: any, config?: any): Promise<APiResponse> =>
      axiosInstance.put(url, data, config).then(ResponseBody),
    delete: (url: string, config?: any): Promise<APiResponse> =>
      axiosInstance.delete(url, config).then(ResponseBody),
    patch: (url: string, data?: any, config?: any): Promise<APiResponse> =>
      axiosInstance.patch(url, data, config).then(ResponseBody),
  };
}
