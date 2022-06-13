## `TokenProxy`

This should be inherited by the token proxy


A generic proxy contract to be used by any token standard. The final token proxy
contract should also inherit from a TokenERC1820Provider contract or implement those functions.
This contract handles roles, domain, logic contract tracking (through ERC1820 + EIP1967),
upgrading, and has several internal functions to delegatecall to the logic contract.

This contract also has a fallback function to forward any un-routed calls to the current logic
contract

The domain version of the TokenProxy will be the current address of the logic contract. The domain
name must be implemented by the final token proxy.

### `delegated()`



A function modifier that will always forward the function
definiation to the current logic contract. The body of the function
is never invoked, so it can remain blank.

Any data returned by the logic contract is returned to the current caller

### `staticdelegated()`



A function modifier that will always forward the view function
definiation to the current logic contract. The body of the view function
is never invoked, so it can remain blank.

Any data returned by the logic contract is returned to the current caller


### `constructor(bytes initializeData, address logicAddress, address owner)` (internal)



Sets up the proxy by initalizing the owner + manager roles, as well as
setting the logic contract. This will also register the token interface
with the ERC1820 registry.


### `_setLogic(address logic)` (internal)

This should not be called directly. If you wish to change the logic contract,
use upgradeTo. This function side-steps some side-effects such as emitting the Upgraded
event

Saves the logic contract address to use for the proxy in the ERC1820 registry and
in the EIP1967 storage slot


### `upgradeTo(address logic, bytes data)` (external)

Perform an upgrade on the proxy and replace the current logic
contract with a new one. You must provide the new address of the
logic contract and (optionally) some arbitrary data to pass to
the logic contract's initialize function.


Upgrade the TokenProxy logic contract. Can only be executed by the current manager address


### `tokenTransfer(struct TransferData _td) → bool` (external)

Execute a controlled transfer of tokens `from` -> `to`. Only addresses with
the token controllers role can invoke this function.




### `_delegateCurrentCall()` (internal)



Forward the current call to the logic contract. This will
use delegatecall to forward the current call to the current logic
contract. This function returns & exits the current call

### `_staticDelegateCurrentCall() → bytes results` (internal)



Forward the current staticcall to the logic contract. This
function works in both a read (STATICCALL) and write (CALL) call context.
The return data from the staticcall is returned as arbitrary data. It is
up to the invoker to decode the data (hint: Use BytesLib)


### `_delegatecall(bytes _calldata) → bool success, bytes result` (internal)



Make a delegatecall to the current logic contract and return any returndata. If
the call fails/reverts then this call reverts.


### `_delegatecallAndReturn(bytes _calldata)` (internal)



Make a delegatecall to the current logic contract, returning any returndata to the
current caller.


### `_staticDelegateCallAndReturn(bytes _calldata)` (internal)



Make a static call (read-only call) to the logic contract and return this call. This
effectively uses the logic contract code to read from our storage.
This is done by using by doing a delayed delegatecall inside our fallback function
We'll do this by invoking a STATICCALL on ourselves with the following data
<STATICCALLMAGIC> + _calldata
In our fallback function (because we dont have a function declared with the
STATICCALLMAGIC selector), the STATICCALLMAGIC is trimmed and the rest of
the provided _calldata is passed to DELEGATECALL

This function ends the current call and returns the data returned by STATICCALL. To
just return the data returned by STATICCALL without ending the current call, use _staticcall


### `_staticDelegateCall(bytes _calldata) → bool success, bytes result` (internal)



Make a static call (read-only call) to the logic contract. This
effectively uses the logic contract code to read from our storage.
This is done by using by doing a delayed delegatecall inside our fallback function
We'll do this by invoking a STATICCALL on ourselves with the following data
<STATICCALLMAGIC> + _calldata
In our fallback function (because we dont have a function declared with the
STATICCALLMAGIC selector), the STATICCALLMAGIC is trimmed and the rest of
the provided _calldata is passed to DELEGATECALL


### `_fallback()` (internal)



The default fallback function the TokenProxy will use. Child contracts
must override this function to add additional functionality to the fallback function of
the proxy.

### `fallback()` (external)

Forward any function not found in the TokenProxy contract (or any child contracts)
to the current logic contract.



### `receive()` (external)

Receive ether

Child contracts may override this function


### `_domainVersion() → bytes32` (internal)

The current domain version of the TokenProxy is the address of
the current logic contract.


The current version for this contract. Changing this value will
cause the domain separator to update and trigger a cache update.

### `_safeBytesToString(bytes input) → string` (internal)



Child contracts may override this function



### `Upgraded(address logic)`

Used by the EIP1967 standard

This event is invoked when the logic contract is upgraded to a new contract
address.




