## Deploy

Once you have your custom token extension built, you can deploy it on-chain and begin using it with any deployed UniversalToken compatible ERC20/ERC721 token. See [How to deploy an Extension](./overview.md#deploying-extensions)

# Deploying Extensions

Before you can attach an extension to your token you must first deploy the extension on-chain. If the extension
is already deployed on-chain then you can skip this step. There shouldn't be any constructor arguments when deploying
an extension, as these arguments will not be accessible by the Extension when it's attached to the token


    const AllowExtension = artifacts.require("AllowExtension");
    const allowExtContract = await AllowExtension.new();