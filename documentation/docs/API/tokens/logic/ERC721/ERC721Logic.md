## `ERC721Logic`






### `_onInitialize(bool isConstructor, bytes initData) → bool` (internal)





### `_init(bytes data)` (internal)





### `mint(address to, uint256 tokenId) → bool` (public)



Function to mint tokens


### `mintAndSetTokenURI(address to, uint256 tokenId, string uri) → bool` (public)





### `setTokenURI(uint256 tokenId, string uri)` (public)





### `_safeTransfer(address from, address to, uint256 tokenId, bytes _data)` (internal)



Override internal _safeTransfer to ensure _data gets passed
to extensions.

### `_burn(uint256 tokenId)` (internal)





### `supportsInterface(bytes4 interfaceId) → bool` (public)





### `tokenURI(uint256 tokenId) → string` (public)





### `setContractURI(string uri)` (public)





### `contractURI() → string` (public)





### `_beforeTokenTransfer(address from, address to, uint256 tokenId)` (internal)



Hook that is called before any token transfer. This includes minting
and burning.

Calling conditions:

- When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
transferred to `to`.
- When `from` is zero, `tokenId` will be minted for `to`.
- When `to` is zero, ``from``'s `tokenId` will be burned.
- `from` and `to` are never both zero.

To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].

### `_afterTokenTransfer(address from, address to, uint256 tokenId)` (internal)



Hook that is called after any transfer of tokens. This includes
minting and burning.

Calling conditions:

- when `from` and `to` are both non-zero.
- `from` and `to` are never both zero.

To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].

### `tokenTransfer(struct TransferData td) → bool` (external)





### `tokenStandard() → enum TokenStandard` (external)





### `safeTransferFrom(address from, address to, uint256 tokenId, bytes _data)` (public)





### `safeTransferFrom(address from, address to, uint256 tokenId)` (public)





### `transferFrom(address from, address to, uint256 tokenId)` (public)





### `setApprovalForAll(address operator, bool approved)` (public)





### `approve(address to, uint256 tokenId)` (public)





### `mintingAllowed() → bool` (public)





### `burningAllowed() → bool` (public)





### `_toggleMinting(bool allowMinting)` (internal)





### `_toggleBurning(bool allowBurning)` (internal)








