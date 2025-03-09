const axios = require("axios");
const express = require("express");
const FormData = require("form-data");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { checkSSN } = require("../smartContract/script");
require("dotenv").config();

const JWT = process.env.JWT;
const PINATA_API = process.env.PINATA_API;
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed."));
    }
  },
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("File received:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const formData = new FormData();
    formData.append("file", req.file.buffer, req.file.originalname);

    const response = await axios.post(PINATA_API, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${JWT}`,
      },
    });

    const pinataResponse = response.data;
    const fileHash = pinataResponse.IpfsHash;

    res.status(200).json({ message: "File uploaded to IPFS.", hash: fileHash });
  } catch (err) {
    console.error("Error uploading to IPFS:", err.response ? err.response.data : err.message);
    res.status(500).json({ error: `Error uploading to IPFS: ${err.message}` });
  }
});

app.post("/checkSSN", async (req, res) => {
  const { ssn } = req.body;

  if (!ssn) {
    console.error("National ID (SSN) is missing.");
    return res.status(400).json({ success: false, error: "National ID is required." });
  }

  try {
    console.log("Starting checkSSN function...");
    const tableData = await checkSSN(ssn);

    console.log("Fetched Data:", tableData);

    if (!tableData || tableData.length === 0) {
      throw new Error("No certification information found.");
    }

    const transactionHashes = tableData.map((row) => row.transactionHash || "N/A");

    res.json({
      success: true,
      message: "License linked successfully!",
      tableData,
      transactionHashes,
    });
  } catch (error) {
    console.error("Error during checkSSN:", error.message);
    res.status(500).json({ success: false, error: error.message || "An error occurred." });
  }
});

app.post("/uploadFromPath", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "files", "image.jpg");

    const fs = require("fs");
    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ error: "File not found." });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const originalName = path.basename(filePath);

    const formData = new FormData();
    formData.append("file", fileBuffer, originalName);

    const response = await axios.post(PINATA_API, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${JWT}`,
      },
    });

    const pinataResponse = response.data;
    const fileHash = pinataResponse.IpfsHash;

    res.status(200).json({ message: "File uploaded to IPFS.", hash: fileHash });
  } catch (err) {
    console.error("Error uploading to IPFS:", err.response ? err.response.data : err.message);
    res.status(500).json({ error: `Error uploading to IPFS: ${err.message}` });
  }
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(500).json({ error: err.message });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
