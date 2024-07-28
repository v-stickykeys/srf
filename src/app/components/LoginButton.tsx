'use client';

import { ethers } from "ethers";
import {usePrivy} from '@privy-io/react-auth';
import { NFT_COLLECTION_ADDRESS, SRF_CONTRACT_ADDRESS } from "../constants";
import {Address} from '@unique-nft/utils';
import {
  CollectionHelpersFactory,
  UniqueNFTFactory,
} from '@unique-nft/solidity-interfaces'



export default function LoginButton() {
  const {ready, authenticated, login, user} = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  const provider = new ethers.providers.JsonRpcProvider('https://rpc-opal.unique.network')
  // TODO: don't commit this. lol
  const wallet = new ethers.Wallet('0x20636459e965e8c1649b519463e616d1a90af108b38b96b397f0aabc6d66a735', provider)

  async function logMeIn() {
    const userAddress = user?.wallet?.address || "";
    const collection = await UniqueNFTFactory(NFT_COLLECTION_ADDRESS, wallet, ethers);

    const txMintToken = await (await collection.mintWithTokenURI(
      userAddress,
      'https://surflytics.com/players/1'
    )).wait()
    const tokenId = txMintToken.events?.[0].args?.tokenId.toNumber();
    const tokenUri = await collection.tokenURI(tokenId);

    console.log("token id", tokenId);
    console.log("token uri", tokenUri);

    login();
  }

  if (ready && !authenticated) {
    // Replace this code with however you'd like to handle an unauthenticated user
    // As an example, you might redirect them to a login page
    return (
        <button className="text-blue-600 font-semibold" disabled={disableLogin} onClick={logMeIn}>
            Log in
        </button>
    );
    }

  if (ready && authenticated) {
    // Replace this code with however you'd like to handle an authenticated user
    console.log("User is logged in", user);
    return <p className="text-gray-600 font-semibold">Logged in</p>;
  }
}
