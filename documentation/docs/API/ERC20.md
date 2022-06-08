## `ERC20`

An ERC20 proxy contract that implements the IERC20 interface. This contract
can be deployed as-is, however it is recommended to use the ERC20 contract
for more deployment options (such as minting an inital supply).
You must provide a token logic contract address that implements the ERC20TokenLogic interface.

The mint and burn/burnFrom functions can be toggled on/off during deployment. To check if mint/burn/burnFrom
are enabled, check the ProtectedTokenData.



This proxy contract inherits from ExtendableTokenProxy and ERC20TokenInterface, meaning
it supports the full ERC20 spec and extensions that support ERC20. All ERC20 functions
are declared explictely and are always forwarded to the current ERC20 token logic contract.

All transfer events (including minting/burning) trigger a transfer event to all registered
and enabled extensions. By default, no data (or operatorData) is passed to extensions. The
functions transferWithData and transferFromWithData allow a caller to pass data to extensions during
these transfer events

The domain name of this contract is the ERC20 token name()


### `constructor(string _name, string _symbol, bool _allowMint, bool _allowBurn, address _owner, uint256 _initalSupply, uint256 _maxSupply, address _logicAddress)` (public)

Deploy a new ERC20 Token Proxy with a given token logic contract. You must
also provide the token's name/symbol, max supply, owner and whether token minting or
token buning is allowed


The constructor stores the ProtectedTokenData and updates the domain seperator


### `transferWithData(address _recipient, uint256 _amount, bytes _data) → bool` (public)

Moves `amount` tokens from the caller's account to `recipient`, passing arbitrary data to
any registered extensions.



Returns a boolean value indicating whether the operation succeeded.

Emits a {Transfer} event.


### `transferFromWithData(address _sender, address _recipient, uint256 _amount, bytes _data) → bool` (public)

Moves `amount` tokens from the caller's account to `recipient`, passing arbitrary data to
any registered extensions.



Returns a boolean value indicating whether the operation succeeded.

Emits a {Transfer} event.


### `_domainName() → bytes` (internal)



The domain name of this ERC20 Token Proxy will be the ERC20 Token name().
This value does not change.


### `tokenStandard() → enum TokenStandard` (external)

This Token Proxy supports the ERC20 standard


This value does not change, will always return TokenStandard.ERC20





