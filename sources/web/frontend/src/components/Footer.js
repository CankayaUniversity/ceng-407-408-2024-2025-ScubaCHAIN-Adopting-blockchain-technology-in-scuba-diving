import React from "react";

const Footer = () => {
  return (
    <div
      id="page-wrapper"
      style={{
        backgroundColor: "transparent",
      }}
    >
      <footer
        id="footer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          padding: "20px 0",
          color: "#fff",
        }}
      >
        <ul
          className="icons"
          style={{
            display: "flex",
            justifyContent: "center",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          <li style={{ margin: "0 15px" }}>
            <a
              href="https://github.com/CankayaUniversity/ceng-407-408-2024-2025-ScubaCHAIN-Adopting-blockchain-technology-in-scuba-diving"
              target="_blank"
              rel="noopener noreferrer"
              className="icon brands alt fa-github"
              style={{
                textDecoration: "none",
                color: "#fff",
                fontSize: "1.5rem",
              }}
            >
              <span className="label">GitHub</span>
            </a>
          </li>
          <li style={{ margin: "0 15px" }}>
            <a
              href="mailto:scubachainn@gmail.com"
              className="icon solid alt fa-envelope"
              style={{
                textDecoration: "none",
                color: "#fff",
                fontSize: "1.5rem",
              }}
            >
              <span className="label">Email</span>
            </a>
          </li>
        </ul>
        <p
          style={{
            margin: "10px 0 0",
            fontSize: "0.875rem",
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()} ScubaChain. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
