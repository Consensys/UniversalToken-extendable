When your extension deployment is registered to a new token deployment, a new extension proxy will be deployed, and your extension will be initialized. 

When an extension is initialized, its `initialize()` function is invoked by the token. Use this function to perform any initialization that may be needed, for example:

* Setting default values for storage variables.
* Providing extension roles to the current `_msgSender()` (the current token admin).
* Setting up callback listeners for specific [token events and callbacks](../token-events).

