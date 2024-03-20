import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getToken, removeLoginData } from "./auth";
import { NextRouter } from "next/router";

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

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(async (config: InternalAxiosRequestConfig<any>) => {
      const token = await getToken(); // Call your getToken function here
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        } as AxiosRequestHeaders; // Explicitly type as AxiosRequestHeaders
      }
      return config;
    }, this._handleError);
  };

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this._handleResponse, this._handleError);
  };

  private _handleResponse = ({ data }: AxiosResponse) => data;

  private _handleError = (error: any) => {
    if (error.response) {
      if (error.response.status === 401) {
        // router.push("/login");
      }
      console.log("HTTP Error:", error.response.data);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log("Error MSG : ", error.response.data.message);
    throw new Error(error.response.data.message);
  };

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.post<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.delete<T, R>(url, config);
  }

  put<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.put<T, R>(url, data, config);
  }
}

export default HttpClient;
