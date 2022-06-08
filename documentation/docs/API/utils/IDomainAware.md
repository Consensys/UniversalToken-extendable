## `IDomainAware`

This can be used to interact with a DomainAware contract of any type.


An interface that represents a DomainAware contract. This interface provides
all public/external facing functions that the DomainAware contract implements.


### `domainName() → bytes` (external)

The domain name for this contract used in the domain seperator.
This value will not change and will have a length greater than 0.


Uses _domainName()


### `domainVersion() → bytes32` (external)



The current version for this contract. Changing this value will
cause the domain separator to update and trigger a cache update.

### `generateDomainSeparator() → bytes32` (external)

Generate the domain seperator hash for this contract using the contract's
domain name, current domain version and the current chain-id. This call bypasses the stored cache and
will always represent the current domain seperator for this Contract's name + version + chain id.




### `domainSeparator() → bytes32` (external)

Get the current domain seperator hash for this contract using the contract's
domain name, current domain version and the current chain-id.


This call is cached by the chain-id and contract version. If these two values do not
change then the cached domain seperator hash is returned. If these two values do change,
then a new hash is generated and the cache is updated





