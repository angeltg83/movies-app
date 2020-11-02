import React from "react";
import { Link } from "wouter";
import useUser from "../hooks/useUser";
import "./header.css";

export default function Header() {
  const { isLogged, logout } = useUser();
  console.log("isLogged ", isLogged);
  const handleClick = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <header className="gf-header">
      {isLogged ? (
        <div>
          <Link to="#" onClick={handleClick}>
            Logout
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </header>
  );
}
