import { http } from 'wagmi';
import { QueryClient } from '@tanstack/react-query';
import { bob } from './chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const wagmiConfig = getDefaultConfig({
  appName: 'On-Chain Journal',
  // TODO: Replace with your own WalletConnect project ID
  projectId: 'a8024e8269d39a3209803649ac5d1842',
  chains: [bob],
  transports: {
    [bob.id]: http(bob.rpcUrls.default.http[0]),
  },
  ssr: true,
});
