Once you have your custom token extension built, deploy it on-chain and begin using it by attaching it to any deployed UniversalToken compatible ERC20/ERC721 token. 

!!! info
    If the extension is already deployed on-chain then you can skip this step. 

!!! important
    Do we need more steps here @eddie?

There should be no constructor arguments when deploying an extension, as arguments are inccessible to the extension when it's attached to the token.

```js
const AllowExtension = artifacts.require("AllowExtension");
const allowExtContract = await AllowExtension.new();
```