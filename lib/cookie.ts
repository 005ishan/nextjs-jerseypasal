"use server";

import { cookies } from "next/headers";

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export const setAuthToken = async (token: string) => {
  const cookieStore = cookies();
  (await cookieStore).set({
    name: "authToken",
    value: token,
  });
};

export const getAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("authToken")?.value || null;
};

export const getUserData = async () => {
  const cookieStore = await cookies();
  const userData = cookieStore.get("user_data")?.value || null;
  return userData ? JSON.parse(userData) : null;
};

export const clearAuthCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("authToken");
  cookieStore.delete("user_data");
};
