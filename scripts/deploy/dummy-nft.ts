import { ethers } from "hardhat";

async function main() {
    const contract = await ethers.deployContract("AccountRegistry", [
        "0x695cc3A466F3f410ea5daf9E0431cF212684E430"
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
