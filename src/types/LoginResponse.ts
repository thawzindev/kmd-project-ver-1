export interface Staff {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  disabledAt: null | string;
  lastLoggedInAt: string;
}

export interface LoginResponse {
  staff: Staff;
  token: string;
  sidebarData: Permissions[];
  isFirstLogin: boolean;
}

export interface Permissions {
  title: string;
  icon: string;
  url: string;
  permissions: string[];
  reactionPermissions?: string[];
  commentPermissions?: string[];
}
