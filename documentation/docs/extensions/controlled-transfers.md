# Controlled Transfers

A controlled transfer allows for an Extension to perform a transfer from one address to another without needing prior approval. This can only be done by Extensions granted with the `TOKEN_CONTROLLER_ROLE` token role. 

!!! warning
    _When an Extension (**or any address**) is granted the `TOKEN_CONTROLLER_ROLE` token role, **the granted address has approval on all token balance holders**. It's important to ensure only **trusted addresses** have the `TOKEN_CONTROLLER_ROLE` token role._

An extension can request the `TOKEN_CONTROLLER_ROLE` token role during registration by specifying it as a required role using `_requireRole(TOKEN_CONTROLLER_ROLE)`. 


    import {TokenExtension, TransferData} from "@consensys-software/UniversalToken/extensions/TokenExtension.sol";

    contract HoldExtension is TokenExtension {
        
        constructor() {
            _requireRole(TOKEN_CONTROLLER_ROLE)
        }

        function initialize() external override {
        // ...
        }
    }

Once your extension has the required token role, you can perform a controlled transfer. To do this, you must create a `TransferData` object specify the details of the transfer. This can be done manually by instantiating the `TransferData` struct, or by using the `_buildTransfer` helper function from `TokenExtension`.

Once you have a `TransferData` object, simply invoke the `_tokenTransfer(TransferData)` function inside of `TokenExtension`


    import {TokenExtension, TransferData} from "@consensys-software/UniversalToken/extensions/TokenExtension.sol";

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

!!! note
    **A controlled transfer will trigger both a `TOKEN_BEFORE_TRANSFER_EVENT` and a `TOKEN_TRANSFER_EVENT`. This means that controlled transfers can still be restricted by Extensions and controlled transfers cannot occur inside a `TOKEN_BEFORE_TRANSFER_EVENT` or `TOKEN_TRANSFER_EVENT` callback.**


