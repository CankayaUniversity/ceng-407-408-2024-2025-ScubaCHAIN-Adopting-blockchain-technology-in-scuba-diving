import React from "react";
import { Button } from "@mui/material";

const DocumentsSection = () => {
  const documents = [
    {
      title: "Literature Review",
      url: "https://github.com/CankayaUniversity/ceng-407-408-2024-2025-ScubaCHAIN-Adopting-blockchain-technology-in-scuba-diving/blob/main/Documents/LiteratureReview.pdf",
      preview: "/documents/LiteratureReview.pdf",
    },
    {
      title: "Software Requirement Specification",
      url: "https://github.com/CankayaUniversity/ceng-407-408-2024-2025-ScubaCHAIN-Adopting-blockchain-technology-in-scuba-diving/blob/main/Documents/SoftwareRequirementSpecification.pdf",
      preview: "/documents/SoftwareRequirementSpecification.pdf",
    },
    {
      title: "Work Plan",
      url: "https://github.com/CankayaUniversity/ceng-407-408-2024-2025-ScubaCHAIN-Adopting-blockchain-technology-in-scuba-diving/blob/main/Documents/WorkPlan.png",
      preview: "/documents/WorkPlan.png",
    },
    {
      title: "Project Report",
      url: "https://github.com/CankayaUniversity/ceng-407-408-2024-2025-ScubaCHAIN-Adopting-blockchain-technology-in-scuba-diving/blob/main/Documents/407ProjectReport.pdf",
      preview: "/documents/407ProjectReport.pdf",
    },
    {
      title: "Project Presentation",
      url: "https://github.com/CankayaUniversity/ceng-407-408-2024-2025-ScubaCHAIN-Adopting-blockchain-technology-in-scuba-diving/blob/main/Documents/ScubaChain_407Project_Presentation.pptx",
      preview: "/documents/ScubaChain_407Project_Presentation.pdf",
    },
  ];

  return (
    <div id="page-wrapper">
      <section className="wrapper style1 special fade-up">
        <header className="major">
          <h2 style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>407 Documents</h2>
        </header>
        <div style={{ marginTop: "20px" }}>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", gap: "20px" }}>
            {documents.map((doc, index) => (
              <li
                key={index}
                style={{
                  flex: 1,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "200px",
                    height: "150px",
                    margin: "0 auto 10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 2,
                      background: "transparent",
                    }}
                  ></a>
                  <iframe
                    src={doc.preview}
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      zIndex: 1,
                    }}
                    title={`${doc.title} Preview`}
                  ></iframe>
                </div>

                <h3 style={{ fontFamily: "Arial, Helvetica, sans-serif", marginBottom: "10px" }}>
                  {doc.title}
                </h3>

                <Button
                  href={doc.preview}
                  download
                  variant="contained"
                  sx={{
                    backgroundColor: "#F6851B",
                    "&:hover": {
                      backgroundColor: "#E2761B",
                    },
                  }}
                >
                  Download
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default DocumentsSection;