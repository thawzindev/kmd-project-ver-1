import { deleteCategory, deleteDepartment, deleteStaff } from "@/routes/api";
import { type ClassValue, clsx } from "clsx";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDeleteFun(path: string) {
  if (path === "/categories") {
    return deleteCategory;
  } else if (path === "/departments") {
    return deleteDepartment;
  } else if (path === "/staffs") {
    return deleteStaff;
  }
}
