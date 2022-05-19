pragma solidity ^0.8.0;

import {ERC721Proxy} from "./tokens/proxy/ERC721/ERC721Proxy.sol";
import {RolesBase} from "./utils/roles/RolesBase.sol";

contract ERC721 is ERC721Proxy {
    constructor(
        string memory name_,
        string memory symbol_,
        bool allowMint,
        bool allowBurn,
        uint256 maxSupply,
        address owner,
        address logicAddress
    )
        ERC721Proxy(
            name_,
            symbol_,
            allowMint,
            allowBurn,
            maxSupply,
            owner,
            logicAddress
        )
    {}
}
