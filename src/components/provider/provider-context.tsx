import type { ConnectContextProviderProps } from './provider.types';
import { createContext } from '../../helpers/context';

export const [ConnectContextProvider, useConnectContext] =
  createContext<ConnectContextProviderProps>();
