import { ethers } from "ethers";
import MemeNFT from "../contracts/MemeNFT.json";

const CONTRACT_ADDRESS = "YOUR_SMART_CONTRACT_ADDRESS";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, MemeNFT.abi, signer);

export const mintMemeNFT = async (meme) => {
  try {
    const transaction = await contract.mintNFT(meme.imageUrl, meme.caption);
    await transaction.wait();
    alert("NFT Minted Successfully!");
  } catch (error) {
    console.error("Minting Error:", error);
  }
};
