import { create } from "zustand";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "production" | "admin";
}

interface UserStore {
  user: User | null;
  isLoading: boolean;
  isError: string | null;
  allUsers: User[];
  singleUser: User | null;
  signUp: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  getAllUsers: () => Promise<boolean>;
  getSingleUser: (userId: string) => Promise<boolean>;
}

const getStoredUser = (): User | null => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

export const useUserStore = create<UserStore>((set) => ({
  user: getStoredUser(),
  isLoading: false,
  isError: null,
  allUsers: [],
  singleUser: null,
  //   set({ isLoading: true, isError: null });
  //   try {
  //     const response = await axios.post("/api/auth/signup", {
  //       name,
  //       email,
  //       password,
  //     });
  //     const userData = response.data.newUser;
  //     const user = {
  //       _id: userData._id,
  //       name: userData.name,
  //       email: userData.email,
  //       role: userData.role,
  //     };
  //     set({ user, isLoading: false, isError: null });
  //     localStorage.setItem("userInfo", JSON.stringify(user));
  //     return true;
  //   } catch (error) {
  //     let errorMessage = "An unexpected error occurred";
  //     let statusCode = 500;
  //     if (axios.isAxiosError(error) && error.response) {
  //       errorMessage = error.response.data.message || "Failed to sign up";
  //       statusCode = error.response.status;
  //     }
  //     set({ isError: errorMessage, isLoading: false });
  //     return { success: false, statusCode };
  //   }
  // },
  signUp: async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    set({ isLoading: true, isError: null });
    try {
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
        role,
      });
      const userData = response.data.user;
      console.log(userData);

      set({ isLoading: false, isError: null });
      // localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to sign up"
        : "An unexpected error occurred";
      set({ isError: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, isError: null });
    try {
      const response = await axios.post("/api/auth/login", { email, password });

      const userData = await response.data.user;
      const user = {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      };
      set({ user, isLoading: false });
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to sign up"
        : "An unexpected error occurred";
      set({ isError: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  logout: async () => {
    set({ isLoading: true, isError: null });
    try {
      await axios.post("/api/auth/logout");
      set({ user: null, isLoading: false });
      localStorage.removeItem("userInfo");
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to logout"
        : "An unexpected error occurred";
      set({ isError: errorMessage, isLoading: false });
    }
  },

  getCurrentUser: async () => {
    set({ isLoading: true, isError: null });
    const storedUser = getStoredUser();
    if (storedUser) {
      set({ user: storedUser, isLoading: false });
      return;
    }
    try {
      const response = await axios.get("/api/auth/getUser");
      const userData = response.data;
      const user = {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      };
      set({ user, isLoading: false });
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to fetch user"
        : "An unexpected error occurred";
      set({ isError: errorMessage, isLoading: false, user: null });
      localStorage.removeItem("userInfo");
    }
  },

  getAllUsers: async () => {
    set({ isLoading: true, isError: null });
    try {
      const response = await axios.get("/api/admin/getUsers");
      if (response.data.success) {
        set({ allUsers: response.data.users, isLoading: false });
        return true;
      } else {
        set({
          isError: response.data.message || "Failed to fetch users",
          isLoading: false,
        });
        return false;
      }
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to fetch users"
        : "An unexpected error occurred";
      set({ isError: errorMessage, isLoading: false });
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
        set({ singleUser: response.data.user, isLoading: false });
        return true;
      } else {
        set({
          isError: response.data.message || "Failed to fetch user",
          isLoading: false,
        });
        return false;
      }
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to fetch user"
        : "An unexpected error occurred";
      set({ isError: errorMessage, isLoading: false });
      return false;
    }
  },
}));
