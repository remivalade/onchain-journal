'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { bob } from '@/lib/chains';
import { contractAddress, contractAbi } from '@/lib/contract';
import { ConnectButton } from '@rainbow-me/rainbowkit';

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
  const [text, setText] = useState('');

  // Wagmi hooks for wallet connection and network switching
  const { address, isConnected, chainId } = useAccount();

  // Check if the user is on the correct network (BOB)
  const onBob = chainId === bob.id;
  const isFormEnabled = isConnected && onBob;

  // Wagmi hook for writing to the contract
  const { data: hash, isPending, isSuccess, isError, writeContract } = useWriteContract();

  // Wagmi hook for reading from the contract to generate the preview
  const { data: svg, isLoading: isPreviewLoading } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'generateSVG',
    args: [
      {
        text: text || ' ', // Pass a space if text is empty, as contract may not handle empty strings.
        mood: mood,
        timestamp: BigInt(Math.floor(Date.now() / 1000)),
        owner: address || '0x0000000000000000000000000000000000000000',
      },
    ],
    query: {
      // Only run the query if the form is enabled (wallet connected to BOB)
      enabled: isFormEnabled,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setText('');
    }
  }, [isSuccess]);

  const handleMint = () => {
    if (!text.trim()) {
      alert('Please write something in your journal.');
      return;
    }
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'mintEntry',
      args: [text, mood],
    });
  };

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

        {/* Connect Button */}
        <div className="flex justify-center">
          <ConnectButton />
        </div>

        <form
          className={`flex flex-col space-y-6 ${
            !isFormEnabled && 'opacity-50 pointer-events-none'
          }`}
        >
          <div>
            <label className="block text-lg mb-2">3. Select a Mood</label>
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

          <div>
            <label className="block text-lg mb-2">
              4. Write Your Entry{' '}
              <span className="text-sm text-gray-400">{text.length}/400</span>
            </label>
            <textarea
              rows={5}
              maxLength={400}
              placeholder="What's on your mind?"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 text-lg text-gray-200"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary w-full"
            onClick={handleMint}
            disabled={!isFormEnabled || isPending}
          >
            {isPending ? 'Minting...' : '5. Mint your Journal NFT'}
          </button>
        </form>

        <div className="p-4 bg-gray-900/50 rounded-lg font-mono text-sm h-24 flex items-center justify-center text-center">
          {isPending && <div>Minting in progress...</div>}
          {isSuccess && (
            <div>
              <p>Mint successful!</p>
              <a
                href={`${bob.blockExplorers.default.url}/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:underline"
              >
                View on Explorer
              </a>
            </div>
          )}
          {isError && <div>Mint failed. Please try again.</div>}
          {!isPending && !isSuccess && !isError && (
            <>
              {!isConnected
                ? 'Connect your wallet to begin…'
                : !onBob
                ? 'Please switch to the BOB network to continue.'
                : 'Ready to mint your thoughts on-chain.'}
            </>
          )}
        </div>
      </div>

      {/* ▸ Right pane */}
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Live NFT Preview</h2>
        <div className="w-full max-w-[500px] aspect-square bg-gray-700 border-2 border-gray-600 rounded-lg overflow-hidden flex items-center justify-center">
          {isPreviewLoading && isFormEnabled && <div>Generating preview...</div>}
          {svg && isFormEnabled ? (
            <img
              src={`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`}
              alt="NFT Preview"
            />
          ) : (
            <div className="text-center text-gray-400">
              <p>Connect your wallet and write an entry to see the preview.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
