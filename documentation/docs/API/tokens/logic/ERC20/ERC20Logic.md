## `ERC20Logic`

An ERC20 logic contract that implements the IERC20 interface. This contract
can be deployed as-is.



This logic contract inherits from OpenZeppelin's ERC20Upgradeable, TokenLogic and ERC20TokenInterface.
This meaning it supports the full ERC20 spec along with any OpenZeppelin (or other 3rd party) contract extensions.
You may inherit from this logic contract to add additional functionality.

Any additional functions added to the logic contract through a child contract that is not explictly declared in the
proxy contract may be overriden by registered & enabled extensions. To prevent this, explictly declare the new function
in the proxy contract and forward the call using delegated function modifier

All transfer events (including minting/burning) trigger a transfer event to all registered
and enabled extensions. By default, no data (or operatorData) is passed to extensions. The
functions transferWithData and transferFromWithData allow a caller to pass data to extensions during
these transfer events. This is done through the {ExtendableHooks._triggerTokenTransfer} function inside
the {ERC20Logic._afterTokenTransfer} function. The _afterTokenTransfer function was chosen to follow
the checks, effects and interactions pattern



### `_onInitialize(bool isConstructor, bytes initData) → bool` (internal)



We don't need to do anything here

### `_init(bytes data)` (internal)





### `_beforeTokenTransfer(address from, address to, uint256 amount)` (internal)



This function is invoked directly before each token transfer. This is overriden here
so we can invoke the transfer event on all registered & enabled extensions. We do this
by building a TransferData object and invoking _triggerBeforeTokenTransfer


### `_afterTokenTransfer(address from, address to, uint256 amount)` (internal)



This function is invoked directly after each token transfer. This is overriden here
so we can invoke the transfer event on all registered & enabled extensions. We do this
by building a TransferData object and invoking _triggerTokenTransfer


### `mint(address to, uint256 amount) → bool` (external)



Mints `amount` tokens and sends to `to` address.
Only an address with the Minter role can invoke this function


### `burn(uint256 amount) → bool` (public)



Destroys `amount` tokens from the caller.

See {ERC20-_burn}.


### `burnFrom(address account, uint256 amount) → bool` (public)



Destroys `amount` tokens from `account`, deducting from the caller's
allowance.

See {ERC20-_burn} and {ERC20-allowance}.

Requirements:

- the caller must have allowance for ``accounts``'s tokens of at least
`amount`.


### `tokenTransfer(struct TransferData td) → bool` (external)



Executes a controlled transfer where the sender is `td.from` and the recipeint is `td.to`.
Only token controllers can use this funciton


### `tokenStandard() → enum TokenStandard` (external)



This will always return {TokenStandard.ERC20}

### `transfer(address recipient, uint256 amount) → bool` (public)



See {IERC20-transfer}.

Requirements:

- `recipient` cannot be the zero address.
- the caller must have a balance of at least `amount`.


### `transferFrom(address sender, address recipient, uint256 amount) → bool` (public)



See {IERC20-transferFrom}.

Emits an {Approval} event indicating the updated allowance. This is not
required by the EIP. See the note at the beginning of {ERC20}.

Requirements:

- `sender` and `recipient` cannot be the zero address.
- `sender` must have a balance of at least `amount`.
- the caller must have allowance for ``sender``'s tokens of at least
`amount`.


### `approve(address spender, uint256 amount) → bool` (public)





### `increaseAllowance(address spender, uint256 addedValue) → bool` (public)





### `decreaseAllowance(address spender, uint256 subtractedValue) → bool` (public)





### `mintingAllowed() → bool` (external)

Returns true if minting is allowed on this token, otherwise false



### `burningAllowed() → bool` (external)

Returns true if burning is allowed on this token, otherwise false



### `maxSupply() → uint256` (external)

Returns the maximum value the totalSupply() can be for this token






