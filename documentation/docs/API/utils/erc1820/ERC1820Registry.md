## `ERC1820Registry`

4 => bool)) internal erc165Cached;

Indicates a contract is the 'implementer' of 'interfaceHash' for 'addr'.
    event InterfaceImplementerSet(
        address indexed addr,
        bytes32 indexed interfaceHash,
        address indexed impleme




### `getInterfaceImplementer(address _addr, bytes32 _interfaceHash) → address` (external)

ntract which implements a specific interface for an address.
Only the manager defined for that address can set it.
(Each address is the manager for itself until it sets a new manager.)




### `setInterfaceImplementer(address _addr, bytes32 _interfaceHash, address _implementer)` (external)

ementer)
                    .canImplementInterfaceForAddress(_interfaceHash, addr) ==
                    ERC1820_ACCEPT_MAGIC,
                "Does not implement the interface"
            );
        }
        interfaces[addr][_interfaceHash] = _implementer;
        emit InterfaceImplementerSet(addr, _interfaceHash, _implementer);
    }

Sets '_newManager' as manager for '_addr'.
The new manager will be able to call 'setInterfaceImplementer' for '_addr'.




### `setManager(address _addr, address _newManager)` (external)

/ @return The keccak256 hash of an interface name.
    function interfaceHash(string calldata _interfaceName)
        external
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(_interfaceName));
    }

    /* --- ERC165 Related Functions --- */
    /* --- Developed in collabo



### `getManager(address _addr) → address` (public)

pdate the cache.
    function updateERC165Cache(address _contract, bytes4 _interfaceId)
        external
    {
        interfaces[_contract][_interfaceId] = impleme



### `interfaceHash(string _interfaceName) → bytes32` (external)

If the result is not cached a direct lookup on the contract address is performed.
    //  If the result is not cached or the cached value is out-of-date, the cache MUST be updated



### `updateERC165Cache(address _contract, bytes4 _interfaceId)` (external)

ce(address _contract, bytes4 _interfaceId)
        public
        view
        returns (bool)
    {
        if (!erc165Cached[_contract][_interfaceId]) {
            return implementsERC165InterfaceNoCache(_contract, _interfaceId);
        }



### `implementsERC165Interface(address _contract, bytes4 _interfaceId) → bool` (public)

;
        }

        (success, result) = noThrowCall(_contract, INVALID_ID);
        if (success == 0 || result != 0) {
            return false;
        }

        (success, result) = noTh



### `implementsERC165InterfaceNoCache(address _contract, bytes4 _interfaceId) → bool` (public)

with 28 zeroes), false otherwise.
    function isERC165Interface(bytes32 _interfaceHash)
        internal
        pure
        returns (bool)
    {
        return
            _interfaceHash &
                0x00000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF ==
            0;
    }

    //



### `isERC165Interface(bytes32 _interfaceHash) → bool` (internal)

ract, // To addr
                x, // Inputs are stored at location x
                0x24, // Inputs are 36 (4 + 32) bytes long
                x, // Store output over input (saves space)
                0x20 // Outputs are 32 bytes long



### `noThrowCall(address _contract, bytes4 _interfaceId) → uint256 success, uint256 result` (internal)






### `InterfaceImplementerSet(address addr, bytes32 interfaceHash, address implementer)`

_addr == address(0) ? msg.sender : _addr;
        if (isERC165Interface(_interfaceHa



### `ManagerChanged(address addr, address newManager)`

ceHash)
                    ? addr
                    : address(0);
        }





