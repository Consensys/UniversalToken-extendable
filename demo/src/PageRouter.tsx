import { Box, Card, Container } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ChooseAction from './pages/ChooseAction';
import DeployERC20 from './pages/DeployERC20';
import DeployERC721 from './pages/DeployERC721';
import ManageToken from './pages/ManageToken';
import DeployPickTokenType from './pages/DeployPickTokenType';

export default function PageRouter() {
    const location = useLocation();
    return (
        <Box display='flex'   
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        className='content'>
            <Container style={{position: 'relative'}}>
                        <Card style={{paddingTop: '50px', paddingBottom: '50px'}}>
                            <Routes>
                                <Route path='/deploy/erc20' element={<DeployERC20 />} />
                                <Route path='/deploy/erc721' element={<DeployERC721 />} />
                                <Route path='/deploy' element={<DeployPickTokenType />} />
                                <Route path='/manage' element={<ManageToken />} />
                                <Route path="/" element={<ChooseAction />} />
                            </Routes>
                        </Card>
            </Container>
        </Box>
    )
}