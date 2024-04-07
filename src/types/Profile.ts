import { Department } from "./Department";

export interface Profile {
    id: string;
    name: string;
    email: string;
    username: string;
    avatar: string | null;
    department: Department;
    disabledAt: string | null;
    lastLoggedInAt: string | null;
  }