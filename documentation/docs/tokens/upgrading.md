# Upgrading Token Logic

To upgrade/change the underlying [token logic](./token-logic.md) contract a [token proxy](./overview.md) is using, simply run the `upgradeTo(address logic, bytes memory data)` function in the token proxy.

The `address` provided will be the new logic contract that will be used, and the `data` provided will be passed to the logic contract's `_onInitialize` function

	const upgradeInitData = "0x";
	const newLogic = "0x9FE61B546b4bBCdf28fAe9588d18aD7233fFa4b9";
	await token.upgradeTo(newLogic, upgradeInitData)

# Upgrading Extensions

Upgrading extensions is also possible. Extension upgrades keep the storage of the extension while changing the logic code. To upgrade an extension, simply run the `upgradeExtension(address extension, address newExtension) external` function.

The `extension` address must be the address of the extension you want to upgrade, and the `newExtension` address must be the address you want to replace it with.

The replacement extension address must have the following same values as the original extension

1. The `deployer()` must be the same on both extensions
2. The `version()` must be different
3. The `packageHash()` must be the same
4. The new extension must support the current token standard

If all these requirements are met, then the extension can be upgraded to the provided `newExtension` address.

	const extension = "0x9FE61B546b4bBCdf28fAe9588d18aD7233fFa4b9";
	const newExtension = "0x541b79b200B40D37F91663e40Ca0B05512d0EB05";
	await token.upgradeExtension(extension, newExtension)
