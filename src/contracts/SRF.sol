// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "UniqueNFT.sol";

/**
 * @title NFTContest
 * @dev A contract that allows users to mint NFTs for a fee of 1 USDC. The collected fees are associated with a 24-hour contest period.
 * At the end of each period, the contract owner manually selects an NFT holder to receive 20% of the total collected USDC, while the remaining 80% goes to a secondary address.
 */
contract SRF is Ownable {
    uint256 public constant CONTEST_DURATION = 24 hours;
    uint256 public constant MINT_FEE = 1 * 10**18;
    // uint256 public constant MINT_FEE = 1 * 10**6; // 1 USDC (assuming USDC has 6 decimals)
    UniqueNFT public nftContract;
    // IERC20 public usdcToken; // USDC token contract
    uint256 public contestEndTime; // End time of the current contest period
    uint256 public contests; // Count of contests, also their id
    mapping(uint256 => uint256) public totalCollectedFees; // Total USDC collected for the contest
    mapping(uint256 => uint256) public nftIdsToContestIds; // NFT ids to contest ids
    mapping(uint256 => uint256) public contestToMajorityReward; // Majority award for the contest

    event NFTMinted(address indexed minter, uint256 indexed contestId, string tokenURI);
    event ContestWinnerSelected(address indexed winner, uint256 rewardAmount);


    constructor(UniqueNFT _nftContract /*, IERC20 _usdcToken */) Ownable(msg.sender) {
        // require(address(_usdcToken) != address(0), "Invalid USDC token address");
        require(address(_nftContract) != address(0), "Invalid NFT contract address");
        // usdcToken = _usdcToken;
        nftContract = _nftContract;
        contestEndTime = block.timestamp + CONTEST_DURATION;
    }

    function mintNFT(string memory tokenUri) payable external {
        require(msg.value >= MINT_FEE, "Invalid mint fee");
        if (block.timestamp >= contestEndTime) {
            contestEndTime = block.timestamp + CONTEST_DURATION;
            contests++;
        }
        uint256 tokenId = nftContract.mintWithTokenURI(msg.sender, tokenUri);
        // require(usdcToken.transferFrom(msg.sender, address(this), MINT_FEE), "USDC transfer failed");

        nftIdsToContestIds[tokenId] = contests;
        totalCollectedFees[contests] += msg.value;

        emit NFTMinted(msg.sender, contests, tokenUri);
    }

    /**
     * @dev Select a contest winner and distribute the collected fees
     * @param nftId Token ID of the selected winner
     */
    function selectContestWinner(uint256 nftId) external onlyOwner {
        address payable nftHolder = nftContract.ownerOf(nftId);
        require(nftHolder != address(0), "Invalid owner address");

        uint256 contestId = nftIdsToContestIds[nftId];

        uint256 nftHolderReward = (totalCollectedFees[contestId] * 20) / 100;
        uint256 majorityReward = totalCollectedFees[contestId] - nftHolderReward;

        // save for later
        contestToMajorityReward[contestId] = majorityReward;

        totalCollectedFees[contestId] = 0;

        (bool success, ) = nftHolder.call{value: nftHolderReward}("");
        require(success, "Transfer to NFT holder failed");

        // require(usdcToken.transfer(nftHolder, nftHolderReward), "USDC transfer to winner failed");


        emit ContestWinnerSelected(nftHolder, nftHolderReward);
    }

    function payMajorityAddress(address payable majorityAddress, uint256 contestId) external onlyOwner {
        uint256 majorityReward = contestToMajorityReward[contestId];

        contestToMajorityReward[contestId] = 0;

        (bool success, ) = majorityAddress.call{value: majorityReward}("");
        require(success, "Transfer to majority address failed");
        // require(usdcToken.transfer(majorityAddress, majorityReward), "USDC transfer to majority address failed");
    }
}