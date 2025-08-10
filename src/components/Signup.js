import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bg from "../assets/background.jpg";
import { Home } from "lucide-react";

function Signup() {
  const userRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const createuser = async (e) => {
    e.preventDefault();
    const base_url = "http://localhost:3500/api/";
    const username = userRef.current.value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    try {
      const response = await fetch(`${base_url}user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      console.log(response.status);
      if (response.status === 201) {
        alert("User created successfully!");
        window.location.href = "/login";
      } else if (response.status === 400) {
        alert("User/Mail ID already exists or error occurred.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred while creating the user.");
    }
  };

  useEffect(() => {
    userRef.current && userRef.current.focus();
  }, []);
  return (
    <div
      className="flex items-center justify-center min-h-screen "
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="px-20 py-12 bg-white bg-opacity-80 rounded-lg shadow-md">
        <Link to="/">
          <Home />
        </Link>
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Create your Account
        </h2>
        <form onSubmit={createuser}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
              id="name"
              placeholder="Full Name"
              ref={userRef}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="
   email"
            >
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
              id="email"
              placeholder="Email"
              type="email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="
   address"
            >
              ADDRESS
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
              id="address"
              placeholder="ADDRESS"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
              id="city"
              placeholder="City"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="state"
            >
              State
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
              id="state"
              placeholder="State"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-l font-bold mb-2"
              htmlFor="country"
            >
              Country
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
              id="country"
              placeholder="Country"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-l font-bold mb-2"
              htmlFor="contact"
            >
              Contact Number
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
              id="contact"
              placeholder="Contact Number"
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
          <div className="flex items-center justify-between">
            <button
              className="earth-500 hover:earth-700 text-white w-20 h-10 shadow-xl flex rounded items-center justify-center text-xl"
              type="Submit"
            >
              Sign Up
            </button>
            <p style={{ marginLeft: "6px" }}>
              Account already exist ? Click{" "}
              <Link to="/login" style={{ color: "blue" }}>
                here
              </Link>{" "}
              to sign in.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
