"use client";

import React, { useState, useEffect } from 'react';
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import LoginButton from '../components/LoginButton';
import Link from 'next/link';
import { listFiles } from '../utils/listFiles';
import CountVote from '../components/CountVote';

interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  author: string;
  likes: number;
  comments: number;
  votes: number;
}

const VideoFeed: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    listFiles()
      .then((data) => {
        return data.resources.map((item: any, idx: number) => {
          return {
            id: item["key"] || String(idx),
            title: "",
            author: `user-${idx}`,
            version: "",
            createdDate: new Date(item["lastModified"]),
            thumbnailUrl: item["url"],
            likes: 73 * idx,
            comments: 142 * idx,
            votes: 98 * idx,
          };
        });
      })
      .then((list: Array<Video>) => {
        setVideos(list);
      });
  }, []);

  return (
    <div className="bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-300 min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <div className="max-w-md mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">SRF</div>
          <nav>
            <ul className="flex space-x-4">
              <li>
              <LoginButton />
              </li>
            </ul>
          </nav>
          <button className="text-gray-600 hover:text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-md mx-auto pt-4 pb-20 px-2">
          {videos.map((video, idx) => (
            <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-lg mb-6">
              <video className="h-full w-full rounded-lg" controls>
      <source
        src={video.thumbnailUrl}
        // src={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
              {/* <img 
                src={video.thumbnailUrl} 
                alt={video.title} 
                className="w-full h-64 object-cover"
              /> */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{video.title}</h2>
                <p className="text-sm text-gray-600 mt-1">@{video.author}</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-700 hover:text-pink-500">
                      <HeartIcon className="h-6 w-6 mr-1" />
                      <span>{video.likes}</span>
                    </button>
                    <button className="flex items-center text-gray-700 hover:text-blue-500">
                      <ChatBubbleLeftIcon className="h-6 w-6 mr-1" />
                      <span>{video.comments}</span>
                    </button>
                    <CountVote field={`srf-videos-${idx}`} />
                  </div>
                  <button className="text-gray-700 hover:text-indigo-500">
                    <ShareIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white shadow-md">
        <div className="max-w-md mx-auto px-4 py-3 flex justify-between items-center">
          <button className="text-gray-600 hover:text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <Link href="/upload">
          <button className="bg-indigo-600 text-white rounded-full p-3 hover:bg-indigo-700" aria-label="Upload video">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          </Link>
          <button className="text-gray-600 hover:text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default VideoFeed;