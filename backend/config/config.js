import dotenv from "dotenv";
dotenv.config();

export default {
  openAiApiKey: process.env.OPENAI_API_KEY,
  infuraIpfs: {
    projectId: process.env.INFURA_IPFS_PROJECT_ID,
    secret: process.env.INFURA_IPFS_SECRET,
  },
  blockchain: {
    rpcUrl: process.env.POLYGON_AMOY_RPC_URL,
    privateKey: process.env.PRIVATE_KEY,
    contractAddress: process.env.CONTRACT_ADDRESS,
  },
};
