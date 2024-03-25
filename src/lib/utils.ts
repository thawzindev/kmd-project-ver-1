import { deleteAcademicyear, deleteCategory, deleteDepartment, deleteStaff } from "@/routes/api";
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
  } else if (path === "/settings") {
    return deleteAcademicyear;
  }
}

export function removeEmptyParameters(url: string) {
  // Splitting the URL into base and parameters
  let parts = url.split("?");
  if (parts.length > 1) {
    // Extracting parameters part
    let parameters = parts[1].split("&");
    // Filtering out parameters with non-empty values
    parameters = parameters.filter((param) => {
      let value = param.split("=")[1];
      return value !== "";
    });
    // Reconstructing the URL
    url = parts[0] + "?" + parameters.join("&");
  }
  return url;
}
