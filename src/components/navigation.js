import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sprout, Bell, CircleUser } from "lucide-react";
import { Button } from "@mui/material";

export default function Navigation({ isSessionValid, setIsSessionValid }) {
  const navigate = useNavigate();
  const [showProfilenavigation, setShowProfilenavigation] = useState(false);

  return (
    <nav className="bg-white bg-opacity-80 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm"
                >
                  Sell Products
                </a>
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
            <button className="text-gray-600 hover:text-gray-900">
              <Bell className="w-5 h-5" />
            </button>
            {isSessionValid ? (
              <div className="relative">
                <button
                  onClick={() =>
                    setShowProfilenavigation(!showProfilenavigation)
                  }
                  className="text-gray-600 hover:text-gray-900"
                >
                  <CircleUser />{" "}
                </button>
                {showProfilenavigation && (
                  <div className="absolute bg-white shadow-md p-4 w-48">
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
                            navigate("/");
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
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
