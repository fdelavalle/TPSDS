import { useCallback } from "react";
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { User } from "../interface/User";

type APIResult = {
  success: true;
  user: User;
} | {
  success: false;
  user: null;
}

interface UseWithdrawResult {
  withdraw(): Promise<APIResult>;
}

export default function useWithdraw(): UseWithdrawResult {
  const withdraw = useCallback(async() => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_API}/users/withdraw`, undefined, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      return {
        success: true as const,
        user: data.user as User
      };

    } catch(err) {
      if(err instanceof AxiosError) {
        toast.error(err.response?.data?.message ?? "Something gone wrong during Login");
      } else {
        toast.error("Something gone wrong during Login");
        console.error(err);
      }
      return {
        success: false as const,
        user: null
      };
    }
  }, []);

  return {
    withdraw
  }
}