import Web3 from 'web3';

const generateAccount = () => {
  const web3 = new Web3();
  web3.eth.accounts.wallet.create(1);
  console.log('My new key address:', web3.eth.accounts.wallet[0].address);
  console.log('Private key:', web3.eth.accounts.wallet[0].privateKey);
};

generateAccount();
