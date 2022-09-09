import { Box, Button, Checkbox, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Stack, TextField } from '@mui/material';
import { ethers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import { AllowExtension__factory, BlockExtension__factory, CertificateValidatorExtension__factory, HoldExtension__factory, PauseExtension__factory, ERC20Logic__factory, ERC20__factory } from '../ethers-contracts';
import useDynamicSetter from '../hooks/useDynamicSetter';
import useErrorAlert from '../hooks/useErrorAlert';
import metamask from '../images/metamask.png';
import { metaMaskHooks, fetchNetworkDetails } from '../networks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = metaMaskHooks;

export default function DeployERC20() {
    const defaultOwners = useAccounts();
    const chainId = useChainId();
    const { alertElement, showAlert, showAlertWithButton } = useErrorAlert();
    const dynamicSet = useDynamicSetter();
    const provider = useProvider();
    
    const factory = new ERC20__factory(provider?.getSigner());
    const logicFactory = new ERC20Logic__factory(provider?.getSigner());

    const [name, setName] = useState('Example Token');
    const [symbol, setSymbol] = useState('EET');
    const [allowMint, setAllowMint] = useState(true);
    const [allowBurn, setAllowBurn] = useState(true);
    const [owner, setOwner] = useState(defaultOwners && defaultOwners.length > 0 ? defaultOwners[0] : '');
    const [initalSupply, setInitalSupply] = useState(100000000);
    const [maxSupply, setMaxSupply] = useState(1000000000);
    const [logicAddress, setLogicAddress] = useState('');
    const [logicLoading, setLogicLoading] = useState(false);
    const [tokenLoading, setTokenLoading] = useState(false);
    const [allowExtension, setAllowExtension] = useState('');
    const [blockExtension, setBlockExtension] = useState('');
    const [certificateValidatorExtension, setCertificateValidatorExtension] = useState('');
    const [holdExtension, setHoldExtension] = useState('');
    const [pauseExtension, setPauseExtension] = useState('');
    const [extLoading, setExtLoading] = useState(0);

    const deployExtensionCallback = (loadingIndex: number, extFactory: AllowExtension__factory | BlockExtension__factory | CertificateValidatorExtension__factory | HoldExtension__factory | PauseExtension__factory, setter: React.Dispatch<React.SetStateAction<string>>) => {
        return async () => {
            try {
                setExtLoading(loadingIndex);
                const ext = await extFactory.deploy();
                await ext.deployed();

                showAlert("Success", "A new extension contract has been deployed");
                setter(ext.address);
            } catch (e) {
                if ((e as string).includes('user rejected'))
                    return;
                showAlert('An error has occured', e as string);
            } finally {
                setExtLoading(0);
            }
        }
    }

    const openBlockExplorerCallback = (address: string) => {
        return () => {
            if (!chainId)
                return;
            
            // first get block explorer URL from current network
            const networkData = fetchNetworkDetails(chainId);
            if (networkData && networkData.blockExplorerUrls) {
                // Build URL
                const fullURL = networkData.blockExplorerUrls[0] + 'address/' + address;

                // Open new tab
                window.open(fullURL);
            }
        }
    }

    const deployLogicContract = async () => {
        try {
            setLogicLoading(true);
            const logic = await logicFactory.deploy();
            await logic.deployed();

            showAlertWithButton('Success', 'A new ERC20 logic contract has been deployed', "View on Block Explorer", openBlockExplorerCallback(logic.address));
            setLogicAddress(logic.address);
        } catch (e) {
            if ((e as string).includes('user rejected'))
                return;
            showAlert('An error has occured', e as string);
        } finally {
            setLogicLoading(false);
        }
    }

    const deployContract = async () => {
        try {
            setTokenLoading(true);
            const token = await factory.deploy(name, symbol, allowMint, allowBurn, owner, ethers.utils.parseUnits(initalSupply.toString()), ethers.utils.parseUnits(maxSupply.toString()), logicAddress);
            await token.deployed();

            if (allowExtension !== '') {
                const tx = await token.registerExtension(allowExtension);
                await tx.wait(1);
            }

            if (blockExtension !== '') {
                const tx = await token.registerExtension(blockExtension);
                await tx.wait(1);
            }

            if (certificateValidatorExtension !== '') {
                const tx = await token.registerExtension(certificateValidatorExtension);
                await tx.wait(1);
            }

            if (holdExtension !== '') {
                const tx = await token.registerExtension(holdExtension);
                await tx.wait(1);
            }

            if (pauseExtension !== '') {
                const tx = await token.registerExtension(pauseExtension);
                await tx.wait(1);
            }

            showAlertWithButton('Success', 'A ERC20 token contract has been deployed: ' + token.address, 'View on Block Explorer', openBlockExplorerCallback(token.address));
        } catch (e) {
            if ((e as string).includes && (e as string).includes('user rejected'))
                return;
            showAlert('An error has occured', e as string);
        } finally {
            setTokenLoading(false);
        }
    }

    return (
        <Container>
            <Link to='/deploy' className='back-btn'>
                <ArrowBackIcon fontSize='large' />
            </Link>
            {alertElement}
            <h1>Deploy ERC20 Extendable Token</h1>
            <br></br>
            <Stack direction="row" spacing={2} justifyContent='center'>
                <Stack direction="column" spacing={2} justifyContent='center'>
                    <TextField id="name" label="Token Name" variant='filled' value={name} onChange={dynamicSet(setName)} />
                    <TextField id="symbol" label="Token Symbol" variant='filled' value={symbol} onChange={dynamicSet(setSymbol)} />
                    <FormControlLabel label="Allow Token Mint" control={
                        <Checkbox checked={allowMint} onChange={dynamicSet(setAllowMint, true)} />} 
                    />
                    <FormControlLabel label="Allow Burn Mint" control={
                        <Checkbox checked={allowBurn} onChange={dynamicSet(setAllowBurn, true)} />} 
                    />
                </Stack>
                <Stack direction="column" spacing={2} justifyContent='center'>
                    <TextField id="owner" label="Token Owner" variant='filled' value={owner} onChange={dynamicSet(setOwner)} />
                    <TextField id="initalSupply" label="Inital Supply" variant='filled' value={initalSupply} onChange={dynamicSet(setInitalSupply)} />
                    <TextField id="maxSupply" label="Max Supply" variant='filled' value={maxSupply} onChange={dynamicSet(setMaxSupply)} />
                    <Stack direction="row" spacing={2} justifyContent='center'>
                        <TextField id="logicAddress" label="Logic Address" variant='filled' value={logicAddress} onChange={dynamicSet(setLogicAddress)} />
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button disabled={logicLoading} onClick={deployLogicContract} variant='outlined'>Deploy Logic Contract</Button>
                            {logicLoading && (
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
                    </Stack>
                </Stack>
            </Stack>
            
            <br></br>
            <br></br>
            <h2>Choose Token Extensions</h2>
            <br></br>
            <Stack direction="row" spacing={2} justifyContent='center'>
                <Stack direction="column" spacing={2} justifyContent='center'>
                    <Stack direction="row" spacing={2} justifyContent='center'>
                        <TextField id="allowExtension" label="Allow Extension Address" variant='filled' value={allowExtension} onChange={dynamicSet(setAllowExtension)} />
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button disabled={extLoading == 1} onClick={deployExtensionCallback(1, new AllowExtension__factory(provider?.getSigner()), setAllowExtension)} variant='outlined'>Deploy Allow Extension</Button>
                            {extLoading == 1 && (
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
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent='center'>
                        <TextField id="blockExtension" label="Block Extension Address" variant='filled' value={blockExtension} onChange={dynamicSet(setBlockExtension)} />
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button disabled={extLoading == 2} onClick={deployExtensionCallback(2, new BlockExtension__factory(provider?.getSigner()), setBlockExtension)} variant='outlined'>Deploy Block Extension</Button>
                            {extLoading == 2 && (
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
                    </Stack>
                </Stack>
                <Stack direction="column" spacing={2} justifyContent='center'>
                    <Stack direction="row" spacing={2} justifyContent='center'>
                        <TextField id="holdExtension" label="Hold Extension Address" variant='filled' value={holdExtension} onChange={dynamicSet(setHoldExtension)} />
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button disabled={extLoading == 4} onClick={deployExtensionCallback(4, new HoldExtension__factory(provider?.getSigner()), setHoldExtension)} variant='outlined'>Deploy Hold Extension</Button>
                            {extLoading == 4 && (
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
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent='center'>
                        <TextField id="pauseExtension" label="Pause Extension Address" variant='filled' value={pauseExtension} onChange={dynamicSet(setPauseExtension)} />
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button disabled={extLoading == 5} onClick={deployExtensionCallback(5, new PauseExtension__factory(provider?.getSigner()), setPauseExtension)} variant='outlined'>Deploy Pause Extension</Button>
                            {extLoading == 5 && (
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
                    </Stack>
                </Stack>
            </Stack>
            <br></br>
            <br></br>
            <Stack direction="row" spacing={2} justifyContent='center'>
                <TextField id="certificateValidatorExtension" label="Certificate Validator Extension Address" variant='filled' value={certificateValidatorExtension} onChange={dynamicSet(setCertificateValidatorExtension)} />
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Button disabled={extLoading == 3} onClick={deployExtensionCallback(3, new CertificateValidatorExtension__factory(provider?.getSigner()), setCertificateValidatorExtension)} variant='outlined'>Deploy Certificate Validator Extension</Button>
                    {extLoading == 3 && (
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
            </Stack>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Box sx={{ m: 1, position: 'relative' }}>
                <Button disabled={tokenLoading} onClick={deployContract} variant='contained' color='success'>Deploy Token</Button>
                {tokenLoading && (
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
    )
}