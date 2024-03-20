import { cookies } from "next/headers";

export async function checkPermission(route: string, permissions: unknown) {
  console.log("permissions", permissions);
  return false;
}
