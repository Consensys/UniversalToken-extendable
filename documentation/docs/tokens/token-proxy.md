## Extendable Token Proxy

The `ExtendableTokenProxy` is the smart contract responsible for managing both the [EIP1967 Proxy](https://eips.ethereum.org/EIPS/eip-1967) logic as well as the extension registration/execution logic. This contract also has functions to manage roles through the `TokenRoles` contract. 

This is the contract you must inherit from to build custom token implementations. The repo comes with both `ERC20.sol` and `ERC721.sol` implementations.

# Building a custom token

To build a custom token implementation, you must inherit from the `ExtendableTokenProxy` contract. The `ExtendableTokenProxy` contract requires that you 

1. Invoke its constructor with the following arguments
    - ABI encoded initialization data to send to logic contract's `_onInitialize` function. This data usually comes from the constructor arguments
2. Protect any token standard functions so extensions don't override them with their own functions
    - This can be done with the `protectFunction(bytes4)` function or the `protectFunctions(bytes4[])` function.
3. Implement the `function _domainName() internal override view returns(bytes memory)` function.
    - This function is used for building the [EIP712](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator) domain separator and should return a unique bytes. For example this can be the token name
4. Implement the `function tokenStandard() external pure override returns (TokenStandard)`
    - This function should return the token standard this contract implements
    - This function is a pure function, so it shouldn't rely on storage or any input for its return value

## Example ERC20 implementation

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


            // ... constructor logic ...


            //Update the doamin seperator now that
            //we've setup everything
            _updateDomainSeparator();
        }

        /**
        * @notice This Token Proxy supports the ERC20 standard
        * @dev This value does not change, will always return TokenStandard.ERC20
        * @return The name of this Token standard
        */
        function tokenStandard() external pure override returns (TokenStandard) {
            return TokenStandard.ERC20;
        }

        /**
        * @dev The domain name of this ERC20 Token Proxy will be the ERC20 Token name().
        * This value does not change.
        * @return The domain name of this ERC20 Token Proxy
        */
        function _domainName()
            internal
            view
            virtual
            override
            returns (bytes memory)
        {
            // TODO You could also grab the name using the name() function
            return abi.encode("TokenName");
        }


