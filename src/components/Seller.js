import React from "react";
import { useNavigate } from "react-router-dom";

const Seller = ({ validateSession, user, setUser }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      let session_valid = await validateSession();
      if (!session_valid) {
        window.location.href = "/login";
      }
    })();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="seller-page">
      <header className="seller-header">
        <div className="seller-title">Seller Dashboard</div>
        <div className="seller-actions">
          <span className="seller-user">{user?.username || "User"}</span>
          <button
            className="profile-btn"
            onClick={() => navigate("/profile")}
            title="Profile"
          >
            {/* Unicode male icon */}
            <span role="img" aria-label="Profile">
              👤
            </span>
          </button>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <img
              src={require("../assets/logout.png")}
              alt="Logout"
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </button>
        </div>
      </header>
      <div className="seller">
        <h2>Welcome Seller!</h2>
        <p>You can manage your products and orders here.</p>
        {/* Add more seller-specific content here */}
      </div>
    </div>
  );
};

export default Seller;
