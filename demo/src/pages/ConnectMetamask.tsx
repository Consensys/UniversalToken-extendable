import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import metamask from '../images/metamask.png';
import { Box, Container } from '@mui/system';
import { metaMaskHooks, metaMask, networks, fetchNetworkDetails } from '../networks';
import { Card, CircularProgress, ToggleButton, ToggleButtonGroup } from '@mui/material';

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = metaMaskHooks

export default function ConnectMetamask() {
    const [selectedNetwork, setSelectedNetwork] = useState(1);
    const isActivating = useIsActivating();
    const [loading, setLoading] = useState(false);

    const connectWallet = async () => {
        try {
            setLoading(true);
            await metaMask.activate(fetchNetworkDetails(selectedNetwork))
        } finally {
            setLoading(false);
        }
    };

    // attempt to connect eagerly on mount
    useEffect(() => {
        void metaMask.connectEagerly().catch(() => {
            console.debug('Failed to connect eagerly to metamask')
        })
    }, [])

    const handleSelectedNetworkChange = (
        event: React.MouseEvent<HTMLElement>,
        newNetwork: string | null,
    ) => {
        console.log("Selected network " + newNetwork);
        setSelectedNetwork(Number(newNetwork))
    };

    const isLoading = loading || isActivating;

    return (
        <Box display='flex'   
        justifyContent="center"
        alignItems="center"
        minHeight="100vh">
            <Card style={{paddingTop: '50px', paddingBottom: '50px'}}>
                <Container>
                    <img src={metamask} width="100px" />
                    <h3>To use this app, you must connect your Wallet</h3>
                    <ToggleButtonGroup
                        value={selectedNetwork}
                        exclusive
                        onChange={handleSelectedNetworkChange}
                    >
                        {
                            networks.map((n) => 
                                <ToggleButton value={n.chainId} key={n.chainId}>
                                    <img src={n.image} width="50px" style={{marginRight: '10px'}} />
                                    <h5>{n.chainName}</h5>
                                </ToggleButton>
                            )
                        }
                    </ToggleButtonGroup>
                    <br></br>
                    <br></br>
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Button disabled={isLoading} onClick={connectWallet} variant="contained">Connect Wallet</Button>
                        {isLoading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                color: '#2c56dd',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Box>
                </Container>
            </Card>
        </Box>
    )
}