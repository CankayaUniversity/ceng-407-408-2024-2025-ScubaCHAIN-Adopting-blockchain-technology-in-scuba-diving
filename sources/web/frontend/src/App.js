import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import SignInForDive from "./pages/SignInForDive";
import Profile from "./pages/Profile";
import NFTGallery from "./pages/NFTGallery";
import Banner from "./components/Banner";
import MeetScubaChain from "./components/MeetScubaChain";
import WhatIsScubaChain from "./components/WhatIsScubaChain";
import OurKeyFeatures from "./components/OurKeyFeatures";
import TeamSection from "./components/TeamSection";
import DocumentsSection from "./components/DocumentsSection";
import ContactsSection from "./components/ContactsSection";
import Footer from "./components/Footer";
import ImportLicense from "./pages/ImportLicense";
import VerifyLicense from "./pages/VerifyLicense";
import { getUser } from "./firestoreFunctions";

function App() {
  const [userAddress, setUserAddress] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isSignedOut, setIsSignedOut] = useState(false);

  useEffect(() => {
    const storedUserAddress = localStorage.getItem("userAddress");
    const storedUserType = localStorage.getItem("userType");

    if (storedUserAddress && storedUserType) {
      setUserAddress(storedUserAddress);
      setUserType(storedUserType);
    }
  }, []);

  const handleSignOut = () => {
    setUserAddress(null);
    setUserType(null);
    setIsSignedOut(true);
    localStorage.removeItem("userAddress");
    localStorage.removeItem("userType");
    alert("Successfully signed out.");
  };

  const fetchUserType = async (address) => {
    try {
      const user = await getUser(address);
      if (user && user.userType) {
        setUserType(user.userType);
        localStorage.setItem("userType", user.userType);
      }
    } catch (error) {
      console.error("Error fetching user type:", error);
    }
  };

  const HomePage = () => (
    <div id="page-wrapper">
      <Banner />
      <MeetScubaChain />
      <WhatIsScubaChain />
      <OurKeyFeatures />
      <TeamSection />
      <DocumentsSection />
      <ContactsSection />
      <Footer />
    </div>
  );

  return (
    <Router>
      {isSignedOut && <Navigate to="/" replace />}
      <Header
        userAddress={userAddress}
        userType={userType}
        onSignOut={handleSignOut}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signin"
          element={
            <SignIn
              onConnectWallet={(address) => {
                setUserAddress(address);
                localStorage.setItem("userAddress", address);
                fetchUserType(address);
              }}
            />
          }
        />
        <Route
          path="/dive-signin"
          element={
            <SignInForDive
              onConnectWallet={(address) => {
                setUserAddress(address);
                localStorage.setItem("userAddress", address);
                fetchUserType(address);
              }}
            />
          }
        />
        <Route
          path="/profile"
          element={userAddress ? <Profile userAddress={userAddress} /> : <Navigate to="/" />}
        />
        <Route
          path="/nftgallery"
          element={userAddress ? <NFTGallery userAddress={userAddress} /> : <Navigate to="/" />}
        />
        <Route
          path="/importlicense"
          element={
            userAddress && userType === "diver" ? (
              <ImportLicense userAddress={userAddress} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/verifylicense"
          element={
            userAddress && userType === "divemaster" ? (
              <VerifyLicense userAddress={userAddress} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;