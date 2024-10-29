import { BrowserProvider, Provider, types, utils,  L1Signer, Signer } from "zksync-ethers";
import {  ethers } from "ethers";

//provider
const zksyncProvider: Provider = Provider.getDefaultProvider(types.Network.Sepolia);

//L1Signer

const provider = new ethers.BrowserProvider((window as any).ethereum);
const signerL1 = L1Signer.from(await provider.getSigner(), zksyncProvider);

//L2Signer

const browserProvider = new BrowserProvider((window as any).ethereum);
const signerL2 = Signer.from(await browserProvider.getSigner(), Number((await browserProvider.getNetwork()).chainId), Provider.getDefaultProvider(types.Network.Sepolia));



//deposit l1 signer
await signerL1.deposit({
    token: utils.ETH_ADDRESS,
    amount: 10_000_000n,
  });

await signerL1.requestExecute({
    contractAddress: await signerL1.providerL2.getMainContractAddress(),
    calldata: "0x",
    l2Value: 7_000_000_000,
  });
//Base cost
await signerL1.getBaseCost({ gasLimit: 100_000 })

//Claim failed deposit
const FAILED_DEPOSIT_HASH = "<FAILED_DEPOSIT_TX_HASH>";
const claimFailedDepositHandle = await signerL1.claimFailedDeposit(FAILED_DEPOSIT_HASH);

//Finalize withdraw
const WITHDRAWAL_HASH = "<WITHDRAWAL_TX_HASH>";
const finalizeWithdrawHandle = await signerL1.finalizeWithdrawal(WITHDRAWAL_HASH);

//withdraw L2
const tokenL2 = "0x6a4Fb925583F7D4dF82de62d98107468aE846FD1";
const withdrawTx = await signerL2.withdraw({
  token: utils.ETH_ADDRESS,
  amount: 10_000_000n,
});