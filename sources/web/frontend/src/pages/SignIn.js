import React, { useState } from "react";
import Web3 from "web3";
import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContactsSection from "../components/ContactsSection";
import Footer from "../components/Footer";
import { saveUser, getUser } from "../firestoreFunctions";

export default function SignIn({ onConnectWallet }) {
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleConnect = async () => {
    setError(null);

    if (typeof window.ethereum === "undefined") {
      setError("Metamask is not installed. Please install Metamask.");
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      if (!accounts || accounts.length === 0) {
        throw new Error("No wallet detected.");
      }
      const userAddr = accounts[0];
      setAddress(userAddr);
      onConnectWallet(userAddr);

      const existingUser = await getUser(userAddr);
      if (!existingUser) {
        await saveUser(userAddr, "", "", "", "", "", "", [], "diver");
        alert("Welcome! New diver profile created. Please complete your profile.");
      } else {
        if (existingUser.userType !== "diver") {
          await saveUser(
            userAddr,
            existingUser.name || "",
            existingUser.surname || "",
            existingUser.licenseHash || "",
            existingUser.gender || "",
            existingUser.bio || "",
            existingUser.ssn || "",
            existingUser.transactionIds || [],
            "diver"
          );
        }
        alert(`Welcome back, ${existingUser.name || "User"}!`);
      }
      navigate("/profile");
    } catch (err) {
      console.error("Error connecting wallet:", err);
      setError("An error occurred while connecting the wallet.\n" + err.message);
    }
  };

  const navigateToDiveSignIn = () => {
    navigate("/dive-signin");
  };

  return (
    <>
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
        }}
      >
        <Container maxWidth="xs">
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img
              src="/assets/images/logo.png"
              alt="ScubaChain Logo"
              style={{ width: "50px", marginRight: "10px" }}
            />
            <Typography variant="h4" sx={{ fontFamily: "Arial, sans-serif", color: "#fff", fontSize: "3rem" }}>
              ScubaChain
            </Typography>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#fff" }}>
              Welcome!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: "#ddd", textAlign: "center" }}>
              Sign in with your MetaMask to access your scuba licenses securely.
            </Typography>
            {error && (
              <Typography color="error" sx={{ mb: 2, whiteSpace: "pre-line" }}>
                {error}
              </Typography>
            )}
            {!address ? (
              <Button
                variant="contained"
                sx={{
                  mt: 4,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#F6851B",
                  "&:hover": {
                    backgroundColor: "#E2761B",
                  },
                }}
                onClick={handleConnect}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                  alt="Metamask Icon"
                  style={{ width: "20px", marginRight: "10px" }}
                />
                Connect Wallet
              </Button>
            ) : (
              <Typography variant="body1" sx={{ mt: 4, color: "#F6851B" }}>
                Connected Wallet: {address}
              </Typography>
            )}
            <Button
              variant="outlined"
              sx={{
                mt: 3,
                color: "#F6851B",
                borderColor: "#F6851B",
                "&:hover": {
                  backgroundColor: "rgba(246, 133, 27, 0.1)",
                },
              }}
              onClick={navigateToDiveSignIn}
            >
              DiveMaster Sign In
            </Button>
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          padding: "40px 0",
          color: "#fff",
        }}
      >
        <ContactsSection />
        <Footer />
      </Box>
    </>
  );
}