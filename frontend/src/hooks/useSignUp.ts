import { useCallback } from "react";
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface UseSignUpResult {
  signUp(username: string, password: string): Promise<boolean>;
}

export default function useSignUp(): UseSignUpResult {
  const signUp = useCallback(async(username: string, password: string) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_API}/users/`, { username, password });

      return true;
    } catch(err) {
      if(err instanceof AxiosError) {
        toast.error(err.response?.data?.message ?? "Something gone wrong during Sign Up");
      } else {
        toast.error("Something gone wrong during Sign Up");
        console.error(err);
      }
      return false;
    }
  }, []);

  return {
    signUp
  }
}