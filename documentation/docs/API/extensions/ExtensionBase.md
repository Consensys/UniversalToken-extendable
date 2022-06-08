## `ExtensionBase`

This shouldn't be used directly, it should be extended by child contracts


This contract setups the base of every Extension contract (including proxies). It
defines a set data structure for holding important information about the current Extension
registration instance. This includes the current Token address, the current Extension
global address and an "authorized caller" (callsite).

The ExtensionBase also defines a _msgSender() function, this function should be used
instead of the msg.sender variable. _msgSender() has a different behavior depending
on who the msg.sender variable is, this is to allow both meta-transactions and
proxy forwarding

The "callsite" should be considered an admin-style address. See
ExtensionProxy for more information

The ExtensionBase also provides several function modifiers to restrict function
invokation

### `onlyToken()`



A function modifier to only allow the registered token to execute this function

### `onlyAuthorizedCaller()`



A function modifier to only allow the admin to execute this function

### `onlyAuthorizedCallerOrSelf()`



A function modifier to only allow the admin or ourselves to execute this function


### `_proxyData() → struct ExtensionBase.ProxyData ds` (internal)



The ProxyData struct stored in this registered Extension instance.

### `_extensionAddress() → address` (internal)



The current Extension logic contract address

### `_tokenAddress() → address payable` (internal)



The current token address that registered this extension instance

### `_tokenStandard() → enum TokenStandard` (internal)



The current token standard that registered this extension instance


### `_authorizedCaller() → address` (internal)



The current admin address for this registered extension instance

### `_msgSender() → address ret` (internal)



Get the current msg.sender for the current CALL context

### `receive()` (external)







### `ProxyData`


address token


address extension


address callsite


bool initialized


enum TokenStandard standard



