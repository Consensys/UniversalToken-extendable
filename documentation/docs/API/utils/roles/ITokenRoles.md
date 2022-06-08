## `ITokenRoles`






### `manager() → address` (external)





### `isController(address caller) → bool` (external)





### `isMinter(address caller) → bool` (external)





### `addController(address caller)` (external)





### `removeController(address caller)` (external)





### `addMinter(address caller)` (external)





### `removeMinter(address caller)` (external)





### `changeManager(address newManager)` (external)





### `owner() → address` (external)



Returns the address of the current owner.

### `renounceOwnership()` (external)



Leaves the contract without owner. It will not be possible to call
`onlyOwner` functions anymore. Can only be called by the current owner.

NOTE: Renouncing ownership will leave the contract without an owner,
thereby removing any functionality that is only available to the owner.

### `transferOwnership(address newOwner)` (external)



Transfers ownership of the contract to a new account (`newOwner`).
Can only be called by the current owner.




