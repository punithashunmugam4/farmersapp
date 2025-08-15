import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bg from "../assets/background.jpg";
import { signup } from "../api_call";
import Navigation from "./navigation.js";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const Signup = () => {
  const userRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const createuser = async (e) => {
    e.preventDefault();

    try {
      // const token = await window.grecaptcha.execute(
      //   process.env.REACT_APP_RECAPTCHA_V3_SITE_KEY,
      //   { action: "signup" }
      // );

      // const payload = { ...userDetails, captchaToken: token };

      const response = await signup(process.env.REACT_APP_API_URL, userDetails);
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
  const formatDate = (time) => {
    let t = dayjs(time).format("YYYY-MM-DD");
    return t;
  };

  const handleChange = (field, value) => {
    if (field === "dob") {
      value = formatDate(value);
    }
    setUserDetails((prev) => ({ ...prev, [field]: value }));
    console.log(userDetails);
  };
  useEffect(() => {
    userRef.current && userRef.current.focus();
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="min-h-screen ">
        <Navigation />
        <div className="flex justify-center">
          <div className="px-12 py-12 w-fit my-12 rounded-lg shadow-md flex flex-col gap-2 justify-center items-center bg-white bg-opacity-60 ">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Create your Account
            </h2>
            <form id="signup-form" onSubmit={createuser}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      required
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
                      id="name"
                      placeholder="Full Name"
                      ref={userRef}
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
                      required
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
                      id="email"
                      placeholder="Email"
                      type="email"
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="
   email"
                    >
                      Date of Birth
                    </label>
                    {/* <input
                      required
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
                      id="dob"
                      type="date"
                      onChange={(e) => handleChange("dob", e.target.value)}
                    /> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        className="bg-white rounded text-gray-700"
                        slotProps={{
                          textField: {
                            InputProps: {
                              className: "h-11",
                            },
                          },
                        }}
                        onChange={(value) => handleChange("dob", value)}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-l font-bold mb-2"
                      htmlFor="contact"
                    >
                      Contact Number
                    </label>
                    <input
                      required
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
                      id="contact"
                      placeholder="Contact Number"
                      onChange={(e) => handleChange("contact", e.target.value)}
                    />
                  </div>{" "}
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      required
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
                </div>
                <div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="
   address"
                    >
                      ADDRESS
                    </label>
                    <input
                      required
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
                      id="address"
                      placeholder="ADDRESS"
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
                      required
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
                      id="city"
                      placeholder="City"
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
                      required
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
                      id="state"
                      placeholder="State"
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
                      required
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
                      id="country"
                      placeholder="Country"
                      onChange={(e) => handleChange("country", e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-l font-bold mb-2"
                      htmlFor="zipcode"
                    >
                      Zip code
                    </label>
                    <input
                      required
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading
   tight focus:outline-none focus:shadow-outline"
                      id="zipcode"
                      placeholder="Zip Code"
                      onChange={(e) => handleChange("zipcode", e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 justify-between">
                <button
                  className="earth-500 hover:earth-700 text-white w-40 h-10 shadow-xl flex rounded items-center justify-center text-xl"
                  type="submit"
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
      </div>
    </div>
  );
};

export default Signup;
