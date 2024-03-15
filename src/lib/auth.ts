"use server";

interface LoginData {
  staff: {
    id?: string;
    email: string;
    name: string;
    username: string;
  };
  token: string;
  isFirstLogin: boolean;
}

import { cookies } from "next/headers";

export async function setLoginData(data: LoginData) {
  let loginData = { ...data.staff, isFirstLogin: data.isFirstLogin };
  cookies().set("user", JSON.stringify(data.staff), { secure: true });
  cookies().set("firstLogin", JSON.stringify(data.isFirstLogin), { secure: true });
  cookies().set("token", data.token, { secure: true });
}

export async function setFirstTimeLoginToFalse() {
  cookies().set("firstLogin", JSON.stringify(0), { secure: true });
}

export async function getToken() {
  const cookieStore = cookies();
  const token = cookieStore.has("token") ? cookieStore.get("token").value : "";
  console.log(token);
  return token;
}

export async function getLoginData() {
  const cookieStore = cookies();
  const data = cookieStore.get("user");
  return data;
}

export async function removeLoginData() {
  const cookieStore = cookies();
  cookieStore.delete("user");
  cookieStore.delete("token");
}
