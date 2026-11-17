import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.js";
import Signup from "./components/Signup";
import MyBids from "./components/MyBids.js";
import MyProducts from "./components/MyProducts.js";
import Profile from "./components/Profile.js";
import { useState } from "react";
import Home from "./components/Home.js";
import NotFound from "./components/not-found.js";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

const TooltipProvider = TooltipPrimitive.Provider;
function App() {
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   console.log("Running UseEffect in App.js");
  //   validateSession();
  // }, []);
  return (
    <TooltipProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route
            path="/login"
            element={<Login setUser={setUser} user={user} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/mybids"
            element={<MyBids user={user} setUser={setUser} />}
          />
          <Route
            path="/myproducts"
            element={<MyProducts user={user} setUser={setUser} />}
          />
          <Route
            path="/profile"
            element={<Profile user={user} setUser={setUser} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  );
}

export default App;
