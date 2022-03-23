import { LSPFactory } from '@lukso/lsp-factory.js';
import 'dotenv/config';
import Web3 from 'web3';

const web3 = new Web3();

const deployKey = process.env.PRIVATE_KEY; // Private key of the account which will deploy UPs
const provider = 'https://rpc.l14.lukso.network'; // RPC url used to connect to the network
const chainId = 22; // Chain Id of the network you want to connect to

const myEOA = web3.eth.accounts.privateKeyToAccount(deployKey);

console.log(`Deploying from: ${myEOA.address}`);
console.log(
  `https://blockscout.com/lukso/l14/address/${myEOA.address}/transactions`,
);

const lspFactory = new LSPFactory(provider, {
  deployKey,
  chainId,
});

// @ts-ignore
const testCustomIpfs = async () => {
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

// @ts-ignore
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

const reuseURD = async () => {
  console.log('Deploy with URD reuse');
  const receipt = await lspFactory.LSP3UniversalProfile.deploy(
    {
      controllerAddresses: ['0xb74a88C43BCf691bd7A851f6603cb1868f6fc147'],
      lsp3Profile: {
        name: 'My Universal Profile',
        description: 'Demo Universal Profile',
        tags: ['public-profile'],
        links: [{ title: 'LUKSO Docs', url: 'https://docs.lukso.tech' }],
      },
    },
    {
      UniversalReceiverDelegate: {
        deployProxy: true,
        libAddress: '0x6533158b042775e2FdFeF3cA1a782EFDbB8EB9b1',
      },
    },
  );

  console.log(receipt);

  console.log(
    // @ts-ignore
    `You can debug this deployment at: https://erc725-inspect.lukso.tech/inspect?address=${receipt.LSP7DigitalAsset.address}`,
  );
};

reuseURD();
