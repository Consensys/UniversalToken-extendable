This section discusses the different functions of the `TokenProxy` that are used by every token standard contract deployed, i.e. `ERC20`, `ERC721`, etc.

!!! info
    This section assumes you have a token deployed on-chain and you have access to the token contract via a Truffle contract variable named `token` inside a script. However, these functions can be used by any client such as with Etherscan or with Hardhat. 

## Interface

The `IToken` interface is the interface that all token contracts must adhere to. 

The `IToken` interface allows for token transfer interoperability as well as basic introspection about the supported token standard.

## `tokenTransfer(TransferData) onlyControllers`

This function enables the transfer of tokens given an interoperable struct `TransferData` representing data about the transfer request. 

The struct has the following fields:

 * `token`: token address that is executing this extension.
 * `payload`: the full payload of the initial transaction.
 * `partition`: name of the partition (left empty for ERC20 transfer).
 * `operator`: address which triggered the balance decrease (through transfer or redemption).
 * `from`: token holder.
 * `to`: token recipient for a transfer and 0x for a redemption.
 * `value`: number of tokens the token holder balance is decreased by.
 * `data`: extra information (if any).
 * `operatorData`: extra information, attached by the operator (if any).

This function can only be used by [token controllers](../token-roles/token-roles.md#controller), and is mainly used to perform [controlled transfers](../../extensions/controlled-transfers.md) inside of extensions.

## `tokenStandard() pure returns (TokenStandard)`

```js
const supportedTokenStandard = await token.tokenStandard();
```

A pure function that returns the `TokenStandard` this token supports.

This function can be used to determine what kinds of functions the token may support.
