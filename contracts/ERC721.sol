pragma solidity ^0.8.0;

import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC721Extendable} from "./IERC721Extendable.sol";
import {_getProtectedTokenData, ERC721ProtectedTokenData} from "./tokens/logic/ERC721/IERC721Logic.sol";
import {TokenStandard, TransferData} from "./tokens/IToken.sol";
import {ExtendableTokenProxy} from "./tokens/proxy/ExtendableTokenProxy.sol";
import {ERC721TokenInterface} from "./tokens/registry/ERC721TokenInterface.sol";
import {TokenProxy} from "./tokens/proxy/TokenProxy.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract ERC721 is ExtendableTokenProxy, ERC721TokenInterface {
    constructor(
        string memory name_,
        string memory symbol_,
        bool allowMint,
        bool allowBurn,
        uint256 maxSupply_,
        address owner,
        address logicAddress
    )
        ExtendableTokenProxy(
            abi.encode(name_, symbol_, allowMint, allowBurn, maxSupply_),
            logicAddress,
            owner
        )
    {
        bytes4[] memory _protectedFunctions = new bytes4[](23);

        _protectedFunctions[0] = IERC721Extendable.totalSupply.selector;
        _protectedFunctions[1] = IERC721Extendable.mintingAllowed.selector;
        _protectedFunctions[2] = IERC721Extendable.burningAllowed.selector;
        _protectedFunctions[3] = IERC721Extendable.burn.selector;
        _protectedFunctions[4] = IERC721Extendable.tokenOfOwnerByIndex.selector;
        _protectedFunctions[5] = IERC721Extendable.tokenByIndex.selector;
        _protectedFunctions[6] = IERC721Extendable.mint.selector;
        _protectedFunctions[7] = IERC721Extendable.mintAndSetTokenURI.selector;
        _protectedFunctions[8] = IERC721Extendable.setTokenURI.selector;
        _protectedFunctions[9] = IERC721Extendable.setContractURI.selector;
        _protectedFunctions[10] = IERC721Extendable.contractURI.selector;
        _protectedFunctions[11] = IERC721Metadata.name.selector;
        _protectedFunctions[12] = IERC721Metadata.symbol.selector;
        _protectedFunctions[13] = IERC721Metadata.tokenURI.selector;
        _protectedFunctions[14] = IERC721.balanceOf.selector;
        _protectedFunctions[15] = IERC721.ownerOf.selector;
        _protectedFunctions[16] = _functionSigToSelector(
            "safeTransferFrom(address,address,uint256,bytes)"
        );
        _protectedFunctions[17] = _functionSigToSelector(
            "safeTransferFrom(address,address,uint256)"
        );
        _protectedFunctions[18] = IERC721.transferFrom.selector;
        _protectedFunctions[19] = IERC721.approve.selector;
        _protectedFunctions[20] = IERC721.setApprovalForAll.selector;
        _protectedFunctions[21] = IERC721.getApproved.selector;
        _protectedFunctions[22] = IERC721.isApprovedForAll.selector;

        _protectFunctions(_protectedFunctions);

        //Update the doamin seperator now that
        //we've setup everything
        _updateDomainSeparator();
    }

    function _domainName()
        internal
        view
        virtual
        override
        returns (bytes memory)
    {
        string memory name;
        if (_isInsideConstructorCall()) {
            //_staticDelegateCall doesn't work inside the constructor
            //See if we can grab from the storage slot ERC721Logic uses
            name = _getProtectedTokenData().name;
        } else {
            (, bytes memory result) = TokenProxy._staticDelegateCall(
                abi.encodeWithSelector(IERC721Metadata.name.selector)
            );

            name = _safeBytesToString(result);
        }
        return bytes(name);
    }

    function tokenStandard() external pure override returns (TokenStandard) {
        return TokenStandard.ERC721;
    }
}
