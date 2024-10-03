import { create } from "zustand";
import Cookies from "js-cookie";
// import { MongoClient, ObjectId } from 'mongodb'

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
  checkAuth: () => Promise<void>;
}
