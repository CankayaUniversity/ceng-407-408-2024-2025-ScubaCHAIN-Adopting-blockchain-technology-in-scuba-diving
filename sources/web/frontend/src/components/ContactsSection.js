import React from "react";

const ContactsSection = () => {
  return (
    <div id="page-wrapper">
      <section
        id="five"
        className="wrapper style2 special fade"
        style={{
          padding: "20px 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <header
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              flex: 1,
              textAlign: "left",
            }}
          >
            <h2>Contacts</h2>
            <p>Yukarıyurtçu Mahallesi Mimar Sinan Cad. No:4, 06790 Etimesgut / Ankara</p>
            <p>Phone: +90 312 233 13 33</p>
            <p>Fax: +90 312 233 10 26</p>
            <p>
              E-mail:{" "}
              <a
                href="mailto:ceng@cankaya.edu.tr"
                style={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.cssText =
                    "color: #F6851B !important; text-decoration: none;")
                }
                onMouseLeave={(e) =>
                  (e.target.style.cssText =
                    "color: #FFFFFF !important; text-decoration: none;")
                }
              >
                scubachainn@gmail.com
              </a>
            </p>
          </header>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <img
              src="assets/images/cankaya-uni-logo.png"
              alt="School Logo"
              style={{
                width: "300px",
                height: "auto",
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactsSection;