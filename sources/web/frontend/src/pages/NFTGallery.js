import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { getUserNFTs, saveNFT } from "../firestoreFunctions";
import axios from "axios";

export default function NFTGallery({ userAddress }) {
  const [nftHashes, setNftHashes] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (userAddress) {
        try {
          const nfts = await getUserNFTs(userAddress);
          setNftHashes(nfts || []);
        } catch (err) {
          console.error("Error fetching NFTs:", err);
          setError("Failed to fetch NFTs. Please try again.");
        }
      }
    };

    fetchNFTs();
  }, [userAddress]);

  const uploadToIPFS = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const response = await axios.post("http://localhost:3001/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const fileHash = response.data.hash;
      console.log("Uploaded to IPFS:", fileHash);

      await saveNFT(userAddress, fileHash);

      setNftHashes((prev) => [...prev, fileHash]);
      alert("NFT uploaded successfully!");
    } catch (err) {
      console.error("Error uploading to IPFS:", err);
      alert("Failed to upload NFT. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadToIPFS(file);
    }
  };

  const ipfsToHttpUrl = (hash) => `https://ipfs.io/ipfs/${hash}`;

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
        color: "#fff",
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography variant="h2" gutterBottom>
          NFT Gallery
        </Typography>
        <Typography variant="h5" paragraph>
          View and upload your NFT images to IPFS.
        </Typography>
        <Button
          variant="contained"
          component="label"
          sx={{
            mt: 2,
            backgroundColor: "#F6851B",
            "&:hover": {
              backgroundColor: "#E2761B",
            },
          }}
        >
          {uploading ? "Uploading..." : "Add Image"}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </Button>
      </Container>
      <Container maxWidth="md">
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {nftHashes.map((hash, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" }}>
                <CardMedia
                  component="img"
                  image={ipfsToHttpUrl(hash)}
                  alt={`NFT ${index}`}
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    NFT #{index + 1}
                  </Typography>
                  <Typography>IPFS Hash: {hash}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    href={ipfsToHttpUrl(hash)}
                    target="_blank"
                    sx={{ color: "#F6851B", fontWeight: "bold" }}
                  >
                    View on IPFS
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}