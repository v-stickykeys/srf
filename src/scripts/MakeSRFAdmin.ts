import {ethers} from 'ethers';
import {Address} from '@unique-nft/utils';
import {
  CollectionHelpersFactory,
  UniqueNFTFactory,
} from '@unique-nft/solidity-interfaces'
import { NFT_COLLECTION_ADDRESS, SRF_CONTRACT_ADDRESS } from '../app/constants';

const provider = new ethers.providers.JsonRpcProvider('https://rpc-opal.unique.network')
// const wallet = ethers.Wallet.createRandom();
// console.log(wallet.privateKey);
const wallet = new ethers.Wallet('pk', provider)

async function main() {
    // const signer = provider.getSigner();
    const contract = await UniqueNFTFactory(NFT_COLLECTION_ADDRESS, wallet, ethers);
    const tx = await contract.addCollectionAdminCross({ eth: SRF_CONTRACT_ADDRESS, sub: '0' });
    const result = await tx.wait();
    console.log(result);
}

main().then(console.log).catch(console.error);
