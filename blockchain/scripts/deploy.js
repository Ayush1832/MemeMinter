const hre = require("hardhat");

async function main() {
    const MemeNFT = await hre.ethers.getContractFactory("MemeNFT");
    const memeNFT = await MemeNFT.deploy();

    await memeNFT.deployed();

    console.log("MemeNFT deployed to:", memeNFT.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
