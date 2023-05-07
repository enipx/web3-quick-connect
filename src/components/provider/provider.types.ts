import type { SetStateAction, Dispatch } from 'react';

import { WalletOptionsIDType } from '../../helpers/base';

export type WalletDetailsOptions = {
  accounts: string | string[];
  chainId?: string | null;
  connected: boolean;
  initialize: () => void;
  wallet?: WalletOptionsIDType;
};

export type AllWalletDetailsOptions = {
  [key in WalletOptionsIDType]?: WalletDetailsOptions;
};

export type ConnectProviderThemeType = {
  font?: string;
};

export interface ConnectProviderProps {
  children?: React.ReactNode;
  theme?: ConnectProviderThemeType;
}

export interface ConnectContextProviderProps {
  connect: () => void;
  close: () => void;
  wallets: AllWalletDetailsOptions;
  setWallets: Dispatch<SetStateAction<AllWalletDetailsOptions>>;
  connectedWallet?: WalletDetailsOptions;
  setConnectedWallet: Dispatch<
    SetStateAction<WalletDetailsOptions | undefined>
  >;
}
