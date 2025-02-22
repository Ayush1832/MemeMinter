import React, { useState } from "react";
import { mintMemeNFT } from "../utils/blockchain";
import "./../styles/MemeDisplay.css";

function MemeDisplay({ meme }) {
  const [minted, setMinted] = useState(false);

  const handleMint = async () => {
    await mintMemeNFT(meme);
    setMinted(true);
  };

  return (
    <div className="meme-display">
      {meme && (
        <>
          <img src={meme.imageUrl} alt="Generated Meme" />
          <p>{meme.caption}</p>
          {!minted ? (
            <button onClick={handleMint}>Mint as NFT</button>
          ) : (
            <p>NFT Minted Successfully!</p>
          )}
        </>
      )}
    </div>
  );
}

export default MemeDisplay;
