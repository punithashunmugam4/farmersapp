import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Sprout, Bell, CircleUser, CheckCheck, Loader2 } from "lucide-react";
import { Button } from "@mui/material";
import {
  get_my_notification,
  mark_my_notification,
  clear_my_notification,
  mark_all_read,
} from "../api_call";

export default function Navigation({
  isSessionValid,
  setIsSessionValid,
  user,
}) {
  const navigate = useNavigate();
  const [showProfilenavigation, setShowProfilenavigation] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const [mobileNotification, setMobileNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const markAsRead = (v) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === v.id ? { ...n, is_read: !v.is_read } : n))
    );
    if (!v.is_read) setUnreadCount((prev) => prev - 1);
    else setUnreadCount((prev) => prev + 1);

    mark_my_notification(
      process.env.REACT_APP_API_URL,
      sessionStorage.getItem("session_token_farmersapp"),
      { ...v, is_read: !v.is_read }
    );
  };

  const markAllAsRead = () => {
    mark_all_read(
      process.env.REACT_APP_API_URL,
      sessionStorage.getItem("session_token_farmersapp")
    );
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnreadCount(0);
  };

  const getNotificationCall = async () => {
    if (isSessionValid) {
      let temp_notification = await get_my_notification(
        process.env.REACT_APP_API_URL,
        sessionStorage.getItem("session_token_farmersapp")
      );
      setNotifications(() => {
        console.log(temp_notification);
        if (Array.isArray(temp_notification)) return temp_notification;
        else return [];
      });
      setUnreadCount(
        Array.isArray(temp_notification)
          ? temp_notification.filter((e) => !e.is_read).length
          : 0
      );
    }
    setIsLoading(false);
  };

  const readAndNavigate = (v) => {
    markAsRead(v);
    setUnreadCount((prev) => prev - 1);
    if (v.message.includes("placed")) navigate("/myproducts");
    else navigate("/mybids");
  };

  const clearAllNotifications = () => {
    clear_my_notification(
      process.env.REACT_APP_API_URL,
      sessionStorage.getItem("session_token_farmersapp")
    );
    setUnreadCount(0);
    setNotifications([]);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      // Notification popup
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotification(false);
      }

      // Profile dropdown
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfilenavigation(false);
      }
    }
    if (isSessionValid) {
      (async () => {
        let temp_notification = await get_my_notification(
          process.env.REACT_APP_API_URL,
          sessionStorage.getItem("session_token_farmersapp")
        );
        setUnreadCount(
          Array.isArray(temp_notification)
            ? temp_notification.filter((e) => !e.is_read).length
            : 0
        );
        setNotifications(() => {
          console.log(temp_notification);
          if (Array.isArray(temp_notification)) return temp_notification;
          else return [];
        });
      })();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white bg-opacity-80 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
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
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm"
                >
                  How It Works
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <p>Welcome {user?.name} !</p>
            <div className="relative">
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => {
                  setShowNotification(!showNotification);
                  setMobileNotification(!mobileNotification);
                }}
              >
                <Bell className="w-6 h-6" onClick={getNotificationCall} />
                {/* Badge */}
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Desktop Nav */}
              <div className="hidden md:block">
                <div className="relative ">
                  {showNotification && (
                    <div
                      className="absolute insert-0 z-50  bg-white shadow-md p-4 -top-1 -right-1 w-72 "
                      ref={notificationRef}
                    >
                      {isSessionValid ? (
                        <ul className="space-y-2">
                          <li className="flex justify-between text-sm cursor-pointer">
                            <span onClick={clearAllNotifications}>
                              Clear all
                            </span>
                            <CheckCheck onClick={() => markAllAsRead()} />
                          </li>
                          {isLoading && (
                            <div className="flex justify-center items-center p-4">
                              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                            </div>
                          )}
                          {notifications.length > 0 ? (
                            notifications.map((v) => {
                              return (
                                <li
                                  key={v.id}
                                  className={`flex justify-between p-2 border-b-2 animate-pulse ${
                                    v.is_read ? "" : "bg-farm-blue-500"
                                  }`}
                                >
                                  <p
                                    className="block text-gray-700 hover:text-farm-green-600"
                                    onClick={() => readAndNavigate(v)}
                                  >
                                    {v.message}
                                  </p>
                                  <CheckCheck
                                    className={`cursor-pointer ${
                                      v.is_read ? "" : "text-farm-green-600"
                                    }`}
                                    onClick={() => markAsRead(v)}
                                  />
                                </li>
                              );
                            })
                          ) : (
                            <p>No notifications</p>
                          )}
                        </ul>
                      ) : (
                        <li className="flex justify-center">
                          <p className="text-lg">Please Sign in</p>
                        </li>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Menu */}
              {mobileNotification && (
                <div className="fixed md:hidden inset-0 bg-white z-50 p-6 overflow-y-auto">
                  <button
                    className="absolute top-4 right-4 text-gray-600 text-4xl"
                    onClick={() => setMobileNotification(false)}
                  >
                    &times;
                  </button>
                  {isSessionValid ? (
                    <ul className="space-y-6 mt-12 text-lg">
                      <li className="flex justify-between text-sm cursor-pointer">
                        <span onClick={clearAllNotifications}>Clear all</span>
                        <CheckCheck onClick={() => markAllAsRead()} />
                      </li>
                      {isLoading && (
                        <div className="flex justify-center items-center p-4">
                          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                        </div>
                      )}

                      {Array.isArray(notifications) ? (
                        notifications.map((v) => {
                          return (
                            <li
                              key={v.id}
                              className={`flex justify-between p-2 border-b-2 ${
                                v.is_read ? "" : "bg-farm-blue-500"
                              }`}
                            >
                              <p
                                onClick={() => readAndNavigate(v)}
                                className="block text-gray-700 hover:text-farm-green-600"
                              >
                                {v.message}
                              </p>
                              <CheckCheck
                                className={`cursor-pointer ${
                                  v.is_read ? "" : "text-farm-green-600"
                                }`}
                                onClick={() => markAsRead(v)}
                              />
                            </li>
                          );
                        })
                      ) : (
                        <p>No notifications</p>
                      )}
                    </ul>
                  ) : (
                    <li className="flex justify-center">
                      <button
                        className="farm-green-600 hover:farm-green-800 text-white w-24 rounded shadow-xl h-14 text-l"
                        onClick={() => navigate("/login")}
                      >
                        Please Sign in
                      </button>
                    </li>
                  )}
                </div>
              )}
            </div>
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
                      <div
                        className="absolute bg-white shadow-md p-4 w-36"
                        ref={profileRef}
                      >
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
