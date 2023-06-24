import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";

import { expect } from "chai";
import { ethers } from "hardhat";

describe("OrgController", () => {
    async function deployContract() {
        const [owner, user1, user2] = await ethers.getSigners();
        const users = {
            owner,
            user1,
            user2,
        };
        const MockNFT = await ethers.getContractFactory("MockNFT");




        const Account = await ethers.getContractFactory("Account");
        const cAccount = await Account.deploy(owner.address);


        const AccountRegistry = await ethers.getContractFactory("AccountRegistry");
        const cRegistry = await AccountRegistry.deploy(cAccount.getAddress());
        // await cOrgController.deployed();

        const cDummayNFT = await MockNFT.deploy(cRegistry.getAddress());
        const cNFT = await MockNFT.deploy(cRegistry.getAddress());


        return { cRegistry, cAccount, cNFT, Account, cDummayNFT, users };
    }


    describe("Create Organization", async () => {
        it("should create org", async () => {
            const { cRegistry, cDummayNFT, cNFT, users } = await loadFixture(deployContract);
            // console.log('users', users.(user => user.address));
            console.log('users', {
                user1: users.user1.address,
                user2: users.user2.address,
                owner: users.owner.address,
            })

            await cNFT.mint(users.user1.address);
            console.log('owner of nft 1', await cNFT.ownerOf(1))

            // await cRegistry.createAccount(cNFT.getAddress(), 1);
            const tbaForToken1 = await cRegistry.account(cNFT.getAddress(), 1)
            console.log('tbaForToken1 contract', tbaForToken1)

            // add NFTs to that account
            await cDummayNFT.mint(tbaForToken1)
            await cDummayNFT.mint(tbaForToken1)
            await cDummayNFT.mint(tbaForToken1)
            let user1DummayNFTBalance = await cDummayNFT.balanceOf(tbaForToken1)
            console.log('user1DummayNFTBalance', user1DummayNFTBalance)

            const newCAccount = await ethers.getContractAt("Account", tbaForToken1)

            await newCAccount.connect(users.user1).transferNft(
                cDummayNFT.getAddress(),
                1,
                users.user2.address,
            )

            user1DummayNFTBalance = await cDummayNFT.balanceOf(tbaForToken1)
            console.log('user1DummayNFTBalance', user1DummayNFTBalance)
            // try {
            //     const ownerOfAccount = await newCAccount['owner']()
            //     const tokenOfAccount = await newCAccount['token']()

            //     console.log('ownerOfAccount', { ownerOfAccount, tokenOfAccount})
            // } catch (error) {
            //     console.error(error)
            // }
        });
    });
})