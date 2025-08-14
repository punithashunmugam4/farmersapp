import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sprout, Bell, CircleUser } from "lucide-react";
import { Button } from "@mui/material";

export default function Navigation({
  isSessionValid,
  setIsSessionValid,
  user,
}) {
  const navigate = useNavigate();
  const [showProfilenavigation, setShowProfilenavigation] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="bg-white bg-opacity-80 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Sprout className="text-farm-green-600 text-2xl mr-2" />
              <span className="text-xl font-bold text-gray-900">FarmBid</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="text-farm-green-600 font-medium px-3 py-2 rounded-md text-sm"
                >
                  Marketplace
                </Link>
                <Link
                  to="/myproducts"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm"
                >
                  Sell Products
                </Link>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm"
                >
                  How It Works
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <p>Welcome {user?.name} !</p>
            <button className="text-gray-600 hover:text-gray-900">
              <Bell className="w-5 h-5" />
            </button>
            <div className="relative">
              {/* Hamburger for mobile */}
              <button
                className="md:hidden text-gray-700 p-2"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Desktop Nav */}
              <div className="hidden md:block">
                {isSessionValid ? (
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowProfilenavigation(!showProfilenavigation)
                      }
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <CircleUser />
                    </button>
                    {showProfilenavigation && (
                      <div className="absolute bg-white shadow-md p-4 w-36">
                        <ul className="space-y-2">
                          <li>
                            <Link
                              to="/profile"
                              className="block text-gray-700 hover:text-farm-green-600"
                            >
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/mybids"
                              className="block text-gray-700 hover:text-farm-green-600"
                            >
                              My Bids
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/myproducts"
                              className="block text-gray-700 hover:text-farm-green-600"
                            >
                              My Products
                            </Link>
                          </li>
                          <li>
                            <Button
                              className="block text-gray-700 hover:text-white hover:bg-farm-red-500 w-full text-left"
                              onClick={() => {
                                setIsSessionValid(false);
                                setShowProfilenavigation(false);
                                sessionStorage.removeItem(
                                  "session_token_farmersapp"
                                );
                                navigate("/login");
                              }}
                            >
                              Log out
                            </Button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    className="farm-green-600 hover:bg-farm-green-800 text-white w-20 h-10 rounded shadow-xl flex items-center justify-center text-xl"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </button>
                )}
              </div>

              {/* Mobile Menu */}
              {showMobileMenu && (
                <div className="fixed md:hidden inset-0 bg-white z-50 p-6 overflow-y-auto">
                  <button
                    className="absolute top-4 right-4 text-gray-600 text-4xl"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    &times;
                  </button>
                  <ul className="space-y-6 mt-12 text-lg">
                    {isSessionValid ? (
                      <>
                        <li>
                          <Link
                            to="/profile"
                            className="block text-gray-700 hover:text-farm-green-600"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/mybids"
                            className="block text-gray-700 hover:text-farm-green-600"
                          >
                            My Bids
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/myproducts"
                            className="block text-gray-700 hover:text-farm-green-600"
                          >
                            My Products
                          </Link>
                        </li>
                        <li>
                          <Button
                            className="block text-gray-700 hover:text-white hover:bg-farm-red-500 w-full text-left"
                            onClick={() => {
                              setIsSessionValid(false);
                              setShowMobileMenu(false);
                              sessionStorage.removeItem(
                                "session_token_farmersapp"
                              );
                              navigate("/login");
                            }}
                          >
                            Log out
                          </Button>
                        </li>
                      </>
                    ) : (
                      <li className="flex justify-center">
                        <button
                          className="farm-green-600 hover:farm-green-800 text-white w-24 rounded shadow-xl h-14 text-l"
                          onClick={() => {
                            setShowMobileMenu(false);
                            navigate("/login");
                          }}
                        >
                          Sign In
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
