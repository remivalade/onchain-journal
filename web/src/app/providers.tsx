'use client';

import { WagmiProvider, type State } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/wagmi';
import React from 'react';

// RainbowKit/Wagmi imports
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
  ssr: true,
});

export function Providers({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState?: State;
}) {
  return (
    <React.StrictMode>
      <WagmiProvider config={wagmiConfig} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  );
}
