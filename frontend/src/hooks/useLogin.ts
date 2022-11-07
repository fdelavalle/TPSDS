import { useCallback } from "react";
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface UseLoginResult {
  login(username: string, password: string): Promise<boolean>;
}

export default function useLogin(): UseLoginResult {
  const login = useCallback(async(username: string, password: string) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_API}/users/login`, { username, password });

      localStorage.setItem("token", data.token);
      
      return true;
    } catch(err) {
      if(err instanceof AxiosError) {
        toast.error(err.response?.data?.message ?? "Something gone wrong during Login");
      } else {
        toast.error("Something gone wrong during Login");
        console.error(err);
      }
      return false;
    }
  }, []);

  return {
    login
  }
}