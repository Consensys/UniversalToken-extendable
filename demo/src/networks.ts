import ethereumLogo from './images/ethereum.jpg';
import testnet from './images/testnet.png';
import polygon from './images/polygon.png';
import avalanche from './images/avalanche.svg';
import arbitrum from './images/arbitrum.svg';
import optimism from './images/optimism.png';
import { initializeConnector, Web3ReactHooks } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { AddEthereumChainParameter } from '@web3-react/types';

export interface NetworkInfo extends AddEthereumChainParameter {
  image: string
};

export const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>((actions) => new MetaMask({ actions }))

export const connectors: [MetaMask, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
]

export const networks: NetworkInfo[] = [
    {
      image: ethereumLogo,
      chainId: 1,
      chainName: 'Ethereum Mainnet',
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
      },
      rpcUrls: [
        'https://main-rpc.linkpool.io',
        'wss://eth-mainnet.nodereal.io/ws/v1/1659dfb40aa24bbb8153a677b98064d7',
        'https://eth-mainnet.public.blastapi.io'
      ],
      blockExplorerUrls: [
        'https://etherscan.io/'
      ]
    },
    {
        image: avalanche,
        chainId: 43114,
        chainName: 'Avalanche Network',
        nativeCurrency: {
          name: 'AVAX',
          symbol: 'AVAX',
          decimals: 18
        },
        rpcUrls: [
          'https://api.avax.network/ext/bc/C/rpc',
        ],
        blockExplorerUrls: [
          'https://snowtrace.io/'
        ]
    },
    {
        image: polygon,
        chainId: 137,
        chainName: 'Polygon Mainnet',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18
        },
        rpcUrls: [
          'https://polygon-rpc.com/',
        ],
        blockExplorerUrls: [
          'https://polygonscan.com/'
        ]
    },
    {
        image: arbitrum,
        chainId: 42161,
        chainName: 'Arbitrum One',
        nativeCurrency: {
          name: 'ETH',
          symbol: 'ETH',
          decimals: 18
        },
        rpcUrls: [
          'https://arb1.arbitrum.io/rpc',
        ],
        blockExplorerUrls: [
          'https://arbiscan.io/'
        ]
    },
    {
        image: optimism,
        chainId: 10,
        chainName: 'Optimism',
        nativeCurrency: {
          name: 'ETH',
          symbol: 'ETH',
          decimals: 18
        },
        rpcUrls: [
          'https://mainnet.optimism.io',
        ],
        blockExplorerUrls: [
          'https://optimistic.etherscan.io/'
        ]
    },
    {
        image: testnet,
        chainId: 4,
        chainName: 'Rinkeby Testnet',
        nativeCurrency: {
          name: 'ETH',
          symbol: 'ETH',
          decimals: 18
        },
        rpcUrls: [
          'https://rpc.ankr.com/eth_rinkeby',
          'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        ],
        blockExplorerUrls: [
          'https://rinkeby.etherscan.io/'
        ]
    },
    {
        image: testnet,
        chainId: 5,
        chainName: 'Görli Testnet',
        nativeCurrency: {
          name: 'ETH',
          symbol: 'ETH',
          decimals: 18
        },
        rpcUrls: [
          'https://eth-goerli.public.blastapi.io',
          'https://rpc.ankr.com/eth_goerli',
        ],
        blockExplorerUrls: [
          'https://goerli.etherscan.io/'
        ]
    },
]

export function fetchNetworkDetails(chainId: number): AddEthereumChainParameter | undefined {
  // Partial required for delete
  const network = networks.find((n) => n.chainId === chainId);

  if (network) {
    const networkParameters = structuredClone(network) as Partial<NetworkInfo>
    delete networkParameters.image;  // Not support in MetaMask add_network RPC
    return networkParameters as AddEthereumChainParameter; // Down cast
  }
}