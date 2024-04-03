import HttpClient from "@/lib/http-client";
import { removeEmptyParameters } from "@/lib/utils";
import { log } from "console";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://18.143.147.216/api/";
console.log(baseUrl);
const httpClient = new HttpClient(baseUrl);

// login
export const login = async (payload: any) => {
  const response = await httpClient.post(`login`, payload);
  return response as any;
};

export const resendVerificationEmail = async (payload: any) => {
  const response = await httpClient.post(`email/verification-notification`, payload);
  return response as any;
};

// verify
export const verifyEmail = async (payload: any) => {
  const response = await httpClient.post(`email/verify`, payload);
  return response as any;
};

// Categories

//create
export const createCategory = async (payload: any) => {
  const response = await httpClient.post(`categories`, payload);
  return response as any;
};

//list
export const getCategoryList = async (perPage: number, page: number, keyword?: string) => {
  let url = `categories?perpage=${perPage}&page=${page}`;
  if (keyword) url += `&search=${keyword}`;
  const response = await httpClient.get(url);
  return response as any;
};

//list
export const updateCategory = async (payload: any, slug: string) => {
  const response = await httpClient.put(`categories/${slug}`, payload);
  return response as any;
};

//delete
export const deleteCategory = async (slug: string) => {
  const response = await httpClient.delete(`categories/${slug}`);
  return response as any;
};

//Staffs

//create
export const createStaff = async (payload: any) => {
  const response = await httpClient.postAsForm(`staffs`, payload);
  return response as any;
};

//Edit
export const editStaff = async (id: string, payload: any) => {
  const response = await httpClient.put(`staffs/${id}`, payload);
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
export const getDepartmentList = async (perPage: number, page: number, search?: string) => {
  let url = `departments?perpage=${perPage}&page=${page}`;
  if (search) url += `&search=${search}`;
  const response = await httpClient.get(url);
  return response as any;
};

//delete
export const deleteDepartment = async (slug: string) => {
  const response = await httpClient.delete(`departments/${slug}`);
  return response as any;
};

//list
export const updateDepartment = async (payload: any, slug: string) => {
  const response = await httpClient.put(`departments/${slug}`, payload);
  return response as any;
};

// Academic year

//create
export const createAcademicYear = async (payload: any) => {
  const response = await httpClient.post(`academics`, payload);
  return response as any;
};

//list
export const getAcademicYearList = async (perPage: number, page: number) => {
  const response = await httpClient.get(`academics?perpage=${perPage}&page=${page}`);
  return response as any;
};

//delete
export const deleteAcademicyear = async (slug: string) => {
  const response = await httpClient.delete(`academics/${slug}`);
  return response as any;
};

// Roles

//lists
export const getRoleList = async () => {
  const response = await httpClient.get(`roles`);
  return response as any;
};

//Ideas

//create
export const createIdea = async (payload: any) => {
  const response = await httpClient.postAsForm(`ideas`, payload);
  return response as any;
};

//list
export const getIdeaList = async (perPage: number, page: number, queryString?: string) => {
  // if (!queryString?.startsWith("?")) queryString = `?${queryString}`;
  let url = `ideas?perpage=${perPage}&page=${page}`;
  if (queryString) url += `&${queryString}`;
  url = removeEmptyParameters(url);
  const response = await httpClient.get(url);
  return response as any;
};

//details
export const getIdeaDetail = async (slug: string) => {
  console.log(slug);
  const response = await httpClient.get(`ideas/${slug}`);
  return response as any;
};

//list
export const getStatistics = async () => {
  const response = await httpClient.get("statistics");
  return response as any;
};

//list
export const getNotifications = async (perPage: number, page?: number) => {
  let url = `notifications?perpage=${perPage}`;
  if (page) url += `&page=${page}`;
  const response = await httpClient.get(url);
  return response as any;
};

//read all
export const markAllNotificationAsRead = async () => {
  let url = `notifications/read-all`;
  const response = await httpClient.get(url);
  return response as any;
};

//list
export const getReports = async (perPage: number, page: number, queryString?: string) => {
  let url = `reports?perpage=${perPage}&page=${page}`;
  if (queryString) url += `&${queryString}`;
  const response = await httpClient.get(url);
  return response as any;
};

//comment
export const getComments = async (perPage: number, page: number, slug: string) => {
  let url = `ideas/${slug}/comments?perPage=${perPage}&page=${page}`;
  const response = await httpClient.get(url);
  return response as any;
};

//post comment
export const createComment = async (slug: string, payload: any) => {
  const response = await httpClient.post(`ideas/${slug}/comments`, payload);
  return response as any;
};

//post comment
export const postReaction = async (reaction: string, slug: string) => {
  const response = await httpClient.get(`ideas/${slug}/react?type=${reaction}`);
  return response as any;
};

//post comment
export const postCommentReaction = async (reaction: string, slug: string, commentSlug: string) => {
  const response = await httpClient.get(`ideas/${slug}/comments/${commentSlug}/react?type=${reaction}`);
  return response as any;
};

//post comment
export const reportIdea = async (slug: string, payload: any) => {
  const response = await httpClient.post(`ideas/${slug}/report`, payload);
  return response as any;
};

//delete idea
export const deleteIdea = async (slug: string) => {
  const response = await httpClient.delete(`ideas/${slug}`);
  return response as any;
};

//toggle staff status
export const toggleStaffStatus = async (slug: string, type: string) => {
  const response = await httpClient.get(`staffs/${slug}/${type}`);
  return response as any;
};

export const reportAction = async (slug: string) => {
  const response = await httpClient.get(`reports/${slug}/action`);
  return response as any;
};

export const updateAcademic = async (id: string, payload: any) => {
  const response = await httpClient.put(`academics/${id}`, payload);
  return response as any;
};
