import { defineChain } from 'viem';

export const bob = defineChain({
  id: 60_808,                // BOB Mainnet chainId 60808 :contentReference[oaicite:1]{index=1}
  name: 'BOB Mainnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.gobob.xyz'] },
    public:  { http: ['https://rpc.gobob.xyz'] },
  },
  blockExplorers: {
    default: { name: 'BOB Explorer', url: 'https://explorer.gobob.xyz' },
  },
});
