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

interface MintNFTProps {
    children: React.ReactNode;
    tokenUri: string;
}

export default function MintNFT({ children, tokenUri }: MintNFTProps) {
    const [collection, setCollection] = useState<UniqueNFT | null>(null);
    const {ready, wallets} = useWallets();

    useEffect(() => {
        createUniqueNFT();
    }, [ready]);

    async function createUniqueNFT() {
        if (!ready) {
            return;
        }
        const wallet = wallets[0];
        await wallet.switchChain(OPAL_NETWORK_ID);
        const provider = await wallet.getEthersProvider();
        const signer = provider.getSigner();
        const contract = await UniqueNFTFactory(NFT_COLLECTION_ADDRESS, signer, ethers);
        console.log("contract", contract);
        setCollection(contract);
    }

  async function mint(uri: string) {
    if (!collection || !ready) {
        return;
    }
    const wallet = wallets[0];
    // const provider = await wallet.getEthersProvider();
    // await wallet.switchChain(OPAL_NETWORK_ID);
    // console.log("wallet", wallet);
    // console.log(collection);
    // collection.addCollectionAdminCross();
    const mintTokenTx = await collection.mintWithTokenURI(wallet.address, uri, {gasLimit: 210000, nonce: 4});
    const mintTokenResult = await mintTokenTx.wait();
    const tokenId = mintTokenResult.events?.[0].args?.tokenId.toNumber()
    console.log("minted tokenId", tokenId);
  }

    return (
        <button onClick={() => mint(tokenUri)}>
            {children}
        </button>
    );
}
