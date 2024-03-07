import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class HttpClient {
  private readonly instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this._handleResponse, this._handleError);
  };

  private _handleResponse = ({ data }: AxiosResponse) => data;

  private _handleError(error: any): void {
    if (error.response) {
      console.log("HTTP Error:", error.response.data);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log("Error MSG : ", error.response.data.message);
    throw new Error(error.response.data.message);
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.post<T, R>(url, data, config);
  }

  // Add other methods as needed
}

export default HttpClient;
