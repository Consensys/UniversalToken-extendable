A controlled transfer allows an extension to perform a transfer from one address to another without needing prior approval. This is only possible for extensions granted with the `TOKEN_CONTROLLER_ROLE` token role. 

!!! warning
    * When an extension (**or any address**) is granted the `TOKEN_CONTROLLER_ROLE` token role, **the granted address has approval on all token balance holders**. 
    * Make sure only **trusted addresses** have the `TOKEN_CONTROLLER_ROLE` token role.

An extension can request the `TOKEN_CONTROLLER_ROLE` token role during registration by specifying it as a required role using `_requireRole(TOKEN_CONTROLLER_ROLE)`. 

```solidity
import {TokenExtension, TransferData} from "@consensys-software/UniversalToken-extendable/contracts/extensions/TokenExtension.sol";

contract HoldExtension is TokenExtension {
        
    constructor() {
        _requireRole(TOKEN_CONTROLLER_ROLE)
    }

    function initialize() external override {
    // ...
    }
}
```

When your extension has the required token role, you can perform a controlled transfer. 

Create a `TransferData` object specifying the details of the transfer. Do this manually by instantiating the `TransferData` struct, or by using the `_buildTransfer` helper function from `TokenExtension`.

When you have a `TransferData` object, invoke the `_tokenTransfer(TransferData)` function inside of `TokenExtension`.

```solidity
import {TokenExtension, TransferData} from "@consensys-software/UniversalToken-extendable/contracts/extensions/TokenExtension.sol";

contract HoldExtension is TokenExtension {

    // ...
        
    constructor() {
        _requireRole(TOKEN_CONTROLLER_ROLE)
    }

    function initialize() external override {
    // ...
    }
        
    function _executeHold(bytes32 holdId, bytes32 lockPreimage, address recipient) internal isHeld(holdId) {
        HoldExtensionData storage data = holdData();
        require(data.holds[holdId].notary == _msgSender(), "executeHold: caller must be the hold notary");

        TransferData memory transferData = _buildTransfer(data.holds[holdId].sender, recipient, data.holds[holdId].amount);
        _tokenTransfer(transferData);
        // equivalent to:
        // _transfer(holds[holdId].sender, recipient, holds[holdId].amount);
    }
}
```

!!! warning
    A controlled transfer triggers both a `TOKEN_BEFORE_TRANSFER_EVENT` and a `TOKEN_TRANSFER_EVENT`. This means that controlled transfers can still be restricted by extensions and controlled transfers cannot occur inside a `TOKEN_BEFORE_TRANSFER_EVENT` or `TOKEN_TRANSFER_EVENT` callback.


