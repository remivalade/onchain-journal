'use client';

import Image from 'next/image';

import { useState } from 'react';

const EMOJIS = [
  { e: '😊', t: 'Happy' },
  { e: '😂', t: 'Laughing' },
  { e: '😍', t: 'Love' },
  { e: '🤔', t: 'Thinking' },
  { e: '😢', t: 'Sad' },
  { e: '😡', t: 'Angry' },
  { e: '🚀', t: 'To the moon' },
  { e: '💡', t: 'Idea' },
  { e: '🔥', t: 'Fire' },
  { e: '🙏', t: 'Grateful' },
  { e: '💯', t: '100%' },
  { e: '👀', t: 'Watching' },
  { e: '😅', t: 'Sweat' },
  { e: '😏', t: 'Smirk' },
];

export default function JournalApp() {
  const [mood, setMood] = useState(EMOJIS[0].e);


  return (
    <div className="w-full max-w-6xl bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-10 mx-auto grid lg:grid-cols-2 gap-10 text-white">
      {/* ▸ Left pane */}
      <div className="flex flex-col space-y-6">
        {/* header / branding */}
        <header className="flex items-center gap-4">
          <Image
            src="/pics/logo-oj-256.png"
            alt="On-Chain Journal"
            width={80}
            height={80}
            className="shrink-0 rounded-xl"
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">On-Chain Journal</h1>
            <p className="text-gray-400">Mint your thoughts & moods on BOB</p>
          </div>
        </header>

        {/* step place-holders – functionality later */}
        <section>
          <button className="btn btn-primary w-full">1. Connect Wallet</button>
        </section>

        <section>
          <button className="btn btn-primary w-full">2. Switch to BOB Network</button>
        </section>

        <form className="flex flex-col space-y-6 opacity-50 pointer-events-none">
          <div>
            <label className="block text-lg mb-2">3. Select a Mood</label>
            <div className="flex flex-wrap gap-2 p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex flex-wrap gap-2 p-3 bg-gray-900/50 rounded-lg">
      {EMOJIS.map(({ e, t }) => (
        <button
          key={e}
          type="button"
          title={t}
          onClick={() => setMood(e)}
          className={`text-3xl p-2 rounded-full transition-transform hover:scale-110 ${
            mood === e ? 'bg-orange-600' : 'hover:bg-gray-600'
          }`}
        >
          {e}
        </button>
      ))}
    </div>
            </div>
          </div>

          <div>
            <label className="block text-lg mb-2">
              4. Write Your Entry <span className="text-sm text-gray-400">0/400</span>
            </label>
            <textarea
              rows={5}
              maxLength={400}
              placeholder="What's on your mind?"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 text-lg text-gray-200"
            />
          </div>

          <button type="button" className="btn btn-primary w-full">
            5. Mint your Journal NFT
          </button>
        </form>

        <div className="p-4 bg-gray-900/50 rounded-lg font-mono text-sm h-24 flex items-center justify-center">
          Connect your wallet to begin…
        </div>
      </div>

      {/* ▸ Right pane */}
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Live NFT Preview</h2>
        <div className="w-full max-w-[500px] aspect-square bg-gray-700 border-2 border-gray-600 rounded-lg overflow-hidden" />
      </div>
    </div>
  );
}
