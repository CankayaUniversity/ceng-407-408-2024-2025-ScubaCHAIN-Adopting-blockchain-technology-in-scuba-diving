import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  TextField,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { saveUser, saveDivePermissionRequest, getUserDiveRequests } from "../firestoreFunctions";

export default function ImportLicense({ userAddress }) {
  const [ssn, setSsn] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [licenseLinked, setLicenseLinked] = useState(false);
  const [diveRequests, setDiveRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  useEffect(() => {
    const fetchDiveRequests = async () => {
      setLoadingRequests(true);
      try {
        const requests = await getUserDiveRequests(userAddress);
        setDiveRequests(requests);
      } catch (err) {
        console.error("Error fetching dive requests:", err);
        setError("Failed to fetch dive requests. Please try again.");
      } finally {
        setLoadingRequests(false);
      }
    };

    if (userAddress) {
      fetchDiveRequests();
    }
  }, [userAddress]);

  const handleImport = async () => {
    setMessage(null);
    setError(null);
    setLicenseLinked(false);

    if (!ssn) {
      setError("Please enter your National ID (SSN).");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/checkSSN", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ssn }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error || "License not found or the operation failed.");
        return;
      }

      const { tableData, transactionIds } = result;

      console.log("License Data:", tableData);
      console.log("Transaction IDs:", transactionIds);

      await saveUser(userAddress, "", "", "", "", "", ssn, transactionIds);

      setMessage("License linked successfully!");
      setLicenseLinked(true);
    } catch (err) {
      console.error("Error during license import:", err);
      setError("An error occurred. Please try again.");
    }
  };

  const handleRequestPermission = async () => {
    try {
      await saveDivePermissionRequest(userAddress, ssn);
      alert("Dive permission requested! A DiveMaster will review your request.");
    } catch (err) {
      console.error("Error saving dive permission request:", err);
      alert("Failed to request dive permission. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        backgroundImage: "url('/path-to-your-background-image.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontFamily: "Arial, sans-serif", color: "#333", mb: 2 }}
            >
              Import License
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#555", mb: 3 }}
            >
              Link Your Diving License
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="National ID"
              value={ssn}
              onChange={(e) => setSsn(e.target.value)}
              sx={{
                mb: 2,
                backgroundColor: "#fff",
                borderRadius: 1,
              }}
            />
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            {message && (
              <Typography color="success.main" sx={{ mb: 2 }}>
                {message}
              </Typography>
            )}
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#F6851B",
                "&:hover": {
                  backgroundColor: "#E2761B",
                },
              }}
              onClick={handleImport}
            >
              Import License
            </Button>
            {licenseLinked && (
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#007BFF",
                  "&:hover": {
                    backgroundColor: "#0056b3",
                  },
                }}
                onClick={handleRequestPermission}
              >
                Request Dive Permission
              </Button>
            )}
          </Box>
        </Container>
        <Container maxWidth="md">
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, color: "#333" }}>
              Your Dive Requests
            </Typography>
            {loadingRequests ? (
              <CircularProgress />
            ) : diveRequests.length === 0 ? (
              <Typography>No dive requests found.</Typography>
            ) : (
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Request ID</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Verified By</TableCell>
                      <TableCell>License</TableCell>
                      <TableCell>Requested At</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {diveRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.id}</TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color:
                              request.status === "verified"
                                ? "green"
                                : request.status === "rejected"
                                ? "red"
                                : "black",
                          }}
                        >
                          {request.status}
                        </TableCell>
                        <TableCell>{request.verifiedBy || "Not Verified"}</TableCell>
                        <TableCell>{request.licenseHash}</TableCell>
                        <TableCell>
                          {new Date(request.createdAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}