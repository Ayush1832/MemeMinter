// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MemeNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    mapping(uint256 => uint256) public likes;
    mapping(uint256 => uint256) public shares;
    mapping(uint256 => uint256) public resales;
    mapping(uint256 => bool) public boosted;

    event MemeMinted(address indexed owner, uint256 indexed tokenId, string tokenURI);
    event EngagementUpdated(uint256 indexed tokenId, uint256 likes, uint256 shares, uint256 resales);
    event MemeBoosted(uint256 indexed tokenId);

    constructor(address initialOwner) ERC721("MemeNFT", "MEME") Ownable(initialOwner) {}

    function mintMeme(string memory tokenURI) external {
        uint256 newTokenId = _tokenIdCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _tokenIdCounter++;

        emit MemeMinted(msg.sender, newTokenId, tokenURI);
    }

    function updateEngagement(uint256 tokenId, uint256 newLikes, uint256 newShares, uint256 newResales) external {
        // Check if the token exists by calling ownerOf
        ownerOf(tokenId);

        likes[tokenId] += newLikes;
        shares[tokenId] += newShares;
        resales[tokenId] += newResales;

        emit EngagementUpdated(tokenId, likes[tokenId], shares[tokenId], resales[tokenId]);

        if (likes[tokenId] >= 100 || shares[tokenId] >= 50 || resales[tokenId] >= 20) {
            boostMeme(tokenId);
        }
    }

    function boostMeme(uint256 tokenId) internal {
        // Check if the token exists by calling ownerOf
        ownerOf(tokenId);

        require(!boosted[tokenId], "Already boosted");
        boosted[tokenId] = true;
        emit MemeBoosted(tokenId);
    }
}