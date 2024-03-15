import HttpClient from "@/lib/http-client";
import { log } from "console";

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


// Academic year

//create 
export const createAcademicYear = async (payload: any) => {
  console.log(payload)
  const response = await httpClient.post(`academic-dates`, payload);
};

//delete
export const deleteCategory = async (slug: string) => {
  const response = await httpClient.delete(`categories/${slug}`);
  return response as any;
};

//Staffs

//create
export const createStaff = async (payload: any) => {
  const response = await httpClient.post(`staffs`, payload);
  return response as any;
};

//list
export const getStaffList = async (perPage: number, page: number) => {
  const response = await httpClient.get(`staffs?perpage=${perPage}&page=${page}`);
  return response as any;
};

//delete
export const deleteStaff = async (slug: string) => {
  const response = await httpClient.delete(`staffs/${slug}`);
  return response as any;
};

//Departments

//create
export const createDepartment = async (payload: any) => {
  const response = await httpClient.post(`departments`, payload);
  return response as any;
};

//list
export const getDepartmentList = async (perPage: number, page: number) => {
  const response = await httpClient.get(`departments?perpage=${perPage}&page=${page}`);
  return response as any;
};

//delete
export const deleteDepartment = async (slug: string) => {
  const response = await httpClient.delete(`departments/${slug}`);

  return response as any;
};
