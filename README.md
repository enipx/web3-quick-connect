# Web3 Quick Connect

Quick & easy way to connect to modern Ethereum dApps⚡

## Installation

Install dependencies:

```sh
$ yarn add @web3-quick-connect @oreo-ui/web styled-components

# or

$ npm i  @web3-quick-connect @oreo-ui/web styled-components
```

## Usage

Once you have installed the dependencies, the next step is to wrap your application root with the `ConnectProvider`, like below.

```jsx
import { ConnectProvider } from "web3-quick-connect"

export default function App() {
  return <ConnectProvider>{children}</ConnectProvider>
}
```

Great! You're all set. You can now use this throughout your application.

```jsx
import { useConnect } from 'web3-quick-connect';

function Example() {
  const { connect, connectedWallet } = useConnect();

  return <Button onClick={connect} text="Connect">
}
```

## Props

- `connect`: method loads the connect modal.
- `close`: method closes the connect modal.
- `connectedWallet`: contains all the information about the currently connected wallet.
- `wallets`:  contains information about all supported wallets and it details, if available.

## License

MIT ©
