import { ethers } from "hardhat";

async function main() {
    const contract = await ethers.deployContract("Account", [
        "0x83FE64Bc14b124f65Eb5249b9BA45b66e3eFFe4C"
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
