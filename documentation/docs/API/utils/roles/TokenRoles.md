## `TokenRoles`

A base contract for handling token roles. 


This contract is responsible for the storage and API of access control
roles that all tokens should implement. This includes the following roles
 * Owner
    - A single owner address of the token, as implemented as Ownerable
 * Minter
      - The access control role that allows an address to mint tokens
 * Manager
    - The single manager address of the token, can manage extensions
 * Controller
    - The access control role that allows an address to perform controlled-transfers

This contract also handles the storage of the burning/minting toggling.

### `onlyManager()`



A function modifier that will only allow the current token manager to
invoke the function

### `onlyMinter()`



A function modifier that will only allow addresses with the Minter role granted
to invoke the function

### `onlyControllers()`



A function modifier that will only allow addresses with the Controller role granted
to invoke the function

### `onlyOwner()`



Throws if called by any account other than the owner.


### `constructor()` (internal)



Initializes the contract setting the deployer as the initial owner.

### `manager() → address` (public)

Returns the current token manager



### `isController(address caller) → bool` (public)

Returns true if `caller` has the Controller role granted



### `isMinter(address caller) → bool` (public)

Returns true if `caller` has the Minter role granted



### `addController(address caller)` (public)

Grant the Controller role to `caller`. Only addresses with
the Controller role granted may invoke this function




### `removeController(address caller)` (public)

Remove the Controller role from `caller`. Only addresses with
the Controller role granted may invoke this function




### `addMinter(address caller)` (public)

Grant the Minter role to `caller`. Only addresses with
the Minter role granted may invoke this function




### `removeMinter(address caller)` (public)

Remove the Minter role from `caller`. Only addresses with
the Minter role granted may invoke this function




### `changeManager(address newManager)` (public)

Change the current token manager. Only the current token manager
can set a new token manager.


This function is also invoked if transferOwnership is invoked
when the current token owner is also the current manager.

### `owner() → address` (public)



Returns the address of the current owner.

### `renounceOwnership()` (public)



Leaves the contract without owner. It will not be possible to call
`onlyOwner` functions anymore. Can only be called by the current owner.

NOTE: Renouncing ownership will leave the contract without an owner,
thereby removing any functionality that is only available to the owner.

### `transferOwnership(address newOwner)` (public)

Transfers ownership of the contract to a new account (`newOwner`).
Can only be called by the current owner.
If the current owner is also the current manager, then the manager address
is also updated to be the new owner




### `addRole(address caller, bytes32 roleId)` (external)

Add a given roleId to the provided caller address. Only the current
token manager can invoke this function




### `removeRole(address caller, bytes32 roleId)` (external)

Remove a given roleId from the provided caller address. Only the current
token manager can invoke this function





### `OwnershipTransferred(address previousOwner, address newOwner)`

This event is triggered when transferOwnership is invoked




### `AdminChanged(address previousAdmin, address newAdmin)`

This event is triggered when the manager address is updated. This
can occur when transferOwnership is invoked or when changeManager is invoked.
This event name is taken from EIP1967






