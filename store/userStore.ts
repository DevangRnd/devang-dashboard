import { create } from "zustand";
import axios, { AxiosError } from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface UserStore {
  user: User | null;
  isLoading: boolean;
  isError: string | null;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  isError: null,

  signUp: async (name: string, email: string, password: string) => {
    set({ isLoading: true, isError: null });
    try {
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        const userData = response.data.newUser;
        set({
          user: {
            _id: userData._id,
            name: userData.name,
            email: userData.email,
          },
          isLoading: false,
          isError: null,
        });
        return true; // Indicate success
      } else {
        set({
          isError: response.data.message || "Sign up failed",
          isLoading: false,
        });
        return false; // Indicate failure
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Failed to sign up";
        set({ isError: errorMessage, isLoading: false });
      } else {
        set({ isError: "An unexpected error occurred", isLoading: false });
      }
      return false; // Indicate failure
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, isError: null });
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      const userData = response.data.user;
      set({
        user: {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
        },
        isLoading: false,
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Failed to log in";
        set({ isError: errorMessage, isLoading: false });
      } else {
        set({ isError: "An unexpected error occurred", isLoading: false });
      }
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, isError: null });
    try {
      await axios.post("/api/auth/logout");
      set({ user: null, isLoading: false });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Failed to logout";
        set({ isError: errorMessage, isLoading: false });
      } else {
        set({ isError: "An unexpected error occurred", isLoading: false });
      }
    }
  },

  getUser: async () => {
    set({ isLoading: true, isError: null });
    try {
      const response = await axios.get("/api/auth/getUser");
      const userData = response.data.user;
      set({
        user: {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
        },
        isLoading: false,
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch user";
        set({ isError: errorMessage, isLoading: false });
      } else {
        set({ isError: "An unexpected error occurred", isLoading: false });
      }
    }
  },
}));
