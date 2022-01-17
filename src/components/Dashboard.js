import React, { useState } from "react";
import { Card, Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function Dashboard() {
  const [error, setError] = useState();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      setError("");
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          <strong>Email: </strong>
          {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          {error && <Alert variant="danger">{error}</Alert>}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button varient="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
