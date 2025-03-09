import React from "react";
import { Link } from "react-router-dom";

const Header = ({ userAddress, userType, onSignOut, currentPath }) => {
  return (
    <header
      id="header"
      style={{
        textAlign: "center",
        padding: "20px 0",
        background: "rgba(0, 0, 0, 0.5)",
        color: "white",
      }}
    >
      <Link to="/">
        <h1 style={{ fontFamily: "Arial, Helvetica, sans-serif", color: "white" }}>
          ScubaChain
        </h1>
      </Link>
      <nav>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            gap: "20px",
          }}
        >
          {!userAddress && currentPath !== "/signin" && (
            <>
              <li>
                <a href="#one" style={{ textDecoration: "none", color: "white" }}>
                  About
                </a>
              </li>
              <li>
                <a href="#three" style={{ textDecoration: "none", color: "white" }}>
                  Features
                </a>
              </li>
              <li>
                <a href="#five" style={{ textDecoration: "none", color: "white" }}>
                  Contacts
                </a>
              </li>
            </>
          )}

          {userAddress && (
            <>
              {userType === "diver" && (
                <li>
                  <Link to="/importlicense" style={{ textDecoration: "none", color: "white" }}>
                    Import License
                  </Link>
                </li>
              )}
              {userType === "divemaster" && (
                <li>
                  <Link to="/verifylicense" style={{ textDecoration: "none", color: "white" }}>
                    Verify License
                  </Link>
                </li>
              )}
              <li>
                <Link to="/nftgallery" style={{ textDecoration: "none", color: "white" }}>
                  NFT Gallery
                </Link>
              </li>
              <li>
                <Link to="/profile" style={{ textDecoration: "none", color: "white" }}>
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={onSignOut}
                  style={{
                    background: "none",
                    border: "none",
                    textDecoration: "none",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "inherit",
                  }}
                >
                  Sign Out
                </button>
              </li>
            </>
          )}

          {!userAddress && (
            <li style={{ textAlign: "center" }}>
              <Link
                to="/signin"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  backgroundColor: "#F6851B",
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "8px",
                  height: "53.66px",
                  width: "200px",
                  fontWeight: "bold",
                  transition: "0.3s",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                    alt="Metamask Icon"
                    style={{
                      width: "24px",
                      height: "24px",
                      marginRight: "8px",
                    }}
                  />
                  <span>Sign In</span>
                </div>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
