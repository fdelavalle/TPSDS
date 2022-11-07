import useSWR from "swr";
import { User } from "../interface/User";
import axiosFetcher from "../utils/axiosFetcher";

interface APIResult {
  success: boolean;
  user: User;
}

interface UseProfileResult {
  user: User | null;
  error: Error | undefined;
}

export default function useProfile(): UseProfileResult {
  const { data, error } = useSWR<APIResult, Error>('/users/me', axiosFetcher);

  return {
    user: data?.user ?? null,
    error,
  }
}