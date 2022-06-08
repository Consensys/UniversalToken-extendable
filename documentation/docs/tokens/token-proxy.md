## Extendable Token Proxy

The `ExtendableTokenProxy` is the smart contract responsible for managing both the [EIP1967 Proxy](https://eips.ethereum.org/EIPS/eip-1967) logic as well as the extension registration/execution logic. This contract also has functions to manage roles through the `TokenRoles` contract. 

This is the contract you must inherit from to build custom token implementations. The repo comes with both `ERC20.sol` and `ERC721.sol` implementations.

# Building a custom token

To build a custom token implementation, you must inherit from the `ExtendableTokenProxy` contract

    pragma solidity ^0.8.0;

    import {ExtendableTokenProxy} from "@consensys-software/UniversalToken-extendable/tokens/proxy/ExtendableTokenProxy.sol";

    contract CustomERC20 is ExtendableTokenProxy {
        constructor(
            string memory _name,
            string memory _symbol,
            address _owner,
            address _logicAddress
        )
        ExtendableTokenProxy(
            abi.encode(_name, _symbol),
            _logicAddress,
            _owner
        )
        {
            // Allocate an array of function selectors to protect
            bytes4[] memory _protectedFunctions = new bytes4[](6);

            _protectedFunctions[0] = IERC20.totalSupply.selector;
            _protectedFunctions[1] = IERC20.balanceOf.selector;
            _protectedFunctions[2] = IERC20.transfer.selector;
            _protectedFunctions[3] = IERC20.transferFrom.selector;
            _protectedFunctions[4] = IERC20.approve.selector;
            _protectedFunctions[5] = IERC20.allowance.selector;

            // Mark the ERC20 standard functions as protected, meaning extensions cannot override them
            _protectFunctions(_protectedFunctions);

            //Update the doamin seperator now that
            //we've setup everything
            _updateDomainSeparator();
            // ... constructor logic ...
        }

