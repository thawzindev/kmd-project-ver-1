import { Department } from "./Department";

export interface Staff {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string | null;
  disabledAt: string | null;
  lastLoggedInAt: string | null;
  role: string;
  department: Department;
}
