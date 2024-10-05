/* eslint-disable @typescript-eslint/no-explicit-any */
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
  signUp: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  isError: null,

  // Sign up function
  signUp: async (name: string, email: string, password: string) => {
    set({ isLoading: true, isError: null });
    try {
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      const userData = response.data;
      set({
        user: { id: userData.id, name: userData.name, email: userData.email },
        isLoading: false,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to sign up";

      set({ isError: errorMessage, isLoading: false });
      throw error; // Re-throw the error so it can be caught in the component
    }
  },

  // Login function
  login: async (email: string, password: string) => {
    set({ isLoading: true, isError: null });
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const userData = response.data;

      // Set the user state (token is set by server)
      set({
        user: { id: userData.id, name: userData.name, email: userData.email },
        isLoading: false,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to Log In";
      set({
        isError: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  // Logout function
  logout: async () => {
    set({ isLoading: true, isError: null });
    try {
      // Call the API to logout (optional depending on your backend)
      await axios.post("/api/auth/logout");

      // Clear user state
      set({ user: null, isLoading: false });
    } catch (error: any) {
      set({
        isError: error.response?.data?.message || "Failed to logout",
        isLoading: false,
      });
    }
  },
}));
