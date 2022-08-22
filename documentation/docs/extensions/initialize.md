When your extension deployment is registered to a new token deployment, a new extension proxy will be deployed, and your extension will be initalized. 

When an extension is initalized, its `initialize()` function is invoked by the token. Use this function to perform any initalization that may be needed, for example:

* Setting default values for storage variables.
* Providing extension roles to the current `_msgSender()` (the current token admin).
* Setting up callback listeners for specific [token events and callbacks](../token-events).

