import { create } from "zustand";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserStore {
  user: User | null;
  isLoading: boolean;
  isError: string | null;
  signUp: (
    name: string,
    email: string,
    password: string,
    router: any
  ) => Promise<void>;
  login: (email: string, password: string, router: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  isError: null,

  // Sign up function
  signUp: async (name: string, email: string, password: string, router) => {
    set({ isLoading: true, isError: null });
    try {
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      const userData = response.data;

      // Set the user state (token is set by server)
      set({
        user: { id: userData.id, name: userData.name, email: userData.email },
        isLoading: false,
      });

      // Redirect to a success page or dashboard
      router.push("/dashboard");
    } catch (error: any) {
      set({
        isError: error.response?.data?.message || "Failed to sign up",
        isLoading: false,
      });
    }
  },

  // Login function
  login: async (email: string, password: string, router) => {
    set({ isLoading: true, isError: null });
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const userData = response.data;

      // Set the user state (token is set by server)
      set({
        user: { id: userData.id, name: userData.name, email: userData.email },
        isLoading: false,
      });

      // Redirect to a dashboard or another route
      router.push("/dashboard");
    } catch (error: any) {
      set({
        isError: error.response?.data?.message || "Failed to login",
        isLoading: false,
      });
    }
  },

  // Logout function
  logout: async () => {
    set({ isLoading: true, isError: null });
    try {
      // Call the API to logout (optional depending on your backend)
      await axios.post("/api/logout");

      // Clear user state
      set({ user: null, isLoading: false });
    } catch (error: any) {
      set({
        isError: error.response?.data?.message || "Failed to logout",
        isLoading: false,
      });
    }
  },

  // Check if the user is authenticated
  checkAuth: async () => {
    set({ isLoading: true, isError: null });
    try {
      const response = await axios.get("/api/me");
      const userData = response.data;

      // Set the user state
      set({
        user: { id: userData.id, name: userData.name, email: userData.email },
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isError: error.response?.data?.message || "Failed to check auth",
        user: null,
        isLoading: false,
      });
    }
  },
}));
