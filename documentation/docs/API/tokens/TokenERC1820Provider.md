## `TokenERC1820Provider`

This is an abstract contract, you may want to inherit from
the contracts in the registry folder


A base contract that provides ERC1820 functionality and also
provides pure functions to obtain the interface name for both the
current token logic contract and the current token contract


### `__tokenLogicInterfaceName() → string` (internal)



The interface name for the token logic contract to be used in ERC1820.

### `__tokenInterfaceName() → string` (internal)



The interface name for the token contract to be used in ERC1820




