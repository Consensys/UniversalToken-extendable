import React from 'react';
import ConnectMetamask from './pages/ConnectMetamask';
import { metaMaskHooks } from './networks';
import PageRouter from './PageRouter';
import { BrowserRouter } from 'react-router-dom';

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = metaMaskHooks;

export function ProviderEnforcer(props: any) {
    const isActive = useIsActive();

    return (
        <div className="App">
            {
                !isActive ? <ConnectMetamask /> 
                          : <BrowserRouter><PageRouter /></BrowserRouter>
            }
        </div>
    );
}