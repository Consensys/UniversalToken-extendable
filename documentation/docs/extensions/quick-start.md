## Imports

Import the `TokenExtension` and `TransferData` from the `TokenExtension.sol` file.

```solidity
import {TokenExtension, TransferData} from "@consensys-software/UniversalToken-extendable/extensions/TokenExtension.sol";
```

## Constructor

Now create a new contract, with an empty constructor, that inherits from `TokenExtension`, and override the `initialize` function:

```solidity
import {TokenExtension, TransferData} from "@consensys-software/UniversalToken-extendable/extensions/TokenExtension.sol";

contract PauseExtension is TokenExtension {

    constructor() {

    }

    function initialize() external override {

    }
}
```

!!! important
    Even though extensions are upgradable, they must contain a constructor. 

The constructor of an extension writes immutable metadata about the extension that the token uses during registration. This includes things such as the version, the functions the extension contains, what interfaces it supports, and which token interfaces it supports (multiple token interfaces can be supported). 

Each new version of an extension deployed on-chain must include this constructor, and may choose to change the contents of the constructor between versions. 

Extensions must call the following inside the constructor:

* `_setPackageName(string)`: sets the package name for the extension.
* `_setInterfaceLabel(string)`: sets the interface label for the extension.
* `_setVersion(uint)`: sets the version number for the extension.

Optionally, extensions may also call the following inside the constructor:

* `_registerFunction(bytes4)`: registers a function selector to be added to the token. If this function is invoked on the token, then this extension instance will be invoked.
* `_registerFunctionName(string)`: same as `_registerFunction(bytes4)`, however lets you specify a function by its function signature.
* `_requireRole(bytes32)`: specifies a token role id that this extension requires. For example, if this extension needs to mint tokens then you should invoke `_requireRole(TOKEN_MINTER_ROLE)`.
* `_supportsTokenStandard(TokenStandard)`: specifies a specific token standard that this extension supports.
* `_supportsAllTokenStandards()`: specifies that this extension supports all token standards.
* `_supportInterface(bytes4)`: specifies a specific interface label that this extension supports.

```solidity
import {TokenExtension, TransferData} from "@consensys-software/UniversalToken-extendable/extensions/TokenExtension.sol";

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
```


## Functions

Start by writing all the logic for your extension, including any event callback functions that may be used. 

!!! critical "Use `_msgSender()` instead of `msg.sender`"

    You must always use `_msgSender()` to obtain the proper `msg.sender` for the current context. Never use `msg.sender` directly unless you know what you are doing.
    
    The `TokenExtension` contract will be executed in a proxy context when it's attached to a deployed token. This means that the value of `msg.sender` may be different depending on how the extension is invoked (meta-transaction, token proxy forwarding, EOA, etc..). 

    Therefore, the use of `msg.sender` is considered unsafe as the value may not be correct for the current executing context.     

Any external function you want to register on the token must be declared in the [constructor](#constructor) and must be marked as `external` or `public`. Besides these two requirements, extension functions can do anything a normal smart contract function can do, and can also be marked as `view`. 

An example extension function could be toggling a `pause` state to pause/unpause token transfers.

```solidity
import {TokenExtension, TransferData} from "@consensys-software/UniversalToken-extendable/extensions/TokenExtension.sol";

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
```

We can then use the `paused` state variable inside a transfer callback to prevent transfers if the `paused` variable is `true`.

```solidity
import {TokenExtension, TransferData} from "@consensys-software/UniversalToken-extendable/extensions/TokenExtension.sol";

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
```





