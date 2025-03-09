const { 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  arrayUnion, 
  collection, 
  query, 
  where, 
  addDoc 
} = require("firebase/firestore");
const { firestore } = require("./firebase");

const saveUser = async (
  userAddress,
  name = "",
  surname = "",
  licenseHash = "",
  gender = "",
  bio = "",
  ssn = "",
  transactionIds = [],
  userType = "diver" 
) => {
  try {
    console.log("Saving user to Firestore...");
    const userDoc = doc(firestore, "users", userAddress); 
    await setDoc(
      userDoc,
      {
        walletAddress: userAddress,
        name,
        surname,
        licenseHash,
        gender,
        bio,
        ssn,
        transactionIds,
        userType, 
      },
      { merge: true } 
    );
    console.log("User successfully saved:", {
      walletAddress: userAddress,
      name,
      surname,
      licenseHash,
      gender,
      bio,
      ssn,
      transactionIds,
      userType,
    });
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

const getDiveRequestStatus = async (userAddress) => {
  try {
    const requestCollection = collection(firestore, "diveRequests");
    const requestQuery = query(requestCollection, where("userAddress", "==", userAddress));
    const querySnapshot = await getDocs(requestQuery);

    let status = null;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.status) {
        status = data.status;
      }
    });

    return status;
  } catch (error) {
    console.error("Error fetching dive request status:", error);
    throw error;
  }
};

const getUserNFTs = async (userAddress) => {
  try {
    const userDoc = doc(firestore, "users", userAddress);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.nftHashes || [];
    } else {
      console.log("User document not found.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching user NFTs:", error);
    throw error;
  }
};

const saveDivePermissionRequest = async (userAddress, licenseHash) => {
  try {
    console.log("Saving dive permission request...");
    const requestCollection = collection(firestore, "diveRequests");
    await addDoc(requestCollection, {
      userAddress,
      licenseHash,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    console.log("Dive permission request saved successfully.");
  } catch (error) {
    console.error("Error saving dive permission request:", error);
  }
};

const getUnverifiedLicenses = async () => {
  try {
    const licensesCollection = collection(firestore, "licenses");
    const unverifiedQuery = query(licensesCollection, where("verified", "==", false));
    const querySnapshot = await getDocs(unverifiedQuery);

    const unverifiedLicenses = [];
    querySnapshot.forEach((doc) => {
      unverifiedLicenses.push({ id: doc.id, ...doc.data() });
    });

    return unverifiedLicenses;
  } catch (error) {
    console.error("Error fetching unverified licenses:", error);
    throw error;
  }
};

const getPendingDiveRequests = async () => {
  try {
    const diveRequestsCollection = collection(firestore, "diveRequests");
    const pendingQuery = query(diveRequestsCollection, where("status", "==", "pending"));
    const querySnapshot = await getDocs(pendingQuery);

    const pendingRequests = [];
    querySnapshot.forEach((doc) => {
      pendingRequests.push({ id: doc.id, ...doc.data() });
    });

    return pendingRequests;
  } catch (error) {
    console.error("Error fetching pending dive requests:", error);
    throw error;
  }
};

const verifyDiveRequest = async (requestId, verifiedBy) => {
  try {
    const requestDoc = doc(firestore, "diveRequests", requestId);
    await updateDoc(requestDoc, {
      status: "verified",
      verifiedBy,
      verifiedAt: new Date().toISOString(),
    });
    console.log(`Dive request ${requestId} verified by ${verifiedBy}`);
  } catch (error) {
    console.error("Error verifying dive request:", error);
    throw error;
  }
};

const rejectDiveRequest = async (requestId, rejectedBy) => {
  try {
    const requestDoc = doc(firestore, "diveRequests", requestId);
    await updateDoc(requestDoc, {
      status: "rejected",
      rejectedBy,
      rejectedAt: new Date().toISOString(),
    });
    console.log(`Dive request ${requestId} rejected by ${rejectedBy}`);
  } catch (error) {
    console.error("Error rejecting dive request:", error);
    throw error;
  }
};

const getUserDiveRequests = async (userAddress) => {
  try {
    const requestsCollection = collection(firestore, "diveRequests");
    const userRequestsQuery = query(requestsCollection, where("userAddress", "==", userAddress));
    const querySnapshot = await getDocs(userRequestsQuery);

    const diveRequests = [];
    querySnapshot.forEach((doc) => {
      diveRequests.push({ id: doc.id, ...doc.data() });
    });

    return diveRequests;
  } catch (error) {
    console.error("Error fetching dive requests:", error);
    throw error;
  }
};

const saveNFT = async (userAddress, nftHash) => {
  try {
    console.log(`Attempting to save NFT hash "${nftHash}" for user: ${userAddress}`);
    const userDoc = doc(firestore, "users", userAddress);

    await updateDoc(userDoc, {
      nftHashes: arrayUnion(nftHash),
    });

    console.log(`NFT hash "${nftHash}" successfully saved for user: ${userAddress}`);
  } catch (error) {
    if (error.code === "not-found") {
      console.error(`User document not found for address: ${userAddress}`);
      console.log("Creating user document and adding NFT hash...");
      try {
        await setDoc(doc(firestore, "users", userAddress), {
          nftHashes: [nftHash],
        });
        console.log(`NFT hash "${nftHash}" successfully added for new user: ${userAddress}`);
      } catch (setDocError) {
        console.error("Error creating new user and saving NFT hash:", setDocError);
      }
    } else {
      console.error("Error saving NFT hash:", error);
    }
  }
};

const getUser = async (userAddress) => {
  try {
    const userDoc = doc(firestore, "users", userAddress);
    const docSnap = await getDoc(userDoc); 
    if (docSnap.exists()) {
      console.log("User data fetched:", docSnap.data());
      return docSnap.data(); 
    } else {
      console.log("User not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

const updateUserProfilePicture = async (userAddress, profilePictureUrl) => {
  try {
    console.log("Updating profile picture...");
    const userDoc = doc(firestore, "users", userAddress);
    await updateDoc(userDoc, { profilePicture: profilePictureUrl });
    console.log("Profile picture updated successfully.");
  } catch (error) {
    console.error("Error updating profile picture:", error);
  }
};

const updateUser = async (userAddress, updatedData) => {
  try {
    console.log("Updating user data...");
    const userDoc = doc(firestore, "users", userAddress);
    await updateDoc(userDoc, updatedData);
    console.log("User data updated successfully.");
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};

module.exports = { 
  getDiveRequestStatus,
  saveUser, 
  getUserDiveRequests,
  updateUserProfilePicture,
  saveNFT, 
  getUser, 
  updateUser, 
  getUnverifiedLicenses, 
  verifyDiveRequest, 
  rejectDiveRequest, 
  getUserNFTs,
  saveDivePermissionRequest, 
  getPendingDiveRequests 
};
