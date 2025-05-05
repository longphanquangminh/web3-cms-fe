import { Permit } from 'permitio';
import { IAdapter, WEB3AUTH_NETWORK, getEvmChainConfig } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { Web3Auth, Web3AuthOptions } from '@web3auth/modal';
import { getDefaultExternalAdapters } from '@web3auth/default-evm-adapter';
import { algoliasearch } from 'algoliasearch';

const ALGOLIA_APPLICATION_ID = import.meta.env.VITE_ALGOLIA_APPLICATION_ID;
const ALGOLIA_API_KEY = import.meta.env.VITE_ALGOLIA_API_KEY;

// IMP START - Dashboard Registration
const clientId = import.meta.env.VITE_WEB3_AUTH_CLIENT_ID; // get from https://dashboard.web3auth.io
const chainId = 0xaa36a7; // Sepolia testnet
// IMP END - Dashboard Registration

// IMP START - Chain Config
// Get custom chain configs for your chain from https://web3auth.io/docs/connect-blockchain
const chainConfig = getEvmChainConfig(chainId, clientId)!;
// IMP END - Chain Config

// IMP START - SDK Initialization
const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthOptions: Web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
};

export const web3auth = new Web3Auth(web3AuthOptions);
// IMP END - SDK Initialization

// IMP START - Configuring External Wallets
export const adapters = getDefaultExternalAdapters({ options: web3AuthOptions });
adapters.forEach((adapter: IAdapter<unknown>) => {
  web3auth.configureAdapter(adapter);
});
// IMP END - Configuring External Wallets

export const algoliaClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY);
