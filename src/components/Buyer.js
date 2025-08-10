import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { get_all_loads } from "../api_call"; // Import your API call function
const columns = [
  { key: "auction_id", label: "Auction ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "product", label: "Product" },
  { key: "weight", label: "Weight" },
  { key: "quantity", label: "Quantity" },
  { key: "contact", label: "Contact" },
  { key: "product_grade", label: "Grade" },
  { key: "min_bid", label: "Min Bid" },
  { key: "max_bid", label: "Max Bid" },
  { key: "createdAt", label: "Created At" },
  { key: "new_rate", label: "New Rate" }, // New column for input
  { key: "action", label: "Action" }, // Action column for buttons
];
const base_url = "http://localhost:3500/api/";
const Buyer = ({ validateSession, user, setUser }) => {
  const [auctions, setAuctions] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const navigate = useNavigate();

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getallloads = async () => {
    let data = await get_all_loads(
      base_url,
      sessionStorage.getItem("session_token_farmersapp")
    );
    setAuctions(data);
  };
  useEffect(() => {
    (async () => {
      let session_valid = await validateSession(); // Validate session on component mount
      if (!session_valid) {
        navigate("/login");
      }
    })();
    getallloads();
    // get_user_details();
  }, []);
  const sortedAuctions = useMemo(() => {
    if (!sortConfig.key) return auctions;
    const sorted = [...auctions].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Special handling for max_bid and createdAt
      if (sortConfig.key === "max_bid") {
        aValue = a.max_bid?.submit_amount || 0;
        bValue = b.max_bid?.submit_amount || 0;
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else if (sortConfig.key === "createdAt") {
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
      } else if (!isNaN(aValue) && !isNaN(bValue)) {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else {
        aValue = aValue?.toString().toLowerCase();
        bValue = bValue?.toString().toLowerCase();
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [auctions, sortConfig]);

  const addNewBid = (e) => {
    e.preventDefault();
    const newBid = {
      auction_id: e.target.closest("tr").children[0].innerText,
      new_rate: e.target.previousSibling.value,
    };
    console.log("New Bid:", newBid);
    // Call API to add new bid
    fetch(`${base_url}data/add_bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(
          "session_token_farmersapp"
        )}`,
      },
      body: JSON.stringify(newBid),
    });
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="buyer-page">
      <header className="buyer-header">
        <div className="buyer-title">Buyer Dashboard</div>
        <div className="buyer-actions">
          <span className="buyer-user">
            {(user && typeof user == "String"
              ? user.split("-")[1]
              : user?.username) || "User"}
          </span>
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
      <div className="home">
        <p>This is the home page of the Farmers App.</p>
        <table
          border="1"
          cellPadding="8"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    cursor: "pointer",
                    background:
                      sortConfig.key === col.key ? "#f7de95" : undefined,
                  }}
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  {sortConfig.key === col.key
                    ? sortConfig.direction === "asc"
                      ? " ▲"
                      : " ▼"
                    : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedAuctions &&
              sortedAuctions.length > 0 &&
              sortedAuctions.map((item, idx) => (
                <tr key={item.auction_id + idx}>
                  <td>{item.auction_id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.product}</td>
                  <td>{item.weight}</td>
                  <td>{item.quantity}</td>
                  <td>{item.contact}</td>
                  <td>{item.product_grade}</td>
                  <td>{item.min_bid}</td>
                  <td>{item.max_bid?.submit_amount}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="new_rate_input_cell">
                    <input type="text" className="new_rate_input" />
                  </td>
                  <td className="action_cell">
                    <button className="submit_rate_btn" onClick={addNewBid}>
                      Submit Rate
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Buyer;
