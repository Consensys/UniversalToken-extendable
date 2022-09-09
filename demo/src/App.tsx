import React from 'react';
import './App.css';
import { ProviderEnforcer } from './ProviderEnforcer';
import { Web3ReactProvider } from '@web3-react/core';
import { connectors } from './networks';
import { Web3Provider } from '@ethersproject/providers'

function getLibrary(provider: any): Web3Provider {
  return new Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
}

function App() {
  return (
    <Web3ReactProvider connectors={connectors}>
      <ProviderEnforcer />
    </Web3ReactProvider>
  );
}

export default App;
