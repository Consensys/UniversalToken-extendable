pragma solidity ^0.8.0;

import {ERC1820Client} from "../../erc1820/ERC1820Client.sol";
import {ERC1820Implementer} from "../../erc1820/ERC1820Implementer.sol";
import {TokenRoles} from "../roles/TokenRoles.sol";
import {DomainAware} from "../../tools/DomainAware.sol";
import {ITokenLogic} from "../ITokenLogic.sol";
import {ExtensionStorage} from "../../extensions/ExtensionStorage.sol";
import {ITokenProxy} from "../ITokenProxy.sol";
import {DynamicTokenInterface} from "../DynamicTokenInterface.sol";
import {StorageSlot} from "@openzeppelin/contracts/utils/StorageSlot.sol";
import {TransferData} from "../IToken.sol";

abstract contract TokenProxy is DynamicTokenInterface, TokenRoles, DomainAware, ITokenProxy {
    constructor(address logicAddress, address owner) {
        if (owner != address(0) && owner != _msgSender()) {
            transferOwnership(owner);
            StorageSlot.getAddressSlot(TOKEN_MANAGER_ADDRESS).value = owner;
        } else {
            StorageSlot.getAddressSlot(TOKEN_MANAGER_ADDRESS).value = _msgSender();
        }

        ERC1820Client.setInterfaceImplementation(__tokenInterfaceName(), address(this));
        ERC1820Implementer._setInterface(__tokenInterfaceName()); // For migration

        require(logicAddress != address(0), "Logic address must be given");
        require(logicAddress == ERC1820Client.interfaceAddr(logicAddress, __tokenLogicInterfaceName()), "Not registered as a logic contract");

        _setLogic(logicAddress);
    }

    function _getLogicContractAddress() internal view returns (address) {
        return ERC1820Client.interfaceAddr(address(this), __tokenLogicInterfaceName());
    }

    function _setLogic(address logic) internal {
        ERC1820Client.setInterfaceImplementation(__tokenLogicInterfaceName(), logic);
    }

    
    function upgradeTo(address logic, bytes memory data) external override onlyManager {
        _setLogic(logic);

        //invoke the initialize function whenever we upgrade
        (bool success, bytes memory data) = _delegatecall(
            abi.encodeWithSelector(ITokenLogic.initialize.selector, data)
        );

        //Invoke initialize
        require(success, "Logic initializing failed");
    }

    // Forward any function not found here to the storage
    // contract, appending _msgSender() to the end of the 
    // calldata provided and return any values
    fallback() external override payable {
        //we cant define a return value for fallback in solidity
        //therefore, we must do the call in in-line assembly
        //so we can use the return() opcode to return
        //dynamic data from the storage contract

        //This is because the storage contract may return
        //anything, since both the logic contract or
        //the registered & enabled extensions can return
        //something
        address logic = _getLogicContractAddress();
        bytes memory cdata = abi.encodePacked(_msgData(), _msgSender());
        uint256 value = msg.value;

        // Forward the external call using call and return any value
        // and reverting if the call failed
        assembly {
            // execute function call
            let result := call(gas(), logic, value, add(cdata, 0x20), mload(cdata), 0, 0)
            // get any return value
            returndatacopy(0, 0, returndatasize())
            // return any return value or error back to the caller
            switch result
                case 0 {
                    revert(0, returndatasize())
                }
                default {
                    return(0, returndatasize())
                }
        }
    }

    function _delegateCurrentCall() internal {
        _delegatecallAndReturn(_msgData());
    }

    modifier delegated {
        _delegateCurrentCall();
        _;
    }

    function _delegatecall(bytes memory _calldata) internal returns (bool success, bytes memory result) {
        address logic = _getLogicContractAddress();

        // Forward the external call using call and return any value
        // and reverting if the call failed
        (success, result) = logic.delegatecall{gas: gasleft()}(_calldata);

        if (!success) {
            revert(string(result));
        }
    }

    function _delegatecallAndReturn(bytes memory _calldata) internal {
        address logic = _getLogicContractAddress();

        // Forward the external call using call and return any value
        // and reverting if the call failed
        assembly {
            // execute function call
            let result := delegatecall(gas(), logic, add(_calldata, 0x20), mload(_calldata), 0, 0)
            // get any return value
            returndatacopy(0, 0, returndatasize())
            // return any return value or error back to the caller
            switch result
                case 0 {
                    revert(0, returndatasize())
                }
                default {
                    return(0, returndatasize())
                }
        }
    }
    
    receive() external override payable {}

    function _domainVersion() internal virtual override view returns (bytes32) {
        return bytes32(uint256(uint160(_getLogicContractAddress())));
    }
}