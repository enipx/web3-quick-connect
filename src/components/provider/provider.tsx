import { Modal, OreoProvider, useDisclosure } from '@oreo-ui/web';
import React, { useState } from 'react';

import { ConnectContextProvider, useConnectContext } from './provider-context';
import type {
  AllWalletDetailsOptions,
  ConnectContextProviderProps,
  ConnectProviderProps,
  WalletDetailsOptions,
} from './provider.types';
import { DefaultTheme } from '../../helpers/base';
import { ConnectModalContent } from '../modal';

const ConnectProviderContent = (props: ConnectProviderProps) => {
  const { children } = props;

  const [isOpen, handler] = useDisclosure(false);

  const [connectedWallet, setConnectedWallet] = useState<
    WalletDetailsOptions | undefined
  >(undefined);

  const [wallets, setWallets] = useState<AllWalletDetailsOptions>({
    metamask: undefined,
    phantom: undefined,
    coinbase: undefined,
    walletconnect: undefined,
  });

  const connect = () => {
    // connect to a wallet
    handler.open();
  };

  const value: ConnectContextProviderProps = {
    connect,
    close: handler.close,
    wallets,
    setWallets,
    connectedWallet,
    setConnectedWallet,
  };
  return (
    <ConnectContextProvider value={value}>
      {children}
      <Modal
        isOpen={isOpen}
        onClose={handler.close}
        removeContentMargin
        removeContentPadding
        hideCloseButton
        size="xs"
        borderRadius="0.75rem"
        border="1px solid rgba(255,255,255,0.1)">
        <ConnectModalContent />
      </Modal>
    </ConnectContextProvider>
  );
};

export const ConnectProvider = (props: ConnectProviderProps) => {
  const { theme: _theme } = props;

  const theme = {
    fonts: {
      body: _theme?.font || DefaultTheme.font,
      headings: _theme?.font || DefaultTheme.font,
    },
  };

  return (
    <OreoProvider {...({ theme } as any)}>
      <ConnectProviderContent {...props} />
    </OreoProvider>
  );
};

export const useConnect = useConnectContext;
