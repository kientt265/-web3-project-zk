import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { sepolia, arbitrum } from '@reown/appkit/networks';
import Main from './component/Main';
import NewHeader from './component/NewHeader'
import NewFooter from './component/NewFooter'


// Create a client
const queryClient = new QueryClient();

interface AppKitProviderProps {
  children: ReactNode;
}


const projectId = import.meta.env.VITE_PROJECT_ID;


const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://sepolia.etherscan.io', 
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};


export const networks = [sepolia, arbitrum];


const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  networks,
  projectId,
});


createAppKit({
  adapters: [wagmiAdapter],
  networks: [sepolia, arbitrum],
  metadata,
  projectId,
  features: {
    analytics: true, 
  },
});


export function AppKitProvider({ children }: AppKitProviderProps) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}



function App() {
  return (
    <>
      <NewHeader onLoginClick={() => console.log('Login clicked')} onSignUpClick={() => console.log('Sign up clicked')}/>
      <Main />
      <NewFooter/>
    </>
  );
}

export default App;
