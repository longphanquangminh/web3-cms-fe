import RPC from '../rpc/ethersRPC';
import { providerAtom, userAtom } from '@/atoms';
import { web3auth } from '@/constants';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useCheckClient } from './useCheckClient';

export const useAccount = () => {
  const [provider, setProvider] = useAtom(providerAtom);
  const [connectedAddress, setConnectedAddress] = useAtom(userAtom);

  const { isClient } = useCheckClient();

  const login = async () => {
    // IMP START - Login
    console.log('web3auth', web3auth);
    const web3authProvider = await web3auth.connect();
    // IMP END - Login
    console.log('reach 3');
    console.log('web3authProvider', web3authProvider);
    setProvider(web3authProvider);
    if (web3auth.connected) {
      console.log('reach 4');
      const address = await RPC.getAccounts(web3authProvider);
      console.log('address', address);
      setConnectedAddress(address);
    }
  };

  const logout = async () => {
    // IMP START - Logout
    await web3auth.logout();
    // IMP END - Logout
    setProvider(null);
    setConnectedAddress(null);
  };

  useEffect(() => {
    const init = async () => {
      try {
        // IMP START - SDK Initialization
        await web3auth.initModal();
        // IMP END - SDK Initialization
        console.log('reach 1');
        const newProvider = web3auth.provider;
        setProvider(newProvider);
        console.log('newProvider', newProvider);
        console.log('web3auth', web3auth);
        console.log('web3auth.connected', web3auth.connected);

        if (web3auth.connected) {
          console.log('reach 2');
          const address = await RPC.getAccounts(newProvider);
          console.log('address', address);
          setConnectedAddress(address?.toString() || '');
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (isClient) {
      init();
    }
  }, [isClient]);

  return {
    provider,
    connectedAddress,
    setProvider,
    setConnectedAddress,
    login,
    logout,
  };
};
