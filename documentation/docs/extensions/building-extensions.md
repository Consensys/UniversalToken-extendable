# Building Extensions

Extensions are smart contracts that give a token contract additional functionality. A common use-case is to have finer control over the conditions of a token transfer, however there are others, such as adding DeFi support built in or price oracles. 

Extensions live on-chain and can be used by many different token contracts at the same time. Each token contract extension registration is independent and keeps its own independent storage. Extension contracts are upgradable by default and therefore follow the same storage rules as [proxy pattern](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies#storage-collisions-between-implementation-versions).

## Getting Started

First import the `TokenExtension` and `TransferData` from the `TokenExtension.sol` file

    import {TokenExtension, TransferData} from "@consensys-software/UniversalToken/extensions/TokenExtension.sol";

Once you have these imported, you can create a new contract that inherits from `TokenExtension` with an empty constructor and override the `initialize` function

    import {TokenExtension, TransferData} from "@consensys-software/UniversalToken/extensions/TokenExtension.sol";

    contract PauseExtension is TokenExtension {

        constructor() {

        }

        function initialize() external override {

        }
    }

## _msgSender() instead of msg.sender

The `TokenExtension` contract will be executed in a proxy context when it's attached to a deployed token. This means that the value of `msg.sender` may be different depending on how the Extension is invoked (meta-transaction, token proxy forwarding, EOA, etc..). 

Therefore, the use of `msg.sender` is considered unsafe as the value may not be correct for the current executing context. 

!!! warning
    You must always use `_msgSender()` to obtain the proper `msg.sender` for the current context. Never use `msg.sender` directly unless you know what you are doing.

## Extension Functions

First start by writing all the logic for your extension, including any event callback functions that may be used. Any external function you want to register on the token must be declared in the [Extension Constructor](#extension-constructor) and must be marked as `external` or `public`. Besides these two requirements, extension functions can do anything a normal smart contract function can do, and can also be marked as `view`. 

An example extension function could be toggling a `pause` state to pause/unpause token transfers

    import {TokenExtension, TransferData} from "@consensys-software/UniversalToken/extensions/TokenExtension.sol";

    contract PauseExtension is TokenExtension {
        bool paused;

        constructor() {
            // ...
        }

        function initialize() external override {
            // ...
        }
        
        function pause() external {
            require(_msgSender() == _tokenOwner(), "Only token owner can invoke");
            paused = true;
        }
    
        function unpause() external {
            require(_msgSender() == _tokenOwner(), "Only token owner can invoke");
            paused = false;
        }
    }

We can then use the `paused` state variable inside a transfer callback to prevent transfers if the `paused` variable is `true`

    import {TokenExtension, TransferData} from "@consensys-software/UniversalToken/extensions/TokenExtension.sol";

    contract PauseExtension is TokenExtension {
        bool paused;

        constructor() {
            // ...
        }

        function initialize() external override {
            _listenForTokenTransfers(this.onTransferExecuted);
        }
        
        function pause() external {
            // ...
        }
    
        function unpause() external {
            // ...
        }
        
        function onTransferExecuted(TransferData memory data) external onlyToken returns (bool) {
            require(!paused, "Transfers paused by PauseExtension");

            return true;
        }
    }

For more information about transfer events and callbacks, see [Token Events](./token-events.md).

## Extension Constructor

Even though extensions are upgradable, they must contain a constructor. The constructor of an extension smart contract is used to write immutable metadata about the extension that is used by the token during registration. This includes things such as the version, the functions the extension has, what interfaces it supports, and which token interfaces it supports (multiple token interfaces can be supported). Each new version of an extension deployed on-chain must include this constructor, and may choose to change the contents of the constructor between versions. 

Extensions must call the following inside the constructor

* `_setPackageName(string)` - Set the package name for the extension
* `_setInterfaceLabel(string)` - Set the interface label for the extension
* `_setVersion(uint)` - Set the version n umber for the extension

Optionally, extensions may also call the following inside the constructor

* `_registerFunction(bytes4)` - Register a function selector to be added to the token. If this function is invoked on the token, then this extension instance will be invoked
* `_registerFunctionName(string)` - Same as `_registerFunction(bytes4)`, however lets you specify a function by its function signature
* `_requireRole(bytes32)` - Specify a token role Id that this extension requires. For example, if this extension needs to mint tokens then you should invoke `_requireRole(TOKEN_MINTER_ROLE)`
* `_supportsTokenStandard(TokenStandard)` - Specify a specific token standard that this extension supports.
* `_supportsAllTokenStandards()` - Specify that this extension supports all token standards
* `_supportInterface(bytes4)` - Specify a specific interface label that this extension supports

Example:

    import {TokenExtension, TransferData} from "@consensys-software/UniversalToken/extensions/TokenExtension.sol";

    contract PriceOracleExtension is TokenExtension {

        constructor() {
            _setVersion(1);
            _registerFunction(ExampleExtension.fetchPrice.selector);
            _registerFunction(ExampleExtension.updatePrice.selector);
            _supportsAllTokenStandards();
        }

        function initialize() external override {
            // ...
        }
        
        function updatePrice() external {
            // ...
        }
    
        function fetchPrice() external view returns (uint256) {
            // ...
        }

    }

## Extension Initalization

When your extension deployment is registered to a new token deployment, a new Extension Proxy will be deployed and your extension will be initalized. When an extension is initalized, its `initialize()` function is invoked by the token. You can use this function to perform any initalization that may be needed, some examples include

* Setting default values for storage variables
* Providing extension roles to the current `_msgSender()` (the current token admin)
* Setting up callback listeners for specific token events
    - See [Token Events](./token-events.md)


## Deploy

Once you have your custom token extension built, you can deploy it on-chain and begin using it with any deployed UniversalToken compatible ERC20/ERC721 token. See [How to deploy an Extension](./getting-started.md#deploying-extensions)