import HttpClient from "@/lib/http-client";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:8000/api/";
const httpClient = new HttpClient(baseUrl);

// slider
export const getSliders = async () => {
  const response = await httpClient.get(`sliders`);
  return response.data as [];
};
