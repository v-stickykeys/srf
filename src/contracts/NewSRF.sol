pragma solidity ^0.8.0;

import {CollectionHelpers, CollectionHelpersEvents, CrossAddress} from  "@unique-nft/solidity-interfaces/contracts/CollectionHelpers.sol";
import {UniqueNFT, ERC721Events} from "@unique-nft/solidity-interfaces/contracts/UniqueNFT.sol";

contract NewSRF is CollectionHelpersEvents, ERC721Events {
    CollectionHelpers helpers = CollectionHelpers(0x6C4E9fE1AE37a41E93CEE429e8E1881aBdcbb54F);
    UniqueNFT collection;

    struct TokenOwnerWithTokenId {
        address owner;
        uint32 tokenId;
    }

    event TokenMinted(TokenOwnerWithTokenId indexed tokenOwnerWithTokenId);

    function createCollection(
        address owner,
        string calldata name,
        string calldata description,
        string calldata symbol,
        string calldata baseURI
    ) public payable virtual returns (address){
        address collectionAddress = helpers.createNFTCollection{value: helpers.collectionCreationFee()}(name, description, symbol);

        helpers.makeCollectionERC721MetadataCompatible(collectionAddress, baseURI);

        collection = UniqueNFT(collectionAddress);

        CrossAddress admin = CrossAddress({ eth: address(this), sub: 0 });

        collection.addCollectionAdminCross(admin);

        //uint32 collectionId = uint32(uint160(collectionAddress) & uint32(0xffffffff));

        return collectionAddress;
    }

    function getCollectionAddress() public virtual view returns (address) {
        return address(collection);
    }

    function mint(address to) public virtual returns (uint256) {
        uint32 tokenId = uint32(collection.mint(to));
        emit TokenMinted(TokenOwnerWithTokenId(to, tokenId));
        return tokenId;
    }
    function mintWithTokenURI(address to, string memory tokenUri) public virtual returns (uint256) {
        uint32 tokenId = uint32(collection.mintWithTokenURI(to, tokenUri));
        emit TokenMinted(TokenOwnerWithTokenId(to, tokenId));
        return tokenId;
    }

    function mintToCaller() public virtual returns (uint256) {
        uint32 tokenId = uint32(collection.mint(msg.sender));
        emit TokenMinted(TokenOwnerWithTokenId(msg.sender, tokenId));
        return tokenId;
    }
    function mintWithTokenURIToCaller(string memory tokenUri) public virtual returns (uint256) {
        uint32 tokenId = uint32(collection.mintWithTokenURI(msg.sender, tokenUri));
        emit TokenMinted(TokenOwnerWithTokenId(msg.sender, tokenId));
        return tokenId;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        return collection.tokenURI(tokenId);
    }
}