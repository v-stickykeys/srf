'use client';

import {PrivyProvider} from '@privy-io/react-auth';
import {opalChain} from '../utils/privy';

export default function LoginProvider({children}: {children: React.ReactNode}) {
  return (
    <PrivyProvider
      appId="clz4pofbe085z6wf2p673goje"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url',
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        defaultChain: opalChain,
        supportedChains: [opalChain],
      }}
    >
      {children}
    </PrivyProvider>
  );
}
