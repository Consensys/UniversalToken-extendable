// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import {TransferData} from "../IToken.sol";

interface ITokenEventManager {
    function on(
        bytes32 eventId,
        function(TransferData memory) external returns (bool) callback
    ) external;
}
