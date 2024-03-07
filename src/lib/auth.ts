"use server";

interface LoginData {
  staff: {
    id?: string;
    email: string;
    name: string;
    username: string;
  };
  token: string;
}

import { cookies } from "next/headers";

export async function setLoginData(data: LoginData) {
  cookies().set("user", JSON.stringify(data.staff), { secure: true });
  cookies().set("token", JSON.stringify(data.token), { secure: true });
}

export async function getLoginData() {
  const cookieStore = cookies();
  const data = cookieStore.get("user");
  return data;
}
