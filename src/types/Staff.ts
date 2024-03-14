interface Department {
  name: string;
  slug: string;
}

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
