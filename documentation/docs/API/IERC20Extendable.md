## `IERC20Extendable`

An interface to interact with an ERC20 Token (proxy).




### `mintingAllowed() → bool` (external)

Returns true if minting is allowed on this token, otherwise false



### `burningAllowed() → bool` (external)

Returns true if burning is allowed on this token, otherwise false



### `maxSupply() → uint256` (external)

Returns the maximum value the totalSupply() can be for this token



### `mint(address to, uint256 amount) → bool` (external)

Creates `amount` new tokens for `to`.



See {ERC20-_mint}.

Requirements:

- the caller must have the `MINTER_ROLE`.


### `burn(uint256 amount) → bool` (external)

Destroys `amount` tokens from the caller.



See {ERC20-_burn}.


### `burnFrom(address account, uint256 amount) → bool` (external)

Destroys `amount` tokens from `account`, deducting from the caller's
allowance.



See {ERC20-_burn} and {ERC20-allowance}.

Requirements:

- the caller must have allowance for ``accounts``'s tokens of at least
`amount`.


### `increaseAllowance(address spender, uint256 addedValue) → bool` (external)

Atomically increases the allowance granted to `spender` by the caller.



This is an alternative to {approve} that can be used as a mitigation for
problems described in {IERC20-approve}.

Emits an {Approval} event indicating the updated allowance.

Requirements:

- `spender` cannot be the zero address.


### `decreaseAllowance(address spender, uint256 subtractedValue) → bool` (external)

Atomically decreases the allowance granted to `spender` by the caller.



This is an alternative to {approve} that can be used as a mitigation for
problems described in {IERC20-approve}.

Emits an {Approval} event indicating the updated allowance.

Requirements:

- `spender` cannot be the zero address.
- `spender` must have allowance for the caller of at least
`subtractedValue`.





