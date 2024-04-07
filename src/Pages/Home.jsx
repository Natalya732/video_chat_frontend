import React from "react";
import logo from "../assets/logo.avif";
export default function Home() {
  return (
    <div className="home h-full w-full">
      <nav className="navbar">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>News</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
          <li>
            <a>About</a>
          </li>
        </ul>
        <div className="logo">
          <img src={logo} />
          <span>A-CHAT</span>
        </div>
      </nav>
      <div className="ml-8">
        CHAT <span>ANYTrIME</span>
      </div>
    </div>
  );
}
