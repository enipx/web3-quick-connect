import { useToast } from '@oreo-ui/web';
import { useEffect, useState } from 'react';

import { useModal } from './use-modal';
import { useConnectContext } from '../components/provider/provider-context';
import { WalletDetailsOptions } from '../components/provider/provider.types';
import { windowExistsHandler } from '../helpers/base';

export const usePhantom = () => {
  const toast = useToast();
  const modal = useModal();

  const { setConnectedWallet, setWallets } = useConnectContext();

  const [accounts, setAccounts] = useState<string>('');

  const [connected, setConnected] = useState(false);

  const getWindowSolana = () => {
    const solana = 'solana' in window ? (window.solana as any) : undefined;

    return solana;
  };

  const updateDetailsHandler = () => {
    const details: WalletDetailsOptions = {
      accounts,
      connected,
      initialize,
      wallet: 'phantom',
    };

    setConnectedWallet?.(details);

    setWallets?.((prev) => ({
      ...prev,
      phantom: details,
    }));
  };

  const connectedHandler = () => {
    modal.hide();

    toast.hideAll();

    toast.show({
      title: 'Connected 🎉',
      content: `Your wallet was connected successfully. 🚀`,
      colorScheme: 'green',
      variant: 'filled',
    });

    updateDetailsHandler();
  };

  const requestAccountsHandler = async (options: object) => {
    const solana = getWindowSolana();

    try {
      const response = await (solana as any).connect();

      const accounts = response.publicKey.toString();

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
    const solana = getWindowSolana();

    const accounts = solana.publicKey;

    if (accounts) {
      setAccounts(accounts.toString());
    }
  };

  const getConnectedHandler = async () => {
    const solana = getWindowSolana();

    setConnected(solana.isConnected);
  };

  const initialize = () => {
    const solana = getWindowSolana();

    if (solana && solana.isPhantom) {
      requestAccountsHandler({});
    } else {
      toast.show({
        title: 'Download Phantom Wallet!',
        content: `Please install phantom wallet first and try again`,
        colorScheme: 'blue',
        variant: 'filled',
      });
    }
  };

  useEffect(() => {
    if (windowExistsHandler()) {
      getAccountsHandler();
      getConnectedHandler();
    }
  }, []);

  useEffect(() => {
    updateDetailsHandler();
  }, [accounts]);

  return { accounts, connected, initialize };
};
