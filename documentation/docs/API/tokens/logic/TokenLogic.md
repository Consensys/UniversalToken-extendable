## `TokenLogic`

This should be inherited by the token logic contract


An abstract contract to be inherited by a token logic contract. This contract
inherits from TokenERC1820Provider, TokenRoles and ExtendableHooks. It is recommended
that a token logic contract inherit from a TokenERC1820Provider contract or implement those functions.

This contract uses the TokenERC1820Provider to automatically register the required token logic
interface name to the ERC1820 registry. This is used by the token proxy contract to lookup the current
token logic address.

The child contract should override _onInitialize to determine how the logic contract should initalize
when it's attached to a proxy. This occurs during deployment and during upgrading.


### `constructor()` (internal)



Register token logic interfaces to the ERC1820 registry. These
interface names are provided by TokenERC1820Provider implementing contract.

### `_extractExtraCalldata(uint256 normalCallsize) → bytes` (internal)





### `initialize(bytes data)` (external)

This cannot be invoked directly. It must be invoked by a TokenProxy inside of upgradeTo or
in the consturctor.



This function can only be invoked if the uint256 value in the UPGRADING_FLAG_SLOT storage slot
is non-zero and matches the length of the data provided



### `_onInitialize(bool isConstructor, bytes data) → bool` (internal)



To be implemented by the child logic contract. This function is invoked when the logic
contract is attached to the proxy, either through the constructor or when upgrading. When
attached during deployment, the data length will be the encoded constructor arguments inside
TokenProxy. When attached inside upgradeTo, the data passed along with the upgradeTo call will
be passed here.






