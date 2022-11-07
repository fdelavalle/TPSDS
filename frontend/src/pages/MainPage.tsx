import { useCallback } from "react";
import { useLocation } from "wouter";

export default function MainPage() {
  const [_, setLocation] = useLocation();

  const onLogInClick = useCallback(() => {
    setLocation("/login")
  }, [])

  const onSignUpClick = useCallback(() => {
    setLocation("/sign-up")
  }, [])

  return (
    <div>
      <h1 className="text-neutral-100 text-4xl mb-4">Main Page</h1>
      <div className="flex gap-4">
        <button className="btn-primary" onClick={onLogInClick}>Log In</button>
        <button className="btn-primary" onClick={onSignUpClick}>Sign Up</button>
      </div>
    </div>
  )
}