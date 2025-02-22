import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/memes";

export const generateMeme = async (text) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate`, { text });
    return response.data;
  } catch (error) {
    console.error("Error generating meme:", error);
    return null;
  }
};
