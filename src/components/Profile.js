import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  get_my_user_details,
  update_user_details,
  validateSession_call,
} from "../api_call.js";
import bg from "../assets/background.jpg";
import Navigation from "./navigation.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = ({ isSessionValid, setIsSessionValid, user, setUser }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const userRef = useRef(null);
  console.log("Profile: ", user);
  const [form, setForm] = useState({
    // name: user?.name || "",
    // email: user?.email || "",
    // address: user?.address || "",
    // city: user?.city || "",
    // state: user?.state || "",
    // zipcode: user?.zipcode || "",
    // country: user?.country || "",
    // contact: user?.contact || "",
    // dob: user?.dob ? user.dob.slice(0, 10) : "",
    // contract_users: user?.contract_users || [],
  });

  console.log("Form state: ", form);
  useEffect(() => {
    console.log("Running UseEffect in home.js");
    (async () => {
      let token = sessionStorage.getItem("session_token_farmersapp");
      const validateSession_x = async () => {
        const token = sessionStorage.getItem("session_token_farmersapp");
        let res = await validateSession_call(
          process.env.REACT_APP_API_URL,
          token
        );
        if (res === false) {
          setUser(null);
          return false;
        }
        if (res.username) {
          return res;
        }
      };
      console.log("Validating session in Home.js");
      let tempSession = await validateSession_x();
      if (tempSession === false) {
        console.log("Session is invalid, redirecting to login page.");
        setIsSessionValid(false);
        navigate("/login");
      } else if (tempSession.username) {
        console.log("Get usedetails in Home.js");
        let user_details = await get_my_user_details(
          process.env.REACT_APP_API_URL,
          token
        );
        setUser(user_details);
        setIsSessionValid(true);
        // setForm(user_details);
        // setForm((prev) => ({
        //   ...prev,
        //   dob: user_details?.dob ? user_details?.dob.slice(0, 10) : "",
        //   password: "",
        //   contract_users:
        //     user_details?.contract_users &&
        //     user_details?.contract_users.length > 0
        //       ? user_details?.contract_users.join(",")
        //       : "",
        // }));
      }
    })();
  }, [isSessionValid]);

  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var updatedUser = form;
    if (form.contract_users) {
      updatedUser = {
        ...form,
        contract_users:
          typeof form.contract_users === "String"
            ? form.contract_users?.split(",")
            : form.contract_users,
      };
    }
    const token = sessionStorage.getItem("session_token_farmersapp");
    let response = await update_user_details(
      process.env.REACT_APP_API_URL,
      token,
      updatedUser
    );
    if (response.status === 201 || response.status === 200) {
      toast.success("🚀 Profile details updated successfully!");
      //  navigate("/");
    } else {
      toast.error("Failed to update details. Please try again later.");
    }
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
                value={user?.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
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
                value={user?.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
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
                value={user?.address || ""}
                onChange={(e) => handleChange("address", e.target.value)}
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
                value={user?.city || ""}
                onChange={(e) => handleChange("city", e.target.value)}
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
                value={user?.state || ""}
                onChange={(e) => handleChange("state", e.target.value)}
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
                value={user?.country || ""}
                onChange={(e) => handleChange("country", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-l font-bold mb-2"
                htmlFor="zipcode"
              >
                Zip Code
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
                id="zipcode"
                placeholder="zipcode"
                value={user?.zipcode || ""}
                onChange={(e) => handleChange("zipcode", e.target.value)}
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
                value={user?.contact || ""}
                onChange={(e) => handleChange("contact", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-l font-bold mb-2"
                htmlFor="contract_users"
              >
                Conract Users
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
                id="contract_users"
                placeholder="Contract users if available (comma separated value)"
                value={user?.contract_users || ""}
                onChange={(e) => handleChange("contract_users", e.target.value)}
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
                onChange={(e) => handleChange("password", e.target.value)}
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
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Profile;
