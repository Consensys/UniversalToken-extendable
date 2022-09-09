import { Button, Container, Stack } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function DeployPickTokenType() {
    let navigate = useNavigate();

    const deployERC20 = () => {
        navigate('/deploy/erc20')
    };

    const deployERC721 = () => {
        navigate('/deploy/erc721')
    }

    return (
        <Container>
            <Link to='/' className='back-btn'>
                <ArrowBackIcon fontSize='large' />
            </Link>
            <h2>Select the token standard to deploy</h2>

            <Stack direction="row" spacing={2} justifyContent='center'>
                <Button onClick={deployERC20} variant='outlined'>
                    <Stack direction="column" spacing={2}>
                        <h3>ERC-20</h3>
                    </Stack>
                </Button>
                <Button onClick={deployERC721} variant='outlined'>
                    <Stack direction="column" spacing={2}>
                        <h3>ERC-721</h3>
                    </Stack>
                </Button>
            </Stack>
        </Container>
    )
}