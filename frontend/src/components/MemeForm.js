import React, { useState } from "react";
import { generateMeme } from "../api/memeApi";
import "./../styles/MemeForm.css";

function MemeForm({ setMeme }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const memeData = await generateMeme(text);
    setMeme(memeData);
  };

  return (
    <div className="meme-form">
      <h2>Generate Your AI Meme</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a meme idea..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Generate Meme</button>
      </form>
    </div>
  );
}

export default MemeForm;
