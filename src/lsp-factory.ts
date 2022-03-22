import { LSPFactory } from '@lukso/lsp-factory.js';
import 'dotenv/config';
import Web3 from 'web3';

const web3 = new Web3();

const deployKey = process.env.PRIVATE_KEY; // Private key of the account which will deploy UPs
const provider = 'https://rpc.l14.lukso.network'; // RPC url used to connect to the network
const chainId = 22; // Chain Id of the network you want to connect to

const myEOA = web3.eth.accounts.privateKeyToAccount(deployKey);

const lspFactory = new LSPFactory(provider, {
  deployKey,
  chainId,
});

// @ts-ignore
const main = async () => {
  // https://docs.lukso.tech/tools/lsp-factoryjs/classes/lsp3-universal-profile#deploy
  const receipt = await lspFactory.LSP3UniversalProfile.deploy(
    {
      controllerAddresses: [myEOA.address],
      lsp3Profile: {
        name: 'Test',
        description: 'Cool',
      },
    },
    {
      uploadOptions: {
        ipfsClientOptions: {
          host: 'ipfs.infura.io',
          port: 5001,
          protocol: 'https',
        },
      },
    },
  );

  console.log(receipt);
};

const lsp4 = async () => {
  const receipt = await lspFactory.LSP7DigitalAsset.deploy({
    name: 'My token',
    symbol: 'TKN',
    controllerAddress: myEOA.address,
    creators: [myEOA.address],
    isNFT: true,
  });

  console.log(receipt);

  console.log(
    // @ts-ignore
    `You can debug this deployment at: https://erc725-inspect.lukso.tech/inspect?address=${receipt.LSP7DigitalAsset.address}`,
  );
};

lsp4();
