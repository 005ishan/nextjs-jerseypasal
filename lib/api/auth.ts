import { LoginData, RegisterData } from "@/app/(auth)/schema";
import axios from "./axios";
import { Api } from "./endpoints";

export const register = async (registerData: RegisterData) => {
  try {
    const response = await axios.post(Api.Auth.Register, registerData);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Registration failed",
    );
  }
};

export const login = async (loginData: LoginData) => {
  try {
    const response = await axios.post(Api.Auth.Login, loginData);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(
      error.response?.data?.message || error.message || "Login failed",
    );
  }
};
