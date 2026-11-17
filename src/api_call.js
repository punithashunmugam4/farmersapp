const handleAuthError = (response) => {
  if (response.status === 401 || response.status === 403) {
    sessionStorage.clear();
    window.location.href = "/login"; // Redirect to login page on auth error
    return true;
  }
  return false;
};

const defaultHeaders = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "true",
};

const buildHeaders = (session_token) => {
  const headers = { ...defaultHeaders };
  if (session_token) headers.Authorization = `Bearer ${session_token}`;
  return headers;
};

const login = async (base_url, username, password) => {
  try {
    const response = await fetch(`${base_url}/api/user/login`, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify({ username, password }),
    });
    if (handleAuthError(response)) return;
    if (response.status === 500) {
      window.location.href = "/*";
      throw new Error("Server error! Please try again later.");
    }
    console.log("Response: ", response.ok);
    if (!response.ok) {
      window.location.href = "/*";
      console.error(`HTTP error! status: ${response.status}`);
      return response.status;
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
    window.location.href = "/*";
    return 500;
  }
};

const signup = async (base_url, user_details) => {
  try {
    const response = await fetch(`${base_url}/api/user/signup`, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(user_details),
    });
    if (handleAuthError(response)) return;
    if (response.status === 500) {
      window.location.href = "/*";
      throw new Error("Server error! Please try again later.");
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

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
      headers: buildHeaders(session_token),
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
      headers: buildHeaders(session_token),
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
      headers: buildHeaders(session_token),
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
        headers: buildHeaders(session_token),
      },
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
      headers: buildHeaders(session_token),
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
const update_user_details = async (base_url, session_token, user_details) => {
  try {
    const response = await fetch(`${base_url}/api/user/update`, {
      method: "PUT",
      headers: buildHeaders(session_token),
      body: JSON.stringify(user_details),
    });
    if (handleAuthError(response)) return;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

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
      headers: buildHeaders(session_token),
      body: JSON.stringify(load_details),
    });
    if (handleAuthError(response)) return;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

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
      headers: buildHeaders(session_token),
      body: JSON.stringify(bid_details),
    });
    if (handleAuthError(response)) return;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Error adding bid:", error);
    return error;
  }
};

const get_my_notification = async (base_url, session_token) => {
  console.log("Fetching all notifications... API call");
  try {
    const response = await fetch(`${base_url}/api/notifications`, {
      method: "GET",
      headers: buildHeaders(session_token),
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

const send_notification = async (base_url, session_token, message) => {
  console.log("Send all notifications... API call");
  try {
    const response = await fetch(`${base_url}/api/notifications/notify`, {
      method: "POST",
      headers: buildHeaders(session_token),
      body: JSON.stringify(message),
    });
    if (handleAuthError(response)) return;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("Error fetching loads:", error);
    return error;
  }
};
const clear_my_notification = async (base_url, session_token) => {
  console.log("Clearing all notifications... API call");
  try {
    const response = await fetch(`${base_url}/api/notifications/clear`, {
      method: "DELETE",
      headers: buildHeaders(session_token),
    });
    if (handleAuthError(response)) return;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("Error fetching loads:", error);
    return error;
  }
};

const mark_my_notification = async (base_url, session_token, payload) => {
  console.log("Send all notifications... API call");
  try {
    const response = await fetch(`${base_url}/api/notifications/readunread`, {
      method: "PUT",
      headers: buildHeaders(session_token),
      body: JSON.stringify(payload),
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

const mark_all_read = async (base_url, session_token) => {
  console.log("Send all notifications... API call");
  try {
    const response = await fetch(
      `${base_url}/api/notifications/readunreadall`,
      {
        method: "PUT",
        headers: buildHeaders(session_token),
      },
    );
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

export {
  login,
  get_all_loads,
  get_my_loads,
  get_my_bids,
  get_my_user_details,
  get_user_details,
  update_user_details,
  add_new_load,
  add_bid,
  signup,
  get_my_notification,
  send_notification,
  clear_my_notification,
  mark_my_notification,
  mark_all_read,
};
