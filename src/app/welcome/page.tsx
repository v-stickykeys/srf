"use client";
import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import surfImage from './surf.png';
import Link from 'next/link';

interface NFTSurfer {
    imageUrl: StaticImageData;
    // Add other properties of the NFT surfer here
  }
  
  const NFTProfileCreator: React.FC = () => {
    const [nftSurfer, setNftSurfer] = useState<NFTSurfer>({
      imageUrl: surfImage, 
    });
  
    const regenerateNFT = (): void => {
      console.log('Regenerating NFT');
    };
  
    const confirmNFT = (): void => {
      console.log('NFT confirmed');

    };
  
    const createAccount = (): void => {
      console.log('Creating account');
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="relative">
            <button className="absolute top-4 right-4 text-gray-500 text-xl">&times;</button>
          </div>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">You're In!</h2>
            <p className="text-gray-600 mb-4">
              Here's a unique NFT surfer profile created just for you!
            </p>
            <div className="mb-6 relative w-32 h-32 mx-auto">
              <Image 
                src={nftSurfer.imageUrl} 
                alt="NFT Surfer" 
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="flex justify-center space-x-4 mb-6">
              <button 
                onClick={regenerateNFT}
                className="px-6 py-2 bg-gray-100 text-gray-800 rounded-full"
              >
                Regenerate
              </button>
            <Link href="/video" passHref>
              <button 
                onClick={confirmNFT}
                className="px-6 py-2 bg-blue-500 text-white rounded-full"
              >
                All Set!
              </button>
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-4 text-gray-600">
          Sign In Using Another Wallet <a href="#" className="text-blue-500">Sign In</a>
        </p>
      </div>
    );
  };
  
  export default NFTProfileCreator;