## `TokenProxyStorage`





### `initializeCaller(uint256 dataSize)`






### `_getProtectedFunctionData() → struct TokenProxyStorage.ProtectedFunctions r` (internal)



Get the ProtectedTokenData struct stored in this contract

### `_isInsideConstructorCall() → bool` (internal)



Checks whether the current call context is the constructor of this contract


### `_protectFunction(bytes4 selector)` (internal)





### `_protectFunctions(bytes4[] selectors)` (internal)





### `_isFunctionProtected(bytes4 selector) → bool` (internal)





### `_functionSigToSelector(string selector) → bytes4` (internal)







### `ProtectedFunctions`


mapping(bytes4 => bool) isProtected



