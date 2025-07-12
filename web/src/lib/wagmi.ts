import { http, createConfig } from 'wagmi';
import { metaMask } from '@wagmi/connectors';
import { QueryClient } from '@tanstack/react-query';
import { bob } from './chains';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const wagmiConfig = createConfig({
  chains: [bob],
  transports: {
    [bob.id]: http(bob.rpcUrls.default.http[0]),
  },
  connectors: [metaMask()],
  ssr: true,
});
