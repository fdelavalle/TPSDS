import { Formik, Form, Field } from "formik";
import { useCallback } from "react";
import { useLocation } from "wouter";
import useSignUp from "../hooks/useSignUp";

interface SignUpProps {
  username: string;
  password: string;
}

export default function SignUp() {
  const { signUp } = useSignUp();
  const [_, setLocation] = useLocation();

  const onSubmit = useCallback(async(values: SignUpProps) => {
    const success = await signUp(values.username, values.password);

    if(success) {
      setLocation("/");
    }
  }, []);

  return (
    <div>
      <h1 className="text-neutral-100 text-4xl mb-4">Sign Up</h1>
      <Formik initialValues={{ username: "", password: "" }} onSubmit={onSubmit}>
        <Form>
          <Field name="username" className="input my-1" placeholder="Enter username..." />
          <Field name="password" className="input my-1" placeholder="Enter password..." type="password" />
          <div className="flex justify-end">
            <button className="btn-primary" type="submit">Sign Up</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}