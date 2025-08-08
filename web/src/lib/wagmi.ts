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
  projectId: '6c3b0bc57aeed2aaaa83593adadec525',
  chains: [bob],
  transports: {
    [bob.id]: http(bob.rpcUrls.default.http[0]),
  },
  ssr: true,
});
