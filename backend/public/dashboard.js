const API_BASE = "/api/v1";

const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");
const viewBookingsBtn = document.getElementById("view-bookings-btn");
const bookingsBody = document.getElementById("bookings-body");
const totalBookingsEl = document.getElementById("total-bookings");
const latestBookingEl = document.getElementById("latest-booking");
const errorText = document.getElementById("login-error");

window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (token) {
    showDashboard();
  }
});

const login = async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      showDashboard();
    } else {
      errorText.textContent = data.message || "Login failed";
    }
  } catch (err) {
    console.error("Login error:", err);
    errorText.textContent = "Login failed: Network issue";
  }
};

const showDashboard = async () => {
  loginSection.style.display = "none";
  dashboardSection.style.display = "block";
};

viewBookingsBtn.addEventListener("click", () => {
  fetchBookings();
});
const fetchBookings = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch('api/v1/booking', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Unauthorized");

    const bookings = await res.json();
    
    // Update analytics
    totalBookingsEl.textContent = bookings.length;
    if (bookings.length > 0) {
      const latest = bookings[bookings.length - 1];
      latestBookingEl.textContent = new Date(latest.createdAt).toLocaleString();
    }


    const tbody = document.getElementById("bookings-body");
    tbody.innerHTML = "";

    bookingsBody.innerHTML = bookings
  .map((b) => `
    <tr>
      <td>${b.name}</td>
      <td>${b.email}</td>
      <td>${b.mobileNo}</td>
      <td>${b.legalServiceNeeded}</td>
      <td>${b.preferredDateAndTime}</td>
      <td>${b.comment}</td>
      ${
    b.uploadFile && b.uploadFile.length > 0
      ? `<a href="${b.uploadFile[0].s3Url}" target="_blank">View File</a>`
      : 'No File'
  }
      <td>${new Date(b.createdAt).toLocaleString()}</td>
    </tr>
  `)
  .join("");

  } catch (err) {
    console.error("Error fetching bookings:", err);
    alert("Error loading dashboard: " + err.message);
    localStorage.removeItem("token");
    location.reload();
  }
};

const logout = () => {
  localStorage.removeItem("token");
  location.reload();
};
