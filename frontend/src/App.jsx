import React ,{useState} from "react";
import { Routes ,Route, useNavigate} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const navigate = useNavigate();

  const clearAuth = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token")
    } catch (error) {
      console.error("Clear Auth error: ",error)
    }
    setUser(null );
    setToken(null);
  }
  
  const handelLogout = () => {
    clearAuth();
    navigate("/login");
  }
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
    </>
  );
};

export default App;
