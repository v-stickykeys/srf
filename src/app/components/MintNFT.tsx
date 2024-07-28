import {ethers} from 'ethers'
import {Address} from '@unique-nft/utils'
import {
  CollectionHelpersFactory,
  UniqueNFTFactory,
} from '@unique-nft/solidity-interfaces'
import { NFT_COLLECTION_ADDRESS, OPAL_NETWORK_ID, SRF_CONTRACT_ADDRESS } from '../constants';
import { Children, useEffect, useState } from 'react';
import { UniqueNFT } from '@unique-nft/solidity-interfaces';
import { useWallets } from '@privy-io/react-auth';
import { calculateTotalGasEstimate } from '@privy-io/js-sdk-core';
import abi from '../../artifacts/abi.json';

interface MintNFTProps {
    children: React.ReactNode;
    tokenUri: string;
}

export default function MintNFT({ children, tokenUri }: MintNFTProps) {
    const [srfContract, setSrfContract] = useState<any>(null);
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
        const contract = new ethers.Contract(SRF_CONTRACT_ADDRESS, abi, signer);
        console.log("contract", contract);
        setSrfContract(contract);
    }

  async function mint(uri: string) {
    if (!srfContract || !ready) {
        return;
    }
    const wallet = wallets[0];
    // const provider = await wallet.getEthersProvider();
    // await wallet.switchChain(OPAL_NETWORK_ID);
    // console.log("wallet", wallet);
    // console.log(collection);
    // collection.addCollectionAdminCross();
    const mintTokenTx = await srfContract.mintNFT(uri, {gasLimit: 210000, nonce: 10});
    const mintTokenResult = await mintTokenTx.wait();
    console.log("mintTokenResult", mintTokenResult);
    // const tokenId = mintTokenResult.events?.[0].args?.tokenId.toNumber()
    // console.log("minted tokenId", tokenId);
  }

    return (
<button className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        onClick={() => mint(tokenUri)}>
            {children}
        </button>
    );
}
