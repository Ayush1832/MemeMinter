require("dotenv").config();
const express = require("express");
const axios = require("axios");
const multer = require("multer");
const { create } = require("ipfs-http-client");

const app = express();
app.use(express.json());

const ipfs = create({ url: "https://ipfs.infura.io:5001/api/v0" });

const upload = multer({ dest: "uploads/" });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/generate-meme", upload.single("file"), async (req, res) => {
    try {
        const { text } = req.body;

        const captionResponse = await axios.post(
            "https://api.openai.com/v1/completions",
            {
                model: "text-davinci-003",
                prompt: `Generate a funny meme caption for: ${text}`,
                max_tokens: 50,
            },
            {
                headers: { Authorization: `Bearer ${OPENAI_API_KEY}` },
            }
        );

        const caption = captionResponse.data.choices[0].text.trim();

        const imageResponse = await axios.post(
            "https://api.openai.com/v1/images/generations",
            {
                model: "dall-e-2",
                prompt: `Create a meme image for: ${caption}`,
                n: 1,
                size: "512x512",
            },
            {
                headers: { Authorization: `Bearer ${OPENAI_API_KEY}` },
            }
        );

        const imageUrl = imageResponse.data.data[0].url;

        const ipfsResponse = await ipfs.add(JSON.stringify({ caption, imageUrl }));
        const ipfsUrl = `https://ipfs.io/ipfs/${ipfsResponse.path}`;

        res.json({ caption, imageUrl, ipfsUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate meme" });
    }
});

app.listen(3001, () => console.log("Server running on port 3001"));
