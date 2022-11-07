import { Route } from "wouter";
import Layout from "./components/Layout";
import LogIn from "./pages/LogIn";
import MainPage from "./pages/MainPage";
import MyProfile from "./pages/MyProfile";

export default function App() {
  return (
    <div>
      <Route path="/">
        <Layout>
          <MainPage />
        </Layout>
      </Route>
      <Route path="/login">
        <Layout>
          <LogIn />
        </Layout>
      </Route>
      <Route path="/profile">
        <Layout>
          <MyProfile />
        </Layout>
      </Route>
    </div>
  )
}
