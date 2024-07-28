import { ethers, ContractFactory } from 'ethers';
import contractAbi from '../artifacts/abi.json';
import { bytecode } from '../artifacts/bytecode';
import { NFT_COLLECTION_ADDRESS } from '../app/constants';

const provider = new ethers.providers.JsonRpcProvider('https://rpc-opal.unique.network')
// const wallet = ethers.Wallet.createRandom();
// console.log(wallet.privateKey);
const wallet = new ethers.Wallet('pk', provider);
console.log(wallet.address);

async function main() {
    const factory = new ContractFactory(contractAbi, bytecode, wallet);

    const contract = await factory.deploy(NFT_COLLECTION_ADDRESS);
    const receipt = await contract.deployTransaction.wait();

    console.log(contract.address);
    console.log(receipt);
}

main().then(console.log).catch(console.error);
