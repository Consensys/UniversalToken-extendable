pragma solidity ^0.8.0;

import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC721Proxy} from "./IERC721Proxy.sol";
import {IERC721Logic, _getProtectedTokenData, ERC721ProtectedTokenData} from "../../logic/ERC721/IERC721Logic.sol";
import {IToken, TokenStandard, TransferData} from "../../IToken.sol";
import {ExtendableTokenProxy} from "../ExtendableTokenProxy.sol";
import {ERC721TokenInterface} from "../../registry/ERC721TokenInterface.sol";
import {BytesLib} from "solidity-bytes-utils/contracts/BytesLib.sol";
import {TokenProxy} from "../TokenProxy.sol";

contract ERC721Proxy is
    IERC721Proxy,
    ExtendableTokenProxy,
    ERC721TokenInterface
{
    using BytesLib for bytes;

    constructor(
        string memory name_,
        string memory symbol_,
        bool allowMint,
        bool allowBurn,
        uint256 maxSupply_,
        address owner,
        address logicAddress
    )
        ExtendableTokenProxy(
            abi.encode(name_, symbol_, allowMint, allowBurn, maxSupply_),
            logicAddress,
            owner
        )
    {
        require(maxSupply_ > 0, "Max supply must be non-zero");

        if (allowMint) {
            _addRole(owner, TOKEN_MANAGER_ADDRESS);
        }

        //Update the doamin seperator now that
        //we've setup everything
        _updateDomainSeparator();
    }

    function supportsInterface(bytes4 interfaceId)
        external
        view
        override
        returns (bool)
    {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId;
    }

    /**
     * @dev A function modifier to place on minting functions to ensure those
     * functions get disabled if minting is disabled
     */
    modifier mintingEnabled() {
        require(mintingAllowed(), "Minting is disabled");
        _;
    }

    /**
     * @dev A function modifier to place on burning functions to ensure those
     * functions get disabled if burning is disabled
     */
    modifier burningEnabled() {
        require(burningAllowed(), "Burning is disabled");
        _;
    }

    /**
     * @notice Returns true if minting is allowed on this token, otherwise false
     * @return if minting is allowed on this token or not
     */
    function mintingAllowed() public view override returns (bool) {
        (, bytes memory result) = TokenProxy._staticDelegateCall(
            abi.encodeWithSelector(this.mintingAllowed.selector)
        );

        return result.equal(TRUE);
    }

    /**
     * @notice Returns true if burning is allowed on this token, otherwise false
     * @return if burning is allowed or not
     */
    function burningAllowed() public view override returns (bool) {
        (, bytes memory result) = TokenProxy._staticDelegateCall(
            abi.encodeWithSelector(this.burningAllowed.selector)
        );

        return result.equal(TRUE);
    }

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) public view override returns (uint256) {
        (, bytes memory result) = TokenProxy._staticDelegateCall(
            abi.encodeWithSelector(this.balanceOf.selector, account)
        );

        return result.toUint256(0);
    }

    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view override returns (address) {
        (, bytes memory result) = TokenProxy._staticDelegateCall(
            abi.encodeWithSelector(this.ownerOf.selector, tokenId)
        );

        return result.toAddress(0);
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view override returns (string memory) {
        if (_isInsideConstructorCall()) {
            //_staticDelegateCall doesn't work inside the constructor
            //See if we can grab from the storage slot ERC721Logic uses
            return _getProtectedTokenData().name;
        }

        (, bytes memory result) = TokenProxy._staticDelegateCall(
            abi.encodeWithSelector(this.name.selector)
        );

        return _bytesToString(result);
    }

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() public view override returns (string memory) {
        if (_isInsideConstructorCall()) {
            //_staticDelegateCall doesn't work inside the constructor
            //See if we can grab from the storage slot ERC721Logic uses
            return _getProtectedTokenData().symbol;
        }

        (, bytes memory result) = TokenProxy._staticDelegateCall(
            abi.encodeWithSelector(this.symbol.selector)
        );

        return _bytesToString(result);
    }

    function tokenURI(uint256 tokenId)
        external
        view
        override
        returns (string memory)
    {
        (, bytes memory result) = TokenProxy._staticDelegateCall(
            abi.encodeWithSelector(this.tokenURI.selector, tokenId)
        );

        return _bytesToString(result);
    }

    /**
     * @dev See {IERC721Enumerable-tokenOfOwnerByIndex}.
     */
    function tokenOfOwnerByIndex(address owner, uint256 index)
        public
        view
        virtual
        override
        returns (uint256)
    {
        (, bytes memory result) = TokenProxy._staticDelegateCall(
            abi.encodeWithSelector(
                this.tokenOfOwnerByIndex.selector,
                owner,
                index
            )
        );

        return result.toUint256(0);
    }

    /**
     * @dev See {IERC721Enumerable-totalSupply}.
     */
    function totalSupply() public view virtual override returns (uint256) {
        (, bytes memory result) = TokenProxy._staticDelegateCall(
            abi.encodeWithSelector(this.totalSupply.selector)
        );

        return result.toUint256(0);
    }

    /**
     * @dev See {IERC721Enumerable-tokenByIndex}.
     */
    function tokenByIndex(uint256 index)
        public
        view
        virtual
        override
        returns (uint256)
    {
        (, bytes memory result) = TokenProxy._staticDelegateCall(
            abi.encodeWithSelector(this.tokenByIndex.selector, index)
        );

        return result.toUint256(0);
    }

    function mint(address to, uint256 tokenId)
        public
        virtual
        override
        onlyMinter
        mintingEnabled
        delegated
        returns (bool)
    {}

    function mintAndSetTokenURI(
        address to,
        uint256 tokenId,
        string memory uri
    )
        public
        virtual
        override
        onlyMinter
        mintingEnabled
        delegated
        returns (bool)
    {}

    function setTokenURI(uint256 tokenId, string memory uri)
        external
        override
        onlyMinter
        mintingEnabled
        delegated
    {}

    function setContractURI(string memory uri)
        external
        override
        onlyOwner
        delegated
    {}

    function contractURI() external view override returns (string memory) {
        (, bytes memory result) = TokenProxy._staticDelegateCall(
            abi.encodeWithSelector(this.contractURI.selector)
        );

        return _bytesToString(result);
    }

    /**
     * @dev Performs a controlled transfer of tokens given a TransferData struct.
     * Under the hood, this will Safely transfers `tokenId` token from `from` to `to`,
     * checking first that contract recipients are aware of the ERC721 protocol to
     * prevent tokens from being forever locked.
     *
     * Requirements:
     *
     * - The caller must have the controller role
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function tokenTransfer(TransferData calldata td)
        external
        override
        onlyControllers
        returns (bool)
    {
        require(td.token == address(this), "Invalid token");

        if (td.partition != bytes32(0)) {
            return false; //We cannot do partition transfers
        }

        TokenProxy._delegateCurrentCall();
    }

    /**
     * @dev Burns `tokenId`. See {ERC721-_burn}.
     *
     * Requirements:
     *
     * - The caller must own `tokenId` or be an approved operator.
     */
    function burn(uint256 tokenId)
        public
        virtual
        override
        burningEnabled
        delegated
        returns (bool)
    {}

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be have been allowed to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override delegated {}

    /**
     * @dev Transfers `tokenId` token from `from` to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {safeTransferFrom} whenever possible.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override delegated {}

    /**
     * @dev Returns the account approved for `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function getApproved(uint256 tokenId)
        public
        view
        override
        returns (address)
    {
        (, bytes memory result) = TokenProxy._staticDelegateCall(
            abi.encodeWithSelector(this.getApproved.selector, tokenId)
        );

        return result.toAddress(0);
    }

    /**
     * @dev Gives permission to `to` to transfer `tokenId` token to another account.
     * The approval is cleared when the token is transferred.
     *
     * Only a single account can be approved at a time, so approving the zero address clears previous approvals.
     *
     * Requirements:
     *
     * - The caller must own the token or be an approved operator.
     * - `tokenId` must exist.
     *
     * Emits an {Approval} event.
     */
    function approve(address to, uint256 tokenId) public override delegated {}

    /**
     * @dev Approve or remove `operator` as an operator for the caller.
     * Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller.
     *
     * Requirements:
     *
     * - The `operator` cannot be the caller.
     *
     * Emits an {ApprovalForAll} event.
     */
    function setApprovalForAll(address operator, bool _approved)
        external
        override
        delegated
    {}

    /**
     * @dev Returns if the `operator` is allowed to manage all of the assets of `owner`.
     *
     * See {setApprovalForAll}
     */
    function isApprovedForAll(address owner, address operator)
        external
        view
        override
        returns (bool)
    {
        (, bytes memory result) = TokenProxy._staticDelegateCall(
            abi.encodeWithSelector(
                this.isApprovedForAll.selector,
                owner,
                operator
            )
        );

        return result.equal(TRUE);
    }

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external override delegated {}

    function _domainName()
        internal
        view
        virtual
        override
        returns (bytes memory)
    {
        return bytes(name());
    }

    function tokenStandard() external pure override returns (TokenStandard) {
        return TokenStandard.ERC721;
    }
}
