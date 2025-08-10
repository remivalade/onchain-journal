'use client';

import React, { useState } from 'react';

export function MadeByRemivalade() {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(prev => !prev)}
      className="fixed bottom-4 right-4 z-10 rounded-lg shadow-lg cursor-pointer
                 bg-gray-900/80 backdrop-blur-md hover:ring-2 hover:ring-purple-500/50"
    >
      {!open ? (
        <div className="flex items-center space-x-2 p-2 group">
          <img
            src="https://irys.portrait.host/FEQnDav4onGWwukVL1-p1ytDMaZu6Cai0AxvUPMRemw"
            alt="remivalade profile picture"
            className="w-6 h-6 rounded-full border border-gray-600/50"
          />
          <span className="text-xs font-medium text-gray-200">made by remivalade</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
      ) : (
        <div className="p-4 w-48 flex flex-col items-center text-center">
          <div className="flex items-center justify-between w-full mb-3">
            <img
              src="https://irys.portrait.host/FEQnDav4onGWwukVL1-p1ytDMaZu6Cai0AxvUPMRemw"
              alt="remivalade profile picture"
              className="w-16 h-16 rounded-full border-2 border-gray-600/70 shadow-md"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400 transition-transform duration-200 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>

          <p className="text-sm font-medium mb-1 text-gray-100">Hi, I&apos;m Rémi.</p>
          <p className="text-xs mb-3 text-gray-300">I hope you like what you see there.</p>

          <div className="flex items-center justify-center space-x-4 mb-4">
            <a
              href="https://www.linkedin.com/in/remivalade/"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              title="Rémi Valade on LinkedIn"
              className="p-1 rounded-md border border-transparent hover:border-purple-400/50 transition-all duration-200 hover:scale-110 block"
            >
              <img src="/linkedin.svg" alt="LinkedIn" className="w-5 h-5 block" />
            </a>
            <a
              href="https://x.com/remivalade"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              title="Rémi Valade on X"
              className="p-1 rounded-md border border-transparent hover:border-purple-400/50 transition-all duration-200 hover:scale-110 block"
            >
              <img src="/x.svg" alt="X" className="w-5 h-5 block" />
            </a>
          </div>

          {/* Modified CTA */}
          <a
            href="https://remivalade.com/"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center w-full px-3 py-1.5 border border-gray-600 text-gray-100 text-xs rounded-md shadow-sm overflow-hidden group bg-gradient-to-r from-purple-500 via-orange-500 to-yellow-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <span className="absolute top-0 right-0 w-10 h-full -mt-1 bg-white opacity-20 rotate-12 transform translate-x-12 transition-all duration-700 group-hover:-translate-x-56 ease-out" />
            <span className="relative z-10">Visit my website</span>
          </a>
        </div>
      )}
    </div>
  );
}
