import { create } from "zustand";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "production" | "admin";
  createdAt?: Date;
}

interface UserStore {
  user: User | null;
  isLoading: boolean;
  allUsers: User[];
  singleUser: User | null;
  signUp: (
    name: string,
    email: string,
    password: string,
    role: string,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoggedOut: boolean;
  getCurrentUser: () => Promise<void>;
  getAllUsers: () => Promise<void>;
  getSingleUser: (userId: string) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

const getStoredUser = (): User | null => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

export const useUserStore = create<UserStore>((set, get) => ({
  user: getStoredUser(),
  isLoading: false,
  allUsers: [],
  singleUser: null,
  isLoggedOut: false,
  signUp: async (
    name: string,
    email: string,
    password: string,
    role: string,
  ) => {
    set({ isLoading: true });
    try {
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
        role,
      });
      const userData = response.data.user;
      console.log(userData);

      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to sign up");
      }
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true });
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
      set({ isLoading: false });
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to log in");
      }
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axios.post("/api/auth/logout");
      set({ user: null, isLoading: false, isLoggedOut: true });
      localStorage.removeItem("userInfo");
    } catch (error) {
      set({ isLoading: false });
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to log out");
      }
      throw error;
    }
  },

  getCurrentUser: async () => {
    set({ isLoading: true });
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
      set({ isLoading: false, user: null });
      localStorage.removeItem("userInfo");
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to fetch user");
      }
      throw error;
    }
  },

  getAllUsers: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get("/api/admin/getUsers");
      if (response.data.success) {
        set({ allUsers: response.data.users, isLoading: false });
      } else {
        set({ isLoading: false });
        throw new Error(response.data.message || "Failed to fetch users");
      }
    } catch (error) {
      set({ isLoading: false });
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to fetch users");
      }
      throw error;
    }
  },

  getSingleUser: async (userId: string) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        `/api/admin/getSingleUserDetails/${userId}`,
      );
      if (response.data.success) {
        set({ singleUser: response.data.user, isLoading: false });
      } else {
        set({ isLoading: false });
        throw new Error(response.data.message || "Failed to fetch user");
      }
    } catch (error) {
      set({ isLoading: false });
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to fetch user");
      }
      throw error;
    }
  },
  deleteUser: async (userId: string) => {
    set({ isLoading: true });
    try {
      const response = await axios.delete(`/api/admin/deleteUser/${userId}`);
      const userToBeDeleted = response.data.user;
      const currentUsers = get().allUsers;
      const updatedUsers = currentUsers.filter(
        (user) => user._id !== userToBeDeleted._id,
      );
      set({ allUsers: updatedUsers, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Failed to delete user");
      }
      throw error;
    }
  },
}));
