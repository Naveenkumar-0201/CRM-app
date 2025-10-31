import React from "react";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container mt-5">
      <h3>Welcome, {user?.name || "User"} </h3>
      <p>This is your CRM dashboard. You can manage your leads and view analytics here.</p>
    </div>
  );
}

export default Dashboard;
