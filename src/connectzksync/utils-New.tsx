import { Contract, Wallet, Provider, types } from "zksync-ethers";
import * as ethers from "ethers";

// load env file
import dotenv from "dotenv";
dotenv.config();

// Greeter contract ABI for example
const ABI = [
  {
    inputs: [],
    name: "greet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string",
      },
    ],
    name: "setGreeting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// RPC endpoints
const L1_RPC_ENDPOINT = "https://rpc2.sepolia.org"; // Check chainlist.org
const L2_RPC_ENDPOINT = "https://sepolia.era.zksync.dev";

const WALLET_PRIV_KEY = process.env.WALLET_PRIVATE_KEY || "";

if (!WALLET_PRIV_KEY) {
  throw new Error("Wallet private key is not configured in env file");
}

// Example Greeter contract on ZKsync Sepolia Testnet
const L2_CONTRACT_ADDRESS = "0x543A5fBE705d040EFD63D9095054558FB4498F88"; 

async function main() {
  console.log(`Running script for L1-L2 transaction`);

  // Initialize the wallet.
  const l1provider = new Provider(L1_RPC_ENDPOINT);
  const l2provider = new Provider(L2_RPC_ENDPOINT);
  const wallet = new Wallet(WALLET_PRIV_KEY, l2provider, l1provider);

  // retrieve L1 gas price
  const l1GasPrice = await l1provider.getGasPrice();
  console.log(`L1 gasPrice ${ethers.formatEther(l1GasPrice)} ETH`);

  const contract = new Contract(L2_CONTRACT_ADDRESS, ABI, wallet);
  const msg = await contract.greet();
  console.log(`Message in contract is ${msg}`);

  const message = `Message sent from L1 at ${new Date().toUTCString()}`;
  let tx = await contract.setGreeting.populateTransaction(message);

  tx = {
    ...tx,
    from: wallet.address,
  }

  // call to RPC method zks_estimateGasL1ToL2 to estimate L2 gas limit
  const l1l2GasLimit = await l2provider.estimateGasL1(tx);
  console.log(`L2 gasLimit ${BigInt(l1l2GasLimit)}`);

  const baseCost = await wallet.getBaseCost({
    // L2 computation
    gasLimit: l1l2GasLimit,
    // L1 gas price
    gasPrice: l1GasPrice,
  });

  console.log(`Executing this transaction will cost ${ethers.formatEther(baseCost)} ETH`);

  const iface = new ethers.Interface(ABI);
  const calldata = iface.encodeFunctionData("setGreeting", [message]);

  const txReceipt = await wallet.requestExecute({
    contractAddress: L2_CONTRACT_ADDRESS,
    calldata,
    l2GasLimit: l1l2GasLimit,
    refundRecipient: wallet.address,
    overrides: {
      // send the required amount of ETH
      value: baseCost,
      gasPrice: l1GasPrice,
    },
  });

  console.log('txReceipt :>> ', txReceipt);
  console.log(`L1 tx hash is ${txReceipt.hash}`);
  console.log("🎉 Transaction sent successfully");
  txReceipt.wait(1);
}

main()
  .then()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });