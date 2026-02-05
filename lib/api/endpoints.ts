export const AUTH = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  CREATE_USER: "/api/auth/register",
  REQUEST_RESET_PASSWORD: "/api/auth/request-password-reset",
  RESET_PASSWORD: (token: string) => `/api/auth/reset-password/${token}`,
};

export const ADMIN = {
  USERS: "/api/admin/users",
};
