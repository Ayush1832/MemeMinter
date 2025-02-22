import { create } from "ipfs-http-client";
import config from "../config/config.js";

const auth = `Basic ${Buffer.from(`${config.infuraIpfs.projectId}:${config.infuraIpfs.secret}`).toString("base64")}`;
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: { authorization: auth },
});

export async function uploadToIPFS(memeData) {
  try {
    const { path } = await ipfs.add(JSON.stringify(memeData));
    return `https://ipfs.io/ipfs/${path}`;
  } catch (error) {
    console.error("IPFS Upload Error:", error);
    throw new Error("Failed to upload to IPFS.");
  }
}
