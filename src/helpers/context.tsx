import React from 'react';

export interface ProviderProps {
  /**
   * item content
   */
  children?: React.ReactNode;

  value?: any;
}

export function createContext<ContextValueTypes>() {
  const ProviderContext = React.createContext<ContextValueTypes>(
    {} as ContextValueTypes
  );

  const useContext = () => {
    const value = React.useContext(ProviderContext);

    return value;
  };

  const Provider = (props: ProviderProps) => {
    const { value, children } = props;

    return (
      <ProviderContext.Provider value={value}>
        {children}
      </ProviderContext.Provider>
    );
  };

  return [Provider, useContext] as const;
}
