import HttpClient from "@/lib/http-client";

const baseUrl = process.env.BASE_URL || "http://18.143.147.216/api/";
console.log(baseUrl);
const httpClient = new HttpClient(baseUrl);

// login
export const login = async (payload: any) => {
  const response = await httpClient.post(`login`, payload);
  return response as any;
};

// Categories

//create
export const createCategory = async (payload: any) => {
  const response = await httpClient.post(`categories`, payload);
  return response as any;
};

//list
export const getCategoryList = async (perPage: number, page: number) => {
  const response = await httpClient.get(`categories?perpage=${perPage}&page=${page}`);
  return response as any;
};
