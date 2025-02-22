import { generateMeme } from "../services/aiService.js";
import { uploadToIPFS } from "../services/ipfsService.js";
import { mintNFT } from "../services/blockchainService.js";

export async function createMeme(req, res) {
  try {
    const { prompt } = req.body;
    const meme = await generateMeme(prompt);
    const ipfsUrl = await uploadToIPFS(meme);
    const txHash = await mintNFT(ipfsUrl);

    res.json({ meme, ipfsUrl, txHash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
