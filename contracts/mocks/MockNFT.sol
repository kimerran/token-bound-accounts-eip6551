// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "../interfaces/IRegistry.sol";

contract MockNFT is ERC721, Ownable {
    uint public nextTokenId = 1;

    string public organization;
    string public certName;
    string public certSymbol;

    address private _registry;
    constructor(
        address tbaRegistry
    ) ERC721(
        "MOCK", 
        "MOCK") {
        organization = "sample";
        certName = "sample";
        certSymbol = "sample";
        _registry = tbaRegistry;
        transferOwnership(msg.sender);
    }

    function mintOwn() public {
        mint(msg.sender);
    }

    function mint(address to) public {
        _safeMint(to, nextTokenId);

        IRegistry(_registry).createAccount(
            address(this),
            nextTokenId
        );
        nextTokenId++;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        string memory description = string(
            abi.encodePacked("This cert was issued by ", organization, ".")
        );
        string memory name = string(
            abi.encodePacked(certName, " #", Strings.toString(tokenId))
        );

        string memory metadata = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        name,
                        '", "description": "',
                        description,
                        '", "image": "',
                        "https://theblokc.com/cert/",
                        '"}'
                    )
                )
            )
        );
        // string memory json = Base64.encode(bytes(metadata));
        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", metadata)
        );
        return finalTokenUri;
        // return string(abi.encodePacked("https://example.com/cert/", Strings.toString(tokenId)));
    }
}