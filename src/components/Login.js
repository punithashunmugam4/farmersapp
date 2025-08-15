import { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api_call";
import bg from "../assets/background.jpg";
import { HousePlus } from "lucide-react";

const Login = ({
  isSessionValid,
  setIsSessionValid,
  validateSession,
  setUser,
}) => {
  const navigate = useNavigate();
  const userRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log("Running UseEffect in Login.js");
    console.log("Is valid session: ", isSessionValid);
    userRef.current && userRef.current.focus();
    if (isSessionValid) {
      navigate("/");
    }
  }, [isSessionValid, navigate]);

  const createSession = async (e) => {
    e.preventDefault();
    const username = userRef.current.value;
    const password = e.target[1].value;

    const userdata = await login(
      process.env.REACT_APP_API_URL,
      username,
      password
    );
    if (userdata && userdata.token) {
      setUser(userdata.user);
      setIsSessionValid(true);
      navigate("/");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 "
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="px-20 py-12 bg-white bg-opacity-80  rounded-lg shadow-md">
        <Link to="/">
          <HousePlus />
        </Link>
        <h2 className="text-lg font-bold text-gray-700 mb-4">Login</h2>
        <form onSubmit={createSession}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="user_id"
            >
              User ID
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
              id="user_id"
              placeholder="User ID"
              ref={userRef}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
          </div>
          <div className="mb-6">
            <input
              className="show-password-checkbox"
              onClick={() => setShowPassword((prev) => !prev)}
              type="checkbox"
              id="showPassword"
            />
            <label htmlFor="showPassword" style={{ marginLeft: "6px" }}>
              Show Password
            </label>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <button
              className="earth-500 hover:earth-700 text-white px-5 py-2 shadow-xl flex rounded items-center justify-center text-lg"
              type="submit"
            >
              Sign In
            </button>
            <p className="text-sm sm:ml-2 text-center sm:text-left">
              No Account? Click{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                here
              </Link>{" "}
              to sign up.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
