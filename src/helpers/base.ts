import { ConnectProviderThemeType } from '../components/provider/provider.types';

export type WalletOptionsIDType =
  | 'metamask'
  | 'phantom'
  | 'coinbase'
  | 'walletconnect';

export type WalletOptionsType = {
  id: WalletOptionsIDType;
  name: string;
  icon: string;
  disabled?: boolean;
};

export const DefaultTheme: ConnectProviderThemeType = {
  font: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

export const SupportedWalletIcons: { [key in WalletOptionsIDType]: string } = {
  coinbase:
    'https://res.cloudinary.com/dmsic9qmj/image/upload/v1683451138/web3/coinbase.svg',
  metamask:
    'https://res.cloudinary.com/dmsic9qmj/image/upload/v1683451166/web3/metamask.svg',
  walletconnect:
    'https://res.cloudinary.com/dmsic9qmj/image/upload/v1683451154/web3/walletconnect.svg',
  phantom:
    'https://res.cloudinary.com/dmsic9qmj/image/upload/v1683451328/web3/phantom.svg',
};

export const SupportedWalletOptions: WalletOptionsType[] = [
  {
    id: 'metamask',
    name: 'Metamask',
    icon: SupportedWalletIcons.metamask,
  },
  {
    id: 'phantom',
    name: 'Phantom Wallet',
    icon: SupportedWalletIcons.phantom,
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: SupportedWalletIcons.coinbase,
    disabled: true,
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: SupportedWalletIcons.walletconnect,
    disabled: true,
  },
];

export const windowExistsHandler = () => {
  const windowExists = typeof window !== 'undefined' && window.document;

  return !!windowExists;
};

export const truncateWalletHandler = (address?: string) => {
  const first = (address || '').substring(0, 6);
  const last = (address || '').slice(-6);

  return `${first}.....${last}`;
};
