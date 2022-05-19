// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC20Proxy} from "./tokens/proxy/ERC20/ERC20Proxy.sol";
import {RolesBase} from "./utils/roles/RolesBase.sol";

/**
 * @title ERC20 extendable token
 * @author Eddie Penta
 * @notice You can use this contract to deploy an extendable ERC20 token
 * @dev All inherited functions are called by using the convention: ContractName.functionToCall()
 */
contract ERC20 is ERC20Proxy {
    uint256 public initalSupply;

    /**
     * @notice Deploy a new ERC20 Token with a given token logic contract and initial supply
     * @dev Constructor takes the ERC20 logic contract address, important for proper functioning
     * @param _name Documentation available in parent contract
     * @param _symbol Documentation available in parent contract
     * @param _allowMint Documentation available in parent contract
     * @param _allowBurn Documentation available in parent contract
     * @param _owner Documentation available in parent contract
     * @param _initalSupply Initial token supply to mint
     * @param _maxSupply Documentation available in parent contract
     * @param _logicAddress Documentation available in parent contract
     */
    constructor(
        string memory _name,
        string memory _symbol,
        bool _allowMint,
        bool _allowBurn,
        address _owner,
        uint256 _initalSupply,
        uint256 _maxSupply,
        address _logicAddress
    )
        ERC20Proxy(
            _name,
            _symbol,
            _allowMint,
            _allowBurn,
            _owner,
            _maxSupply,
            _logicAddress
        )
    {
        initalSupply = _initalSupply;

        if (_owner != _msgSender()) {
            //Temporaroly add minter role to msg.sender
            //If the sender is not the final owner
            RolesBase._addRole(_msgSender(), TOKEN_MINTER_ROLE);
        }

        _mint(_owner, initalSupply);

        if (_owner != _msgSender()) {
            //Remove after mint is complete
            //If the sender is not the final owner
            RolesBase._removeRole(_msgSender(), TOKEN_MINTER_ROLE);
        }
    }
}