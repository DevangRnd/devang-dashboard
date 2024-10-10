import { create } from "zustand";
import axios, { AxiosError } from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role?: "user" | "production" | "admin";
}

interface UserStore {
  user: User | null | string;
  isLoading: boolean;
  isError: string | null;
  allUsers: User[];
  singleUser: User | null;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  getAllUsers: () => Promise<boolean>;
  getSingleUser: (userId: string) => Promise<boolean>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: JSON.parse(localStorage.getItem("userInfo")!) || null,
  isLoading: false,
  isError: null,
  allUsers: [],
  singleUser: null,
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
            role: userData.role,
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
      if (response.data.success) {
        const userData = response.data.user;
        set({
          user: {
            _id: userData._id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
          },
          isLoading: false,
        });

        return true;
      } else {
        set({
          isError: response.data.message || "Sign up failed",
          isLoading: false,
        });
        return false; // Indicate failure
      }
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
      localStorage.removeItem("userInfo");
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

  getCurrentUser: async () => {
    set({ isLoading: true, isError: null });
    const userInLocalStorage = JSON.parse(localStorage.getItem("userInfo")!);
    if (userInLocalStorage) {
      set({ user: userInLocalStorage, isLoading: false });

      return;
    }
    try {
      const response = await axios.get("/api/auth/getUser");
      const userData = response.data.user;
      console.log("Hit api");
      set({
        user: {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
        },
        isLoading: false,
      });
      localStorage.setItem("userInfo", JSON.stringify(userData));
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
  getAllUsers: async () => {
    set({ isLoading: true, isError: null });
    try {
      const response = await axios.get("/api/admin/getUsers");
      if (response.data.success) {
        set({
          allUsers: response.data.users,
          isLoading: false,
        });
        return true;
      } else {
        set({
          isError: response.data.message || "Failed to fetch users",
          isLoading: false,
        });
        return false;
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch users";
        set({ isError: errorMessage, isLoading: false });
      } else {
        set({ isError: "An unexpected error occurred", isLoading: false });
      }
      return false;
    }
  },
  getSingleUser: async (userId: string) => {
    set({ isLoading: true, isError: null });
    try {
      const response = await axios.get(
        `/api/admin/getSingleUserDetails/${userId}`
      );
      if (response.data.success) {
        set({
          singleUser: response.data.user, // Set the single user data
          isLoading: false,
        });
        return true; // Indicate success
      } else {
        set({
          isError: response.data.message || "Failed to fetch user",
          isLoading: false,
        });
        return false; // Indicate failure
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch user";
        set({ isError: errorMessage, isLoading: false });
      } else {
        set({ isError: "An unexpected error occurred", isLoading: false });
      }
      return false; // Indicate failure
    }
  },
}));
