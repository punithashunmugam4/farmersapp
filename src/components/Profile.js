import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { get_user_details, update_user_details } from "../api_call.js";
import bg from "../assets/background.jpg";
import Navigation from "./navigation.js";

const base_url = "http://localhost:3500/api/";
const Profile = ({ isSessionValid, setIsSessionValid, user, setUser }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const userRef = useRef(null);
  console.log("Profile: ", user);
  const [form, setForm] = useState({
    userid: user?.userid || "",
    username: user?.username || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    zipcode: user?.zipcode || "",
    country: user?.country || "",
    contact: user?.contact || "",
    phone: user?.phone || "",
    dob: user?.dob ? user.dob.slice(0, 10) : "",
    contracted_users:
      user?.contracted_users && user?.contracted_users.length > 0
        ? user?.contracted_users.join(",")
        : "",
    user_type: user?.user_type || "",
  });
  const getUserDetails = async () => {
    // const userdetails = await get_user_details(
    //   base_url,
    //   sessionStorage.getItem("session_token_farmersapp"),
    //   {
    //     username: typeof user == "String" ? user.split("-")[1] : user,
    //   }
    // );
    const userdetails = user;
    console.log("User Details:", userdetails);
    console.log("Conracted users: ", userdetails?.contracted_users);
    setForm(userdetails);
    setForm((prev) => ({
      ...prev,
      dob: userdetails?.dob ? userdetails?.dob.slice(0, 10) : "",
      contracted_users:
        userdetails?.contracted_users &&
        userdetails?.contracted_users.length > 0
          ? userdetails?.contracted_users.join(",")
          : "",
    }));
  };
  console.log("Form state: ", form);
  // useEffect(() => {
  //   (async () => {
  //     let session_valid = await validateSession();
  //     if (!session_valid) {
  //       navigate("/login");
  //     }
  //   })();
  //   getUserDetails();
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user?.split("-")[0]);
    const updatedUser = {
      ...form,
      userid: `${user?.split("-")[0]}`,
      contracted_users: form?.contracted_users
        ?.split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    const token = sessionStorage.getItem("session_token_farmersapp");
    const user_update_res = await update_user_details(
      base_url,
      token,
      updatedUser
    );

    sessionStorage.setItem("user_type", user_update_res.user_type);
    navigate("/");
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUser && setUser(null);
    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="min-h-screen">
        <Navigation
          isSessionValid={isSessionValid}
          setIsSessionValid={setIsSessionValid}
        />
        <div className="px-20 py-12 rounded-lg shadow-md flex flex-col justify-center items-center bg-white bg-opacity-60">
          <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
            Welcome to Your Profile, {user?.username || "User"}!
          </h2>
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
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
                Change Password
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
            <div className="flex items-center justify-center">
              <button
                className="earth-500 hover:earth-700 text-white w-40 h-12 shadow-xl flex rounded items-center justify-center text-xl"
                type="Submit"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
