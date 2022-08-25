The `TokenLogic` is the smart contract responsible for:

1. Providing functions to access token roles.
2. Managing event callback listeners.
3. Trigger events and their callback listeners.
4. `initialize` logic.
5. Core token logic.

!!! important
    This is the contract you must inherit from to build custom token implementations. 

The repo comes with both `ERC20Logic.sol` and `ERC721Logic.sol` implementations. They both use the [OpenZeppelin Upgradable](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable) smart contracts to implement each token standard.

## Extending the token logic

To extend the token logic to add functionality, you can simply inherit from `ERC20Logic` or `ERC721Logic`. These two contracts work great on their own, but can also be extended to add additional functionality or change the behavior.

When adding additional functions, be sure to update the [token proxy](./token-proxy/extendable-token-proxy.md) to protect any new functions.

### Example of extending token logic

```solidity
    pragma solidity ^0.8.0;

    import {ERC20Logic} from "@consensys-software/UniversalToken-extendable/contracts/tokens/logic/ERC20/ERC20Logic.sol";

    contract CustomERC20Logic is ERC20Logic {
        string private test;

        function _onInitialize(bool isConstructor, bytes memory data)
            internal
            override
            returns (bool)
        {
            super._onInitialize(isConstructor, data);

            test = "This is a test!";

            return true;
        }

        function testData() public view returns (string memory) {
            return test;
        }

        /**
        * This empty reserved space is put in place to allow future versions to add new
        * variables without shifting down storage in the inheritance chain.
        * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
        */
        uint256[50] private __gap;
    }


# Building a custom token

If you need to add support for a custom token standard or you wish to build a custom token implementation, you must inherit from the `TokenLogic` contract. The `TokenLogic` contract requires that you 

1. Implement the `_onInitialize(bool isConstructor, bytes memory data) internal` function
    - This function is invoked by the token proxy when the logic contract has been initialized (either through the constructor or through an upgrade). 
2. Implement the `function tokenTransfer(TransferData calldata transfer) external onlyControllers` function
    - This function is primarily used to perform [controlled transfers](../extensions/controlled-transfers.md)
3. Implement the `function tokenStandard() external pure override returns (TokenStandard)`
    - This function should return the token standard this contract implements
    - This function is a pure function, so it shouldn't rely on storage or any input for its return value
4. Trigger token events that fit your token standard implementation, using the following functions.
    - `_triggerTokenTransferEvent(TransferData)`
    - `_triggerTokenBeforeTransferEvent(TransferData)`
    - `_triggerTokenApprovalEvent(TransferData)`

## Example ERC20 implementation

    pragma solidity ^0.8.0;

    import {TokenLogic} from "@consensys-software/UniversalToken-extendable/contracts/tokens/logic/TokenLogic.sol";
    import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";


    contract CustomERC20 is TokenLogic, ERC20Upgradeable {
        function _onInitialize(bool isConstructor, bytes memory initData)
            internal
            virtual
            override
            returns (bool)
        {
            if (isConstructor) {
                (string memory name_, string memory symbol_) = abi.decode(initData, (string, string));

                // From ERC20Upgradeable
                __ERC20_init_unchained(name_, symbol_);
            }

            return true;
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
        * @dev Executes a controlled transfer where the sender is `td.from` and the recipeint is `td.to`.
        * Only token controllers can use this funciton
        * @param td The TransferData containing the kind of transfer to perform
        */
        function tokenTransfer(TransferData calldata td)
            external
            virtual
            override
            onlyControllers
            returns (bool)
        {
            require(td.token == address(this), "Invalid transfer data: token");


            if (td.partition != bytes32(0)) {
                return false; //We cannot do partition transfers
            }

            if (td.tokenId > 0) {
                return false; //We cannot do tokenId transfers
            }

            _transfer(td.from, td.to, td.value);

            return true;
        }

        /**
        * @dev This function is invoked directly before each token transfer. This is overriden here
        * so we can invoke the transfer event on all registered & enabled extensions. We do this
        * by building a TransferData object and invoking _triggerBeforeTokenTransfer
        * @param from The sender of this token transfer
        * @param to The recipient of this token transfer
        * @param amount How many tokens were transferred
        */
        function _beforeTokenTransfer(
            address from,
            address to,
            uint256 amount
        ) internal virtual override {
            address operator = _msgSender();

            TransferData memory data = TransferData(
                address(this),
                _msgData(),
                0x00000000000000000000000000000000,
                operator,
                from,
                to,
                amount,
                0,
                _currentData,
                _currentOperatorData
            );

            _triggerTokenBeforeTransferEvent(data);
        }

        /**
        * @dev This function is invoked directly after each token transfer. This is overriden here
        * so we can invoke the transfer event on all registered & enabled extensions. We do this
        * by building a TransferData object and invoking _triggerTokenTransfer
        * @param from The sender of this token transfer
        * @param to The recipient of this token transfer
        * @param amount How many tokens were transferred
        */
        function _afterTokenTransfer(
            address from,
            address to,
            uint256 amount
        ) internal virtual override {
            address operator = _msgSender();
            TransferData memory data = TransferData(
                address(this),
                _msgData(),
                0x00000000000000000000000000000000,
                operator,
                from,
                to,
                amount,
                0,
                _currentData,
                _currentOperatorData
            );

            _currentData = "";
            _currentOperatorData = "";

            _triggerTokenTransferEvent(data);
        }
```