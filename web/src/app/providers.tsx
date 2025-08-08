'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/wagmi';
import React from 'react';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { http } from 'wagmi';
import { bob } from '@/lib/chains';

// Create the wagmi config inside the client component file.
const wagmiConfig = getDefaultConfig({
  appName: 'On-Chain Journal',
  projectId: '6c3b0bc57aeed2aaaa83593adadec525',
  chains: [bob],
  transports: {
    [bob.id]: http(bob.rpcUrls.default.http[0]),
  },
  ssr: false,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <React.StrictMode>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  );
}
