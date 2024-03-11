import { Button } from "antd";
import React from "react";
import { logout } from "../../services/authentication.services";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <h1>Welcome to the application</h1>

      <Button
        onClick={() => {
          onLogout();
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export default Home;
