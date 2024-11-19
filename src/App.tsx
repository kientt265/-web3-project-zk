import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider, useAccount } from 'wagmi';
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { sepolia, arbitrum } from '@reown/appkit/networks';
import {BrowserRouter as Router} from "react-router-dom"
import Main from './component/Main';
import NewHeader from './component/NewHeader'
import NewFooter from './component/NewFooter'
import ProfilePatient from './component/ProfilePatient';
import SnarkjsProof from './component/SnarkjsProof'
import { Address } from 'viem';

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
  const { address, connector }: { address: Address | undefined; connector: any } = useAccount();

  return (
    <>
    {/* <Router>
      <NewHeader onLoginClick={() => console.log('Login clicked')} onSignUpClick={() => console.log('Sign up clicked')} onHomeClick={() => console.log('Home')} />
      <Main />
      <NewFooter/>
    </Router> */}
     <SnarkjsProof signer={connector?.getSigner()} />
    </>

  );
}

export default App;
