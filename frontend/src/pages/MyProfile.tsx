import { useCallback } from "react";
import useProfile from "../hooks/useProfile"
import useWithdraw from "../hooks/useWithdraw";
import { useSWRConfig } from 'swr';
import { useLocation } from "wouter";

export default function MyProfile() {
  const [_, setLocation] = useLocation();
  const { mutate } = useSWRConfig();
  const { user } = useProfile();
  const { withdraw } = useWithdraw();

  const onWithdraw = useCallback(async () => {
    const result = await withdraw();

    if(result.success) {
      mutate('/users/me', result.user, { optimisticData: result.user, rollbackOnError: true })
    }
  }, []);

  const onLogOut = useCallback(() => {
    localStorage.removeItem("token");
    setLocation("/", { replace: true })
  }, []);

  return (
    <div>
      <h1 className="text-neutral-100 text-4xl mb-4">My Profile</h1>

      <div className="my-4">
        <h2 className="text-2xl text-neutral-300">Username</h2>
        <p>{user?.username}</p>

        <h2 className="text-2xl text-neutral-300">Amount Available</h2>
        <p>{user?.amountAvailable}</p>

        <div className="flex justify-end gap-2">
          <button className="btn-primary" onClick={onWithdraw}>Withdraw -50$</button>
          <button className="btn-danger" onClick={onLogOut}>Log out</button>
        </div>
      </div>
    </div>
  )
}