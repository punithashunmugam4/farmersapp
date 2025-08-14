import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.js";
import Signup from "./components/Signup";
import MyBids from "./components/MyBids.js";
import MyProducts from "./components/MyProducts.js";
import Profile from "./components/Profile.js";
import { useState, useEffect } from "react";
import { validateSession_call } from "./api_call.js";
import Home from "./components/Home.js";
import NotFound from "./components/not-found.js";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

const TooltipProvider = TooltipPrimitive.Provider;
function App() {
  const [user, setUser] = useState(null);
  const [isSessionValid, setIsSessionValid] = useState(false);

  const validateSession = async () => {
    const token = sessionStorage.getItem("session_token_farmersapp");
    let res = await validateSession_call(process.env.REACT_APP_API_URL, token);
    if (res === false) {
      setUser(null);
      return false;
    }
    if (res.username) {
      return res;
    }
  };
  // useEffect(() => {
  //   console.log("Running UseEffect in App.js");
  //   validateSession();
  // }, []);
  return (
    <TooltipProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isSessionValid={isSessionValid}
                setIsSessionValid={setIsSessionValid}
                validateSession={validateSession}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                isSessionValid={isSessionValid}
                setIsSessionValid={setIsSessionValid}
                validateSession={validateSession}
                setUser={setUser}
                user={user}
              />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/mybids"
            element={
              <MyBids
                isSessionValid={isSessionValid}
                setIsSessionValid={setIsSessionValid}
                validateSession={validateSession}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/myproducts"
            element={
              <MyProducts
                isSessionValid={isSessionValid}
                setIsSessionValid={setIsSessionValid}
                validateSession={validateSession}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                isSessionValid={isSessionValid}
                setIsSessionValid={setIsSessionValid}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  );
}

export default App;
