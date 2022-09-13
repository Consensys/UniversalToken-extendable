import { Box, Button, CircularProgress, Container, Stack, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { ExtendableTokenProxy__factory } from '../ethers-contracts';
import useDynamicSetter from '../hooks/useDynamicSetter';
import useErrorAlert from '../hooks/useErrorAlert';
import { fetchNetworkDetails, metaMaskHooks } from '../networks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = metaMaskHooks;

type ExtensionData = {
    proxyAddress: string;
    logicAddress: string;
}

export default function ManageToken() {
    const { alertElement, showAlert } = useErrorAlert();
    const dynamicSet = useDynamicSetter();
    const provider = useProvider();
    const chainId = useChainId();

    const [token, setToken] = useState('')
    const [tokenLoading, setTokenLoading] = useState(false);
    const [tokenLoaded, setTokenLoaded] = useState(false);
    const [extensions, setExtensions] = useState<ExtensionData[]>([]);
    const [disableLoading, setDisableLoading] = useState(-1);
    const [removeLoading, setRemoveLoading] = useState(-1);
    const [extensionToAdd, setExtensionToAdd] = useState('');
    const [logicToUpgrade, setLogicToUpgrade] = useState('');
    const [extensionAddLoading, setExtensionAddLoading] = useState(false);
    const [logicUpgradeLoading, setLogicUpgradeLoading] = useState(false);


    const loadTokenData = async () => {
        try {
            if (!provider)
                return;

            setTokenLoading(true);

            const signer = provider.getSigner();
            if (!signer)
                return;

            const proxy = ExtendableTokenProxy__factory.connect(token, signer);

            const extensionList = await proxy.allExtensionsRegistered();

            let data: ExtensionData[] = []

            for (let i = 0; i < extensionList.length; i++) {
                data.push({
                    logicAddress: extensionList[i],
                    proxyAddress: await proxy.proxyAddressForExtension(extensionList[i])
                })
            }

            setExtensions(data);
            setTokenLoaded(true);
        } catch (e) {
            if ((e as string).includes('user rejected'))
                return;
            showAlert('An error has occured', e as string);
        } finally {
            setTokenLoading(false);
        }
    };

    const disableExtensionCallback = (extensionAddress: string, index: number) => {
        return async () => {
            try {
                if (!provider)
                    return;

                setDisableLoading(index);

                const signer = provider.getSigner();
                if (!signer)
                    return;

                const proxy = ExtendableTokenProxy__factory.connect(token, signer);

                const tx = await proxy.disableExtension(extensionAddress);
                await tx.wait(1);

                await loadTokenData();

                showAlert('Extension Disabled', 'The extension ' + extensionAddress + ' has been disabled');
            } catch (e) {
                if ((e as string).includes('user rejected'))
                    return;
                showAlert('An error has occured', e as string);
            } finally {
                setDisableLoading(-1);
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

    const removeExtensionCallback = (extensionAddress: string, index: number) => {
        return async () => {
            try {
                if (!provider)
                    return;

                setRemoveLoading(index);

                const signer = provider.getSigner();
                if (!signer)
                    return;

                const proxy = ExtendableTokenProxy__factory.connect(token, signer);

                const tx = await proxy.removeExtension(extensionAddress);
                await tx.wait(1);

                await loadTokenData();

                showAlert('Extension Removed', 'The extension ' + extensionAddress + ' has been removed');
            } catch (e) {
                if ((e as string).includes('user rejected'))
                    return;
                showAlert('An error has occured', e as string);
            } finally {
                setRemoveLoading(-1);
            }
        }
    }

    const addExtension = async () => {
        try {
            if (!provider)
                return;

            const signer = provider.getSigner();
            if (!signer)
                return;

            setExtensionAddLoading(true);

            const proxy = ExtendableTokenProxy__factory.connect(token, signer);

            const tx = await proxy.registerExtension(extensionToAdd);
            await tx.wait(1);

            await loadTokenData();

            showAlert('Extension Registered', 'The extension ' + extensionToAdd + ' has been registered onto the token');
        } catch (e) {
            if ((e as string).includes('user rejected'))
                return;
            showAlert('An error has occured', e as string);
        } finally {
            setExtensionAddLoading(false);
        }
    }

    const upgradeLogic = async () => {
        try {
            if (!provider)
                return;

            const signer = provider.getSigner();
            if (!signer)
                return;

            setLogicUpgradeLoading(true);

            const proxy = ExtendableTokenProxy__factory.connect(token, signer);

            const tx = await proxy.upgradeTo(logicToUpgrade, '0x');
            await tx.wait(1);

            await loadTokenData();

            showAlert('Token Upgraded', 'The token logic contract has been upgrade to ' + logicToUpgrade);
        } catch (e) {
            if ((e as string).includes('user rejected'))
                return;
            showAlert('An error has occured', e as string);
        } finally {
            setLogicUpgradeLoading(false);
        }
    }

    return (
        <Container>
            <Link to='/' className='back-btn'>
                <ArrowBackIcon fontSize='large' />
            </Link>
            {alertElement}
            <h1>Manage Extendable Token</h1>
            <br></br>
            <Stack direction="column" spacing={2} justifyContent='center'>
                <TextField id="address" label="Token Address" variant='filled' value={token} onChange={dynamicSet(setToken)} />

                <Box sx={{ m: 1, position: 'relative' }}>
                    <Button disabled={tokenLoading} onClick={loadTokenData} variant='contained' color='success'>Load Token</Button>
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
            </Stack>
            <br></br>
            <br></br>
            <br></br>

            {
                extensions.map((e, index) => (
                    <Stack direction="row" spacing={2} justifyContent='center'>
                        <h4 style={{marginTop: '10px'}}>{e.proxyAddress}</h4>
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button disabled={disableLoading == index} onClick={disableExtensionCallback(e.proxyAddress, index)} variant='contained' color='warning'>Disable Extension</Button>
                            {disableLoading == index && (
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
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button disabled={removeLoading == index} onClick={removeExtensionCallback(e.logicAddress, index)} variant='contained' color='error'>Remove Extension</Button>
                            {removeLoading == index && (
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
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button onClick={openBlockExplorerCallback(e.proxyAddress)} variant='contained' color='primary'>View on Block Explorer</Button>
                        </Box>
                    </Stack>
                ))
            }
            {
                    tokenLoaded && (
                        <Stack direction="column" spacing={2} justifyContent='center'>
                            <Stack direction="row" spacing={2} justifyContent='center'>
                                <TextField id="extAddress" label="Extension Address" variant='filled' value={extensionToAdd} onChange={dynamicSet(setExtensionToAdd)} />
                                <Box sx={{ m: 1, position: 'relative' }}>
                                    <Button disabled={extensionAddLoading} onClick={addExtension} variant='outlined' color='success'>Register Extension</Button>
                                    {extensionAddLoading && (
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
                                <TextField id="logicAddress" label="Logic Address" variant='filled' value={logicToUpgrade} onChange={dynamicSet(setLogicToUpgrade)} />
                                <Box sx={{ m: 1, position: 'relative' }}>
                                    <Button disabled={logicUpgradeLoading} onClick={upgradeLogic} variant='outlined' color='success'>Upgrade Logic Contract</Button>
                                    {logicUpgradeLoading && (
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
                    )
            }
            <br></br>
            <br></br>
            {
                tokenLoaded && (
                    <Button onClick={openBlockExplorerCallback(token)} variant='contained' color='success'>View on Block Explorer</Button>
                )
            }
        </Container>
    )
}