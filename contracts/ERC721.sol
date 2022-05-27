pragma solidity ^0.8.0;

import {ERC721Proxy} from "./tokens/proxy/ERC721/ERC721Proxy.sol";
import {RolesBase} from "./utils/roles/RolesBase.sol";

contract ERC721 is ERC721Proxy {
    constructor(
        string memory _name,
        string memory _symbol,
        bool _allowMint,
        bool _allowBurn,
        uint256 _maxSupply,
        address _owner,
        address _logicAddress
    )
        ERC721Proxy(
            _name,
            _symbol,
            _allowMint,
            _allowBurn,
            _maxSupply,
            _owner,
            _logicAddress
        )
    {}
}
