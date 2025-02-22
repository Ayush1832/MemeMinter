import { ethers } from "ethers";
import config from "../config/config.js";
import MemeNFTAbi from "../../blockchain/contracts/MemeNFT.json" assert { type: "json" };

const provider = new ethers.JsonRpcProvider(config.blockchain.rpcUrl);
const wallet = new ethers.Wallet(config.blockchain.privateKey, provider);
const contract = new ethers.Contract(config.blockchain.contractAddress, MemeNFTAbi.abi, wallet);

export async function mintNFT(metadataURI) {
  try {
    const tx = await contract.mintMeme(metadataURI);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error("NFT Minting Error:", error);
    throw new Error("Minting failed.");
  }
}
