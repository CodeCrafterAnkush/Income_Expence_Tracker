import React ,{useState} from "react";
import { Routes ,Route, useNavigate} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";

const App = () => {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const navigate = useNavigate();

  // to save the token
  const persistAuth = (userObj, tokenStr, remember = false) => {
    try {
      if (remember) {
        if (userObj) localStorage.setItem("user", JSON.stringify(userObj));
        if (tokenStr) localStorage.setItem("token", tokenStr);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
      } else {
        if (userObj) sessionStorage.setItem("user", JSON.stringify(userObj));
        if (tokenStr) sessionStorage.setItem("token", tokenStr);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
      setUser(userObj || null);
      setToken(tokenStr || null);
    } catch (err) {
      console.error("persistAuth error:", err);
    }
  };

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

  const handleLogin = (userData, remember= false, tokenFromApi =null) => {
    parsistAuth(userData, remember, tokenFromApi);
    navigate("/");
  };
  
  return (
    <>
    <Routes>

      <Route path="/login" element={<Login  onLogin={handleLogin}/>} />
      
      <Route path="/" element={<Layout user={user}
      onLogout={handelLogout}/>}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
    </>
  );
};

export default App;
