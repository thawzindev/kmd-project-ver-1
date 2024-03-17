"use server";

import { LoginResponse } from "@/types/LoginResponse";
import { cookies } from "next/headers";

export async function setLoginData(data: LoginResponse) {
  let loginData = { ...data.staff, isFirstLogin: data.isFirstLogin };
  cookies().set("user", JSON.stringify(data.staff), { secure: true });
  const permissionResult = data.sidebarData.flatMap((item) => item.permissions.map((permission) => item.url + permission));
  const cleanedResult = permissionResult.map((url) => url.replace("/", "/").replace(/\/$/, ""));
  cookies().set("permissions", JSON.stringify(cleanedResult), { secure: true });
  cookies().set("sidebar", JSON.stringify(data.sidebarData), { secure: true });
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
