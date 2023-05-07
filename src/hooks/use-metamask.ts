import { useToast } from '@oreo-ui/web';
import { useEffect, useState } from 'react';

import { useModal } from './use-modal';
import { useConnectContext } from '../components/provider/provider-context';
import { WalletDetailsOptions } from '../components/provider/provider.types';
import { windowExistsHandler } from '../helpers/base';

export const useMetaMask = () => {
  const toast = useToast();
  const modal = useModal();

  const { setConnectedWallet, setWallets } = useConnectContext();

  const [accounts, setAccounts] = useState<string | string[]>('');

  const [chainId, setChainId] = useState('');

  const [connected, setConnected] = useState(false);

  const updateDetailsHandler = () => {
    const details: WalletDetailsOptions = {
      accounts,
      chainId,
      connected,
      initialize,
      wallet: 'metamask',
    };

    setConnectedWallet?.(details);

    setWallets?.((prev) => ({
      ...prev,
      metamask: details,
    }));
  };

  const connectedHandler = () => {
    modal.hide();

    toast.hideAll();

    toast.show({
      title: 'Connected 🎉',
      content: `You've successfully connected your wallet 🚀`,
      colorScheme: 'green',
      variant: 'filled',
    });

    updateDetailsHandler();
  };

  const getWindowEthereum = () => {
    const ethereum =
      'ethereum' in window ? (window.ethereum as any) : undefined;

    return ethereum;
  };

  const requestAccountsHandler = async () => {
    const ethereum = getWindowEthereum();

    try {
      const accounts = await (ethereum as any).request({
        method: 'eth_requestAccounts',
      });

      setAccounts(accounts);

      connectedHandler();
    } catch (error) {
      console.log(`Something went wrong`, error);

      toast.show({
        title: 'Something went wrong!',
        content: `An error occured, Please try again later`,
        colorScheme: 'red',
        variant: 'filled',
      });
    }
  };

  const getAccountsHandler = async () => {
    const ethereum = getWindowEthereum();

    const accounts = await (ethereum as any).request({
      method: 'eth_accounts',
    });

    const chainId = await ethereum.request({ method: 'eth_chainId' });

    ethereum.on('accountsChanged', (_accounts: string | string[]) => {
      setAccounts(_accounts);
    });

    if (accounts) {
      setAccounts(accounts);
    }

    ethereum.on('chainChanged', (id: string) => {
      setChainId(id);
    });

    if (chainId) {
      setChainId(chainId);
    }
  };

  const getConnectedHandler = async () => {
    const ethereum = getWindowEthereum();

    setConnected(ethereum.isConnected());
  };

  const initialize = () => {
    const ethereum = getWindowEthereum();

    if (!ethereum) {
      toast.show({
        title: 'Download Metamask!',
        content: `Please install metamask first and try again`,
        colorScheme: 'blue',
        variant: 'filled',
      });

      return;
    }

    requestAccountsHandler();
  };

  useEffect(() => {
    if (windowExistsHandler()) {
      getAccountsHandler();
      getConnectedHandler();
    }
  }, []);

  useEffect(() => {
    updateDetailsHandler();
  }, [accounts, chainId]);

  return { accounts, chainId, connected, initialize };
};
