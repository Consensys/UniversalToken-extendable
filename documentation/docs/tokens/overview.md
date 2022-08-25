The token smart contracts consist of two primary contracts:

* `TokenProxy`

	Responsible for the following:

	1. Managing token roles.
	1. Managing the current token logic implementation contract.

* `TokenLogic` 

The primary smart contract used by all implementations in the repo is the [ExtendableTokenProxy](./token-proxy/extendable-token-proxy.md) which adds support for extensions and is responsible for:

1. Managing token extensions.
1. Routing calls to either the token logic contract or extensions (based on function selector).




