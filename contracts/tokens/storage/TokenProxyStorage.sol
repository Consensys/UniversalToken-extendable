// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import {StorageSlot} from "@openzeppelin/contracts/utils/StorageSlot.sol";

abstract contract TokenProxyStorage {
    bytes32 private constant UPGRADING_FLAG_SLOT =
        keccak256("token.proxy.upgrading");

    bytes32 private constant PROTECTED_FUNCTIONS_SLOT =
        keccak256("token.proxy.protected");

    struct ProtectedFunctions {
        mapping(bytes4 => bool) isProtected;
    }

    /**
     * @dev Get the ProtectedTokenData struct stored in this contract
     */
    // free functions have no visibility, tell solhint to ignore
    // solhint-disable-next-line func-visibility
    function _getProtectedFunctionData()
        internal
        pure
        returns (ProtectedFunctions storage r)
    {
        bytes32 slot = PROTECTED_FUNCTIONS_SLOT;
        assembly {
            r.slot := slot
        }
    }

    modifier initializeCaller(uint256 dataSize) {
        StorageSlot.getUint256Slot(UPGRADING_FLAG_SLOT).value = dataSize;
        _;
        StorageSlot.getUint256Slot(UPGRADING_FLAG_SLOT).value = 0;
    }

    /**
     * @dev Checks whether the current call context is the constructor of this contract
     * @return bool This will return true if address(this) is still being constructed (we are inside the constructor call context),
     * otherwise returns false
     */
    function _isInsideConstructorCall() internal view returns (bool) {
        uint256 size;
        address addr = address(this);
        assembly {
            size := extcodesize(addr)
        }
        return size == 0;
    }

    function _protectFunction(bytes4 selector) internal {
        ProtectedFunctions
            storage protectedFunctions = _getProtectedFunctionData();
        protectedFunctions.isProtected[selector] = true;
    }

    function _protectFunctions(bytes4[] memory selectors) internal {
        ProtectedFunctions
            storage protectedFunctions = _getProtectedFunctionData();
        for (uint256 i = 0; i < selectors.length; i++) {
            protectedFunctions.isProtected[selectors[i]] = true;
        }
    }

    function _isFunctionProtected(bytes4 selector)
        internal
        view
        returns (bool)
    {
        ProtectedFunctions
            storage protectedFunctions = _getProtectedFunctionData();
        return protectedFunctions.isProtected[selector];
    }
}
