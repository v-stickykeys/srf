import {ethers} from 'ethers';
import {Address} from '@unique-nft/utils';
import {
  CollectionHelpersFactory,
  UniqueNFTFactory,
} from '@unique-nft/solidity-interfaces'

const provider = new ethers.providers.JsonRpcProvider('https://rpc-opal.unique.network')
// const wallet = ethers.Wallet.createRandom();
// console.log(wallet.privateKey);
const wallet = new ethers.Wallet('pk', provider)
console.log(wallet.address);

async function main() {
    const collectionHelpers = await CollectionHelpersFactory(wallet, ethers) // ethers parameter is optional
    //when ethers not provided, it's been asynchronously loaded on demand to reduce package size and TTFP

    const fee = await collectionHelpers.collectionCreationFee()
    const collectionTx = await collectionHelpers.createNFTCollection(
        'Surf Rank Feed', // collection name
        'Surf clips from around the world', // collection description
        'SRF', // token prefix - short, up to 4 letters string
        {value: fee}
    );
    const collectionResult = await collectionTx.wait();
    const collectionAddress = collectionResult.events?.[0].args?.collectionId as string
    // make collection ERC721Metadata compatible, to create necessary properties and activate
    // corresponding supportsInterface and enable mintWithTokenURI and tokenURI methods 
    //
    // Actually it's optional but if we want to make it compatible with 
    // common ethereum-world NFT collections, it's better to enable this compatibility.
    // anyway, it just improves the collection and doesn't brake or mangle anything. 
    const makeCompatibleTx = await collectionHelpers.makeCollectionERC721MetadataCompatible(
    collectionAddress,
    'https://surflytics.com/videos/'
    )
    const makeCompatibleResult = await makeCompatibleTx.wait();
    console.log(`Collection (address ${collectionAddress}) is now ERC721Compatible`);

}

// main().then(console.log).catch(console.error);
