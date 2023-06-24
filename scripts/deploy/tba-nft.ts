import { ethers } from "hardhat";

async function main() {
    const contract = await ethers.deployContract("MockNFT", [
        "0x670e1041801cfcF0c5b17972a7D94bb6d0752A72"
    ])

    await contract.waitForDeployment();

    console.log(
        `Contract deployed to: ${contract.target}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
