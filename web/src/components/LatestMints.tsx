'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePublicClient } from 'wagmi';
import { contractAddress } from '@/lib/contract';
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
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="latest-mints-container">
      <div className="latest-mints-header">
        {mints.length > 0 && (
          <p>
            {truncateAddress(mints[0].minter)} has minted token #{mints[0].tokenId}
          </p>
        )}
        <button onClick={() => setIsOpen(!isOpen)} className="toggle-button">
          {isOpen ? 'Hide' : 'Show'}
        </button>
      </div>
      {isOpen && (
        <div className="latest-mints-gallery">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            mints.map((mint) => (
              <a
                key={mint.tokenId}
                href={`${bob.blockExplorers.default.url}/nft/${contractAddress}/${mint.tokenId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mint-item"
              >
                <Image
                  src={mint.imageUrl}
                  alt={`Token #${mint.tokenId}`}
                  width={100}
                  height={100}
                  className="mint-image"
                />
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
}
