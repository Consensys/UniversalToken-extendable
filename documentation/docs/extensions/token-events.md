Extensions can choose to listen to specific token events on-chain (such as transfers or approvals) which trigger specific checks or actions. 

!!! info
    The `TokenExtension` base contract provides helper methods to listen to common token events.

The only thing extensions cannot do inside an event callback is perform an action that would cause the same event to be triggered again. This is to prevent reentry attacks and potential recursion problems.

* `_listenForTokenTransfers(function (TransferData memory) external returns (bool) callback)`: listens for token transfers and invokes the provided callback function. When the callback is invoked, the transfer has already occurred.
* `_listenForTokenApprovals(function (TransferData memory) external returns (bool) callback)`: listens for token approvals and invokes the provided callback function. When the callback is invoked, the approval has already occurred.
* `_listenForTokenBeforeTransfers(function (TransferData memory) external returns (bool) callback)`: listens for token transfers and invokes the provided callback function. The callback is invoked right before the transfer occurs.

If an extension wishes to listen to an event, it should subscribe to the event inside its `initialize` function. However, an extension can choose to subscribe whenever they like.

```solidity
import {TokenExtension, TransferData} from "@consensys-software/UniversalToken/extensions/TokenExtension.sol";

contract PauseExtension is TokenExtension {
    bytes32 constant internal ALLOWLIST_ROLE = keccak256("allowblock.roles.allowlisted");
        
    constructor() {
        // ...
    }

    function initialize() external override {
        _listenForTokenTransfers(this.onTransferExecuted);
    }
        
    function onTransferExecuted(TransferData memory data) external onlyToken returns (bool) {
        // hasRole is provided by the TokenExtension base contract
        bool fromAllowed = data.from == address(0) || hasRole(data.from, ALLOWLIST_ROLE);
        bool toAllowed = data.to == address(0) || hasRole(data.to, ALLOWLIST_ROLE);
            
        require(fromAllowed, "from address is not allowlisted");
        require(toAllowed, "to address is not allowlisted");

        return fromAllowed && toAllowed;
    }
}
```

!!! important
    * Event callback functions must be marked as either `external` or `public` and **MUST** include the `onlyToken` modifier. 
    * The `onlyToken` modifier ensures that only the token can execute the callback function.