import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getPendingDiveRequests, verifyDiveRequest, rejectDiveRequest } from "../firestoreFunctions";

export default function VerifyLicense({ userAddress }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const diveRequests = await getPendingDiveRequests();
        setRequests(diveRequests);
      } catch (err) {
        console.error("Error fetching dive requests:", err);
        setError("Failed to fetch dive requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleVerify = async (requestId) => {
    try {
      await verifyDiveRequest(requestId, userAddress);
      alert("Dive request verified successfully!");
      setRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error("Error verifying dive request:", error);
      alert("Failed to verify dive request. Please try again.");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectDiveRequest(requestId, userAddress);
      alert("Dive request rejected successfully.");
      setRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error("Error rejecting dive request:", error);
      alert("Failed to reject dive request. Please try again.");
    }
  };

  const columns = [
    { field: "id", headerName: "Request ID", flex: 1 },
    { field: "userAddress", headerName: "Diver Address", flex: 1 },
    { field: "licenseHash", headerName: "License Hash", flex: 1 },
    { field: "createdAt", headerName: "Requested At", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#F6851B",
              color: "#fff",
              "&:hover": { backgroundColor: "#E2761B" },
              mr: 1,
            }}
            size="small"
            onClick={() => handleVerify(params.row.id)}
          >
            Verify
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#D32F2F",
              color: "#fff",
              "&:hover": { backgroundColor: "#B71C1C" },
            }}
            size="small"
            onClick={() => handleReject(params.row.id)}
          >
            Reject
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "transparent",
        backgroundImage: "url('/path-to-your-background-image.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        px: 4,
        pt: 6,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          color: "#F6851B",
          fontWeight: "bold",
          mb: 4,
        }}
      >
        Verify Dive Requests
      </Typography>
      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress sx={{ color: "#F6851B" }} />
          <Typography sx={{ mt: 2 }}>Loading requests...</Typography>
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : requests.length === 0 ? (
        <Typography
          sx={{
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          No pending dive requests available.
        </Typography>
      ) : (
        <Box
          sx={{
            height: 400,
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            padding: 2,
          }}
        >
          <DataGrid
            rows={requests}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#F6851B",
                color: "##F6851B",
                fontSize: "16px",
              },
              "& .MuiDataGrid-row": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#fff",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}