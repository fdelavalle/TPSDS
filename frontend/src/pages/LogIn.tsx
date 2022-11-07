import { Formik, Form, Field } from "formik";
import { useCallback } from "react";
import { useLocation } from "wouter";
import useLogin from "../hooks/useLogin";

interface LogInProps {
  username: string;
  password: string;
}

export default function LogIn() {
  const { login } = useLogin();
  const [_, setLocation] = useLocation();

  const onSubmit = useCallback(async(values: LogInProps) => {
    const success = await login(values.username, values.password);

    if(success) {
      setLocation("/profile");
    }
  }, []);

  return (
    <div>
      <h1 className="text-neutral-100 text-4xl mb-4">Log In</h1>
      <Formik initialValues={{ username: "", password: "" }} onSubmit={onSubmit}>
        <Form>
          <Field name="username" className="input my-1" placeholder="Enter username..." />
          <Field name="password" className="input my-1" placeholder="Enter password..." type="password" />
          <div className="flex justify-end">
            <button className="btn-primary" type="submit">Log In</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}