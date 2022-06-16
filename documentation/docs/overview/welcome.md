# Universal Token

The Universal Token is a smart-contract framework for creating customisable tokens. Tokens created following the framework are composed of a token contract to which one or multiple Extension contracts can be connected. 

The Universal Token is compatible with Ethereum’s most used token standards including ERC20 and ERC721; with potential support for ERC1155 or ERC1400  

Extensions, deployed on-chain, are reusable across token deployments and standards. 

Extensions can do the following:

* Add external (user-facing) functions to your token.
* Store additional data for your token.
* Listen for token events on-chain such as transfers and approvals.
    - This enables custom functionality for token transfers and other token releated events.

Using the Universal Token API, developers can deploy smart contract extensions. Token contracts can then plug-and-play these extensions, either at token deployment or in real-time on-chain. 

If you want to jump straight into extension building, head over to the [Extensions](/extensions/getting-started) page.

## Token standards supported

Currently both [ERC20](https://github.com/ConsenSys/UniversalToken-extendable/blob/main/contracts/ERC20.sol) and [ERC721](https://github.com/ConsenSys/UniversalToken-extendable/blob/main/contracts/ERC721.sol) have implementations that support extensions. There are plans to add support for [ERC1400](https://github.com/ethereum/eips/issues/1411) and [ERC1155](https://eips.ethereum.org/EIPS/eip-1155). 


    


