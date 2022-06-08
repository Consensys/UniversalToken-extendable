## `DomainAware`

This should be inherited by any contract that plans on using the EIP712
typed structured data signing


A generic contract to be used by contract plans on using the EIP712 typed structure
data signing. This contract offers a way to generate the EIP712Domain seperator for the
contract that extends from this.

The EIP712 domain seperator generated depends on the domain name and domain version of the child
contract. Therefore, a child contract must implement the _domainName() and _domainVersion() functions in order
to complete the implementation.
The child contract may return whatever it likes for the _domainName(), however this value should not change
after deployment. Changing the result of the _domainName() function between calls may result in undefined behavior.
The _domainVersion() must be a bytes32 and that _domainName() must have a length greater than 0.

If a child contract changes the domain version after deployment, then the domain seperator will
update to reflect the new version.

This contract stores the domain seperator for each chain-id detected after deployment. This
means if the contract were to fork to a new blockchain with a new chain-id, then the domain-seperator
of this contract would update to reflect the new domain context.



### `constructor()` (internal)



If in the constructor we have a non-zero domain name, then update the domain seperator now.
Otherwise, the child contract will need to do this themselves

### `_domainName() → bytes` (internal)



The domain name for this contract. This value should not change at all and should have a length
greater than 0.
Changing this value changes the domain separator but does not trigger a cache update so may
result in undefined behavior
TODO Fix cache issue? Gas inefficient since we don't know if the data has updated?
We can't make this pure because ERC20 requires name() to be view.


### `_domainVersion() → bytes32` (internal)



The current version for this contract. Changing this value will
cause the domain separator to update and trigger a cache update.

### `domainName() → bytes` (external)

The domain name for this contract used in the domain seperator.
This value will not change and will have a length greater than 0.


Uses _domainName()


### `domainVersion() → bytes32` (external)

The current version for this contract. This is the domain version
used in the domain seperator

Uses _domainName()


### `generateDomainSeparator() → bytes32` (public)

Generate the domain seperator hash for this contract using the contract's
domain name, current domain version and the current chain-id. This call bypasses the stored cache and
will always represent the current domain seperator for this Contract's name + version + chain id.




### `domainSeparator() → bytes32` (public)

Get the current domain seperator hash for this contract using the contract's
domain name, current domain version and the current chain-id.


This call is cached by the chain-id and contract version. If these two values do not
change then the cached domain seperator hash is returned. If these two values do change,
then a new hash is generated and the cache is updated


### `_updateDomainSeparator() → bytes32` (internal)



Generate and update the cached domain seperator hash for this contract
using the contract's domain name, current domain version and the current chain-id.
This call will always overwrite the cache even if the cached data of the same.


### `_chainID() → uint256` (internal)



Get the current chain-id. This is done using the chainid opcode.




### `DomainData`


bytes32 domainSeparator


bytes32 version


### `DomainAwareData`


mapping(uint256 => struct DomainAware.DomainData) chainToDomainData



