import { Box, Button, Card, Container, Stack } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import tokenOverview from '../images/lookupToken.png';
import deployToken from '../images/deployToken.png';
import CloseIcon from '@mui/icons-material/Close';

import { metaMaskHooks, metaMask, networks, fetchNetworkDetails } from '../networks';

export default function ChooseAction() {
    let navigate = useNavigate();

    const deployTokenClicked = () => {
        navigate('/deploy')
    };

    const manageTokenClicked = () => {
        navigate('/manage')
    }

    return (
        <Container>
            <h1>Select what you want to do</h1>

            <Stack direction="row" spacing={2} justifyContent='center'>
                <Button onClick={deployTokenClicked} variant='outlined' style={{padding: '30px'}}>
                    <Stack direction="column" spacing={2}>
                        <img src={deployToken} width='200px' />
                        <h3>Deploy Token</h3>
                    </Stack>
                </Button>
                <Button onClick={manageTokenClicked} variant='outlined' style={{padding: '30px'}}>
                    <Stack direction="column" spacing={2}>
                        <img src={tokenOverview} width='200px' />
                        <h3>Manage Deployed Token</h3>
                    </Stack>
                </Button>
            </Stack>
        </Container>
    )
}