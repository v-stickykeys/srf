import {defineChain} from 'viem';
import { OPAL_NETWORK_ID, OPAL_EXPLORER_URL } from '../constants';

export const opalChain = defineChain({
  id: OPAL_NETWORK_ID,
  name: 'Opal by Unique',
  network: 'opal',
  nativeCurrency: {
    decimals: 18,
    name: 'OPL',
    symbol: 'OPL',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-opal.unique.network'],
      webSocket: ['wss://ws-opal.unique.network'],
    },
  },
  blockExplorers: {
    default: {name: 'Explorer', url: OPAL_EXPLORER_URL},
  },
  testnet: true,
});

// export const opal: Chain = {
//   id: 8882,
//   name: 'Opal testnet',
//   nativeCurrency: { name: 'UNQ', symbol: 'UNQ', decimals: 18 },
//   rpcUrls: {
//     default: { http: ['https://rpc-opal.unique.network/'] },
//   },
//   blockExplorers: {
//     default: { name: 'unq', url: 'https://uniquescan.io/' }
//   }
// };
// export const config = createConfig({
//   chains: [opal],
//   transports: {
//     [opal.id]: http(),
//   },
// });
