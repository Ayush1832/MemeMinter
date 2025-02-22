import React, { useState } from "react";
import axios from "axios";

function App() {
    const [text, setText] = useState("");
    const [meme, setMeme] = useState(null);

    const generateMeme = async () => {
        const response = await axios.post("http://localhost:3001/generate-meme", { text });
        setMeme(response.data);
    };

    return (
        <div>
            <h1>AI Meme NFT Generator</h1>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter meme topic" />
            <button onClick={generateMeme}>Generate Meme</button>

            {meme && (
                <div>
                    <h2>{meme.caption}</h2>
                    <img src={meme.imageUrl} alt="Generated Meme" />
                    <p>IPFS: {meme.ipfsUrl}</p>
                </div>
            )}
        </div>
    );
}

export default App;
