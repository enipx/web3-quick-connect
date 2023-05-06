import React from 'react';

import { ConnectProvider } from '../src/components/provider/';

export const decorators = [
  (Story) => (
    <ConnectProvider>
      <Story />
    </ConnectProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}