import {ethers} from 'ethers'
import {Address} from '@unique-nft/utils'
import {
  CollectionHelpersFactory,
  UniqueNFTFactory,
} from '@unique-nft/solidity-interfaces'
import { NFT_COLLECTION_ADDRESS, OPAL_NETWORK_ID } from '../constants';
import { Children, useEffect, useState } from 'react';
import { UniqueNFT } from '@unique-nft/solidity-interfaces';
import { useWallets } from '@privy-io/react-auth';
import { calculateTotalGasEstimate } from '@privy-io/js-sdk-core';

interface VoteNFTProps {
    children: React.ReactNode;
    nftId: string;
}

export default function VoteNFT({ children, nftId }: VoteNFTProps) {
    const {ready, wallets} = useWallets();

    async function vote(nftId: string) {
        if (!ready) {
            return;
        }
        const wallet = wallets[0];
        const provider = await wallet.getEthersProvider();
        const signer = provider.getSigner();
        const data = JSON.stringify({
            app: "SRF",
            timestamp: Date.now(),
            nftId: nftId,
        });
        const signature = await signer.signMessage(data);
        // TODO: store this in a db
        const vote = {
            nftId,
            data,
            signature,
        }
        console.log("vote", vote);
    }

    return (
        <button onClick={() => vote(nftId)}>
            {children}
        </button>
    );
}
