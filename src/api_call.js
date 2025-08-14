const handleAuthError = (response) => {
  if (response.status === 401 || response.status === 403) {
    sessionStorage.clear();
    window.location.href = "/login"; // Redirect to login page on auth error
    return true;
  }
  return false;
};

const login = async (base_url, username, password) => {
  try {
    const response = await fetch(`${base_url}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (handleAuthError(response)) return;
    if (!response.ok) {
      return new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.token) {
      sessionStorage.setItem("session_token_farmersapp", data.token);
      return data;
    } else {
      return new Error("Login failed: No token received");
    }
  } catch (error) {
    console.error("Error during login:", error);
    return error;
  }
};

const signup = async (base_url, user_details) => {
  try {
    const response = await fetch(`${base_url}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_details),
    });
    if (handleAuthError(response)) return;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return response;
  } catch (error) {
    console.error("Error updating user details:", error);
    return error;
  }
};

const get_all_loads = async (base_url, session_token) => {
  console.log("Fetching all loads... API call");
  try {
    const response = await fetch(`${base_url}/api/data/getvisibleloads`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session_token}`,
      },
    });
    if (handleAuthError(response)) return;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching loads:", error);
    return error;
  }
};

const get_my_loads = async (base_url, session_token) => {
  console.log("Fetching all loads... API call");
  try {
    const response = await fetch(`${base_url}/api/data/getmyproducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session_token}`,
      },
    });
    if (handleAuthError(response)) return;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching loads:", error);
    return error;
  }
};

const get_my_bids = async (base_url, session_token) => {
  console.log("Fetching all loads... API call");
  try {
    const response = await fetch(`${base_url}/api/data/getmybids`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session_token}`,
      },
    });
    if (handleAuthError(response)) return;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching loads:", error);
    return error;
  }
};

const get_user_details = async (base_url, session_token, req_user) => {
  try {
    const response = await fetch(
      `${base_url}/api/user/getuserdetails/?username=${req_user}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session_token}`,
        },
      }
    );
    if (handleAuthError(response)) return;
    if (!response.ok) {
      return new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return error;
  }
};

const get_my_user_details = async (base_url, session_token) => {
  console.log("Fetching my user details with token");
  try {
    const response = await fetch(`${base_url}/api/user/getuserdetails`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session_token}`,
      },
    });
    if (handleAuthError(response)) return;
    if (!response.ok) {
      return new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return error;
  }
};

const validateSession_call = async (base_url, session_token) => {
  console.log("Validating session with token");
  try {
    const response = await fetch(`${base_url}/api/user/validate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session_token}`,
      },
    });
    // if (handleAuthError(response)) return false;
    if (response.status !== 200) {
      console.log("Session expired or invalid: ", response.status);
      return false;
    } else {
      console.log("Session is valid: ", response.status);
      return response.json();
    }
  } catch (error) {
    console.error("Error validating session:", error);
    return false;
  }
};

const update_user_details = async (base_url, session_token, user_details) => {
  try {
    const response = await fetch(`${base_url}/api/user/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session_token}`,
      },
      body: JSON.stringify(user_details),
    });
    if (handleAuthError(response)) return;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return response;
  } catch (error) {
    console.error("Error updating user details:", error);
    return error;
  }
};

const add_new_load = async (base_url, session_token, load_details) => {
  try {
    const response = await fetch(`${base_url}/api/data/addload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session_token}`,
      },
      body: JSON.stringify(load_details),
    });
    if (handleAuthError(response)) return;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return response;
  } catch (error) {
    console.error("Error adding new load:", error);
    return error;
  }
};

const add_bid = async (base_url, session_token, bid_details) => {
  try {
    const response = await fetch(`${base_url}/api/data/addbids`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session_token}`,
      },
      body: JSON.stringify(bid_details),
    });
    if (handleAuthError(response)) return;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return response;
  } catch (error) {
    console.error("Error adding bid:", error);
    return error;
  }
};

export {
  login,
  get_all_loads,
  get_my_loads,
  get_my_bids,
  get_my_user_details,
  get_user_details,
  validateSession_call,
  update_user_details,
  add_new_load,
  add_bid,
  signup,
};
