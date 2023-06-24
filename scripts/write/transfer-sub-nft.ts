import { ethers } from "hardhat";



async function main() {

    ethers.getContractFactoryFromArtifact
    const contract = await ethers.getContractAt("Account", "0x728264a1ecB9f23FF723C2a5839F060DA0b6Aae3")

    const x= await ethers.getSigners()
    
    const y = await contract.connect(x[1]).transferNft(
"0x85902416dee5cad820fb8a414bcbe51d55465a45",
100,
"0xdfa34343D3D6aFF264B176D75252065a182D7852"
    );

    console.log('y', y.hash)
    
    // console.log('x', x)

    // console.log(
    //     `Contract deployed to: ${contract.target}`
    // );
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
