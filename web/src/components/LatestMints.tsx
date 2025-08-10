'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePublicClient } from 'wagmi';
import { contractAddress, contractAbi } from '@/lib/contract';
import { bob } from '@/lib/chains';
import { parseAbiItem } from 'viem';

// Define the type for a mint event
interface MintEvent {
  minter: `0x${string}`;
  tokenId: number;
  imageUrl: string;
}

// Function to truncate an address for display
const truncateAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default function LatestMints() {
  const [mints, setMints] = useState<MintEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get the public client from wagmi
  const publicClient = usePublicClient({ chainId: bob.id });

  useEffect(() => {
    const fetchMints = async () => {
      if (!publicClient) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        // Fetch the Transfer events from the contract
        const logs = await publicClient.getLogs({
          address: contractAddress,
          event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)'),
          args: {
            from: '0x0000000000000000000000000000000000000000',
          },
          fromBlock: 'earliest',
          toBlock: 'latest',
        });

        // Get the latest 5 mints
        const latestLogs = logs.slice(-5).reverse();

        // For each log, fetch the token URI and parse the metadata
        const mintsPromises = latestLogs.map(async (log) => {
          const tokenId = log.args.tokenId;
          if (tokenId === undefined) return null;

          try {
            const tokenUriData = await publicClient.readContract({
              address: contractAddress,
              abi: contractAbi,
              functionName: 'tokenURI',
              args: [tokenId],
            });

            // The tokenURI is a base64 encoded JSON string, so we need to decode it
            const tokenUriJson = JSON.parse(atob(tokenUriData.split(',')[1]));

            return {
              minter: log.args.to!,
              tokenId: Number(tokenId),
              imageUrl: tokenUriJson.image,
            };
          } catch (error) {
            console.error(`Error fetching metadata for token #${tokenId}:`, error);
            return null;
          }
        });

        // Wait for all promises to resolve and filter out any nulls (errors)
        const mintsData = (await Promise.all(mintsPromises)).filter(
          (mint): mint is MintEvent => mint !== null,
        );

        setMints(mintsData);
      } catch (error) {
        console.error('Error fetching latest mints:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMints();
  }, [publicClient]);

  // If there are no mints, don't render the component
  if (!isLoading && mints.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Latest Mints</h2>
      <div className="flex justify-center gap-4 p-4 rounded-lg">
        {isLoading ? (
          <p>Loading latest mints...</p>
        ) : (
          mints.map((mint) => (
            <a
              key={mint.tokenId}
              href={`${bob.blockExplorers.default.url}/nft/${contractAddress}/${mint.tokenId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg transition-transform hover:scale-110"
            >
              <Image
                src={mint.imageUrl}
                alt={`Token #${mint.tokenId}`}
                width={128}
                height={128}
                className="rounded-lg"
              />
            </a>
          ))
        )}
      </div>
    </div>
  );
}
