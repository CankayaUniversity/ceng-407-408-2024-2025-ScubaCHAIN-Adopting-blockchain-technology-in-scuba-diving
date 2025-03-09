const Web3 = require("web3");
const puppeteer = require("puppeteer");
const { saveUser } = require("../frontend/src/firestoreFunctions");


const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0xA9426743fea92aE4155b56138EA898589da8D797"; 
const abi = require("./build/contracts/CertificationData.json").abi;

const contract = new web3.eth.Contract(abi, contractAddress);

const account = "0xF4566EEc548299a3450E566C2b5CEE46a8F459c7";
const privateKey = "0xcd8aadd52a0f9c0f19a8a18ec3845c8efbfd8a0b39245daf3bef1160c67b67b7";

const checkSSN = async (ssn) => {
  const url = "https://www.turkiye.gov.tr/tssf-dalici-cankurtaran-egitmen-rehber-dalici-sertifika-bilgisi-sorgulama";

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log("Connecting to the website...");
    await page.goto(url, { waitUntil: "networkidle2" });

    console.log("Entering National ID...");
    await page.type("#tcno", ssn);

    console.log("Submitting the form...");
    await page.click(".submitButton");

    console.log("Waiting for the result table...");
    try {
      await page.waitForSelector("#egitmenListe", { timeout: 30000 });
    } catch (error) {
      throw new Error("No certification information found. Blockchain operation canceled.");
    }

    const tableData = await page.$$eval("#egitmenListe tbody tr", (rows) =>
      rows.map((row) => {
        const columns = row.querySelectorAll("td");
        return Array.from(columns).map((column) => column.textContent.trim());
      })
    );

    if (tableData.length === 0) {
      throw new Error("The result table is empty. Blockchain operation canceled.");
    }

    console.log("Table Data:", tableData);

    const resultWithTxHashes = [];
    for (let data of tableData) {
      const [level, issueDate, expiryDate, center, startDate, endDate] = data;

      try {
        console.log(`Sending to blockchain: ${level}, ${issueDate}, ${center}`);
        const tx = contract.methods.addCertification(
          level,
          issueDate,
          expiryDate,
          center,
          startDate,
          endDate
        );

        const gas = await tx.estimateGas({ from: account });
        const txData = tx.encodeABI();

        const signedTx = await web3.eth.accounts.signTransaction(
          {
            to: contractAddress,
            data: txData,
            gas,
          },
          privateKey
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("Transaction Completed:", receipt.transactionHash);

        resultWithTxHashes.push({ ...data, transactionHash: receipt.transactionHash });
      } catch (txError) {
        console.error("Blockchain writing error:", txError);
        resultWithTxHashes.push({ ...data, transactionHash: "Error" });
      }
    }

    await browser.close();
    console.log("All operations completed.");
    return resultWithTxHashes;
  } catch (error) {
    console.error("Error:", error.message);
    await browser.close();
    throw error;
  }
};

module.exports = { checkSSN };