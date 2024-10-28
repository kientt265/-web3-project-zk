import { Provider, types, utils, Wallet } from "zksync-ethers";
import { ethers } from "ethers";

// async function getZkSyncProvider(zksync: typeof import('zksync'), networkName: string): Promise<Provider | undefined> {
//     let zkSyncProvider: Provider | undefined;
//     try {
//         zkSyncProvider = await zksync.getDefaultProvider(networkName);
//     } catch (error) {
//         console.log('Unable to connect to zkSync.');
//         console.error(error);
//     }

//     return zkSyncProvider;
// }
const provider = Provider.getDefaultProvider(types.Network.Sepolia);
// async function getEthereumProvider(ethers: typeof import('ethers'), networkName: string): Promise<providers.Provider | undefined> {
//     let ethersProvider: providers.Provider | undefined;
//     try {
//         // eslint-disable-next-line new-cap
//         ethersProvider = ethers.getDefaultProvider(networkName);
//     } catch (error) {
//         console.log('Could not connect to the network:', networkName);
//         console.error(error);
//     }
//     return ethersProvider;
// }
