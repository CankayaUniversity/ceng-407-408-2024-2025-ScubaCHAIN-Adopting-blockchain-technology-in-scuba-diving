import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, TextField, Button, MenuItem } from "@mui/material";
import { saveUser, getUser } from "../firestoreFunctions";

export default function Profile({ userAddress, userType }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [licenseHash, setLicenseHash] = useState("");
  const [gender, setGender] = useState("");
  const [biography, setBiography] = useState("");
  const [ssn, setSsn] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [nftHashes, setNftHashes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userAddress) {
      fetchData();
    }
  }, [userAddress]);

  const fetchData = async () => {
    try {
      setError(null);
      const firestoreData = await getUser(userAddress);

      if (firestoreData) {
        setName(firestoreData.name || "");
        setSurname(firestoreData.surname || "");
        setLicenseHash(firestoreData.licenseHash || "");
        setGender(firestoreData.gender || "");
        setBiography(firestoreData.bio || "");
        setSsn(firestoreData.ssn || "");
        setTransactions(firestoreData.transactionIds || []);
        setNftHashes(firestoreData.nftHashes || []);
        if (firestoreData.nftHashes && firestoreData.nftHashes.length > 0) {
          setProfilePicture(`https://ipfs.io/ipfs/${firestoreData.nftHashes[0]}`);
        }
        if (firestoreData.userType !== userType) {
          await saveUser(
            userAddress,
            firestoreData.name,
            firestoreData.surname,
            firestoreData.licenseHash,
            firestoreData.gender,
            firestoreData.bio,
            firestoreData.ssn,
            firestoreData.transactionIds,
            userType 
          );
        }
      }
      setLoaded(true);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("An error occurred while fetching data.");
    }
  };

  const handleUpdate = async () => {
    try {
      setError(null);
      await saveUser(userAddress, name, surname, licenseHash, gender, biography, ssn, transactions, userType);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("An error occurred while updating the profile.");
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
      }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mt: 10,
            mb: 10,
            textAlign: "center",
            color: "#F6851B",
            padding: "10px 20px",
            borderRadius: "10px",
            width: "fit-content",
            backgroundColor: "transparent",
          }}
        >
          Wallet Address: {userAddress || "Not Connected"}
        </Typography>

        <Box sx={{ textAlign: "center", color: "#fff", marginTop: "20px" }}>
          <Avatar
            sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
            src={profilePicture}
          >
            {!profilePicture && "U"}
          </Avatar>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {loaded ? `Hello, ${name || "Unknown User"}` : "Loading..."}
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {!isEditing ? (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Name:</strong> {name || "Not Provided"}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Surname:</strong> {surname || "Not Provided"}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>License Hash:</strong> {licenseHash || "Not Provided"}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Gender:</strong> {gender || "Not Provided"}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Biography:</strong> {biography || "Not Provided"}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>SSN:</strong> {ssn || "Not Provided"}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Transaction IDs:</strong>
              </Typography>
              <Box sx={{ textAlign: "left", mb: 2 }}>
                {transactions.length > 0 ? (
                  transactions.map((tx, index) => (
                    <Typography key={index} variant="body2">
                      {index + 1}: {tx}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2">No transactions available.</Typography>
                )}
              </Box>
              <Button
                variant="contained"
                onClick={() => setIsEditing(true)}
                sx={{
                  mt: 2,
                  backgroundColor: "#F6851B",
                  "&:hover": { backgroundColor: "#E2761B" },
                }}
              >
                Edit Profile
              </Button>
            </>
          ) : (
            <Box sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                sx={{ mb: 2, backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 1 }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Surname"
                variant="outlined"
                sx={{ mb: 2, backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 1 }}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              <TextField
                fullWidth
                label="License Hash"
                variant="outlined"
                sx={{ mb: 2, backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 1 }}
                value={licenseHash}
                onChange={(e) => setLicenseHash(e.target.value)}
              />
              <TextField
                fullWidth
                label="Gender"
                select
                variant="outlined"
                sx={{ mb: 2, backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 1 }}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="Biography"
                variant="outlined"
                multiline
                rows={4}
                sx={{ mb: 2, backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 1 }}
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={handleUpdate}
                sx={{
                  mt: 2,
                  backgroundColor: "#F6851B",
                  "&:hover": { backgroundColor: "#E2761B" },
                }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => setIsEditing(false)}
                sx={{ mt: 2, ml: 2, borderColor: "#F6851B", color: "#F6851B" }}
              >
                Cancel
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
