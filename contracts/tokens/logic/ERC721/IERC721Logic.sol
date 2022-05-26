pragma solidity ^0.8.0;

import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import {ITokenLogic} from "../ITokenLogic.sol";

/**
 * @notice Protected ERC721 token metadata stored in the proxy storage in a special storage slot.
 * Includes thing such as name, symbol and deployment options.
 * @dev This struct should only be written to inside the constructor and should be treated as readonly.
 * Solidity 0.8.7 does not have anything for marking storage slots as read-only, so we'll just use
 * the honor system for now.
 * @param initialized Whether this proxy is initialized
 * @param name The name of this ERC721 token. This is stored here as a backup (required for _domainName inside constructor)
 * @param symbol The symbol of this ERC721 token. This is stored here as a backup
 * @param maxSupply The max supply of token allowed
 * @param allowMint Whether minting is allowed
 * @param allowBurn Whether burning is allowed
 */
struct ERC721ProtectedTokenData {
    bool initialized;
    string name;
    string symbol;
    uint256 maxSupply;
    bool allowMint;
    bool allowBurn;
}

/**
 * @dev The storage slot that will be used to store the ProtectedTokenData struct inside
 * this TokenProxy
 */
bytes32 constant ERC721_TOKEN_META = keccak256("erc721.token.meta");

/**
 * @dev Returns the `ERC721ProtectedTokenData` stored within the current contract at the storage slot ERC721_TOKEN_META.
 */
// free functions have no visibility, tell solhint to ignore
// solhint-disable-next-line func-visibility
function _getProtectedTokenData()
    pure
    returns (ERC721ProtectedTokenData storage r)
{
    bytes32 slot = ERC721_TOKEN_META;
    assembly {
        r.slot := slot
    }
}

interface IERC721Logic is IERC721Metadata, ITokenLogic {
    function burn(uint256 amount) external returns (bool);
}
