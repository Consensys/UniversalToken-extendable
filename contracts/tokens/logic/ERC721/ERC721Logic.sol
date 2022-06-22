pragma solidity ^0.8.0;

import {TokenLogic} from "../TokenLogic.sol";
import {TokenStandard} from "../../IToken.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {ERC721BurnableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import {ERC721EnumerableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import {ERC721URIStorageUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import {IERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import {TransferData} from "../../../extensions/IExtension.sol";
import {TokenRoles} from "../../../utils/roles/TokenRoles.sol";
import {ERC721TokenInterface} from "../../registry/ERC721TokenInterface.sol";
import {TokenEventManager} from "../../eventmanager/TokenEventManager.sol";
import {_getProtectedTokenData, ERC721ProtectedTokenData} from "../../logic/ERC721/IERC721Logic.sol";

contract ERC721Logic is
    ERC721TokenInterface,
    TokenLogic,
    ERC721Upgradeable,
    ERC721URIStorageUpgradeable,
    ERC721EnumerableUpgradeable,
    ERC721BurnableUpgradeable
{
    bytes private _currentData;
    bytes private _currentOperatorData;
    address private _currentOperator;

    string internal _contractUri;

    function _onInitialize(bool isConstructor, bytes memory initData)
        internal
        virtual
        override
        returns (bool)
    {
        if (isConstructor) {
            _init(initData);
        }

        return true;
    }

    function _init(bytes memory data) internal initializer {
        (
            string memory name_,
            string memory symbol_,
            bool allowMint,
            bool allowBurn,
            uint256 maxSupply_
        ) = abi.decode(data, (string, string, bool, bool, uint256));

        require(maxSupply_ > 0, "Max supply must be non-zero");

        ERC721ProtectedTokenData storage m = _getProtectedTokenData();
        m.name = name_;
        m.symbol = symbol_;
        m.maxSupply = maxSupply_;
        m.allowMint = allowMint;
        m.allowBurn = allowBurn;

        m.initialized = true;

        __ERC721_init(name_, symbol_);

        if (allowMint) {
            _addRole(owner(), TOKEN_MINTER_ROLE);
        }
    }

    /**
     * @dev Function to mint tokens
     * @param to The address that will receive the minted tokens.
     * @param tokenId The token id to mint.
     * @return A boolean that indicates if the operation was successful.
     */
    function mint(address to, uint256 tokenId)
        public
        onlyMinter
        returns (bool)
    {
        bytes memory extraData = _extractExtraCalldata(MINT_CALL_SIZE);
        _currentData = extraData;
        _currentOperatorData = extraData;

        _mint(to, tokenId);

        require(
            totalSupply() <= _getProtectedTokenData().maxSupply,
            "Max supply has been exceeded"
        );

        return true;
    }

    function mintAndSetTokenURI(
        address to,
        uint256 tokenId,
        string memory uri
    ) public onlyMinter returns (bool) {
        _currentData = bytes(uri);
        _currentOperatorData = _currentData;

        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);
        return true;
    }

    function setTokenURI(uint256 tokenId, string memory uri)
        public
        virtual
        onlyMinter
    {
        _setTokenURI(tokenId, uri);
    }

    /**
     * @dev Override internal _safeTransfer to ensure _data gets passed
     * to extensions.
     */
    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal override {
        _currentData = _data;
        super._safeTransfer(from, to, tokenId, _data);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
    {
        bytes memory extraData = _extractExtraCalldata(BURN_CALL_SIZE);
        _currentData = extraData;
        _currentOperatorData = extraData;

        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function setContractURI(string memory uri) public virtual onlyOwner {
        _contractUri = uri;
    }

    function contractURI() public view returns (string memory) {
        return _contractUri;
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721Upgradeable, ERC721EnumerableUpgradeable) {
        address operator = _msgSender();
        if (_currentOperator != address(0)) {
            operator = _currentOperator;
        }

        // Explictly call the ERC721EnumerableUpgradeable version
        ERC721EnumerableUpgradeable._beforeTokenTransfer(from, to, tokenId);

        TransferData memory data = TransferData(
            address(this),
            _msgData(),
            0x00000000000000000000000000000000,
            operator,
            from,
            to,
            0,
            tokenId,
            _currentData,
            _currentOperatorData
        );

        _triggerTokenBeforeTransferEvent(data);
    }

    /**
     * @dev Hook that is called after any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        address operator = _msgSender();
        if (_currentOperator != address(0)) {
            operator = _currentOperator;
        }

        TransferData memory data = TransferData(
            address(this),
            _msgData(),
            0x00000000000000000000000000000000,
            operator,
            from,
            to,
            0,
            tokenId,
            _currentData,
            _currentOperatorData
        );

        _currentData = "";
        _currentOperatorData = "";
        _currentOperator = address(0);

        _triggerTokenTransferEvent(data);
    }

    function tokenTransfer(TransferData calldata td)
        external
        override
        returns (bool)
    {
        require(td.token == address(this), "Invalid transfer data: token");

        if (td.partition != bytes32(0)) {
            return false; //We cannot do partition transfers
        }

        if (td.value > 0) {
            return false; //We cannot do value transfers
        }

        _currentData = td.data;
        _currentOperatorData = td.operatorData;
        _currentOperator = td.operator;
        _safeTransfer(td.from, td.to, td.value, td.data);

        return true;
    }

    function tokenStandard() external pure override returns (TokenStandard) {
        return TokenStandard.ERC721;
    }

    // Override normal transfer functions
    // That way we can grab any extra data
    // that may be attached to the calldata
    uint256 private constant APPROVE_CALL_SIZE = 4 + 32 + 32;
    uint256 private constant BURN_CALL_SIZE = 4 + 32;
    uint256 private constant MINT_CALL_SIZE = 4 + 32 + 32;
    uint256 private constant TRANSFER_FROM_CALL_SIZE = 4 + 32 + 32 + 32;

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        _currentData = _data;
        _currentOperatorData = _data;

        return ERC721Upgradeable.safeTransferFrom(from, to, tokenId, _data);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        bytes memory extraData = _extractExtraCalldata(TRANSFER_FROM_CALL_SIZE);
        _currentData = extraData;
        _currentOperatorData = extraData;

        return ERC721Upgradeable.safeTransferFrom(from, to, tokenId);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        bytes memory extraData = _extractExtraCalldata(TRANSFER_FROM_CALL_SIZE);
        _currentData = extraData;
        _currentOperatorData = extraData;

        return ERC721Upgradeable.transferFrom(from, to, tokenId);
    }

    function setApprovalForAll(address operator, bool approved)
        public
        virtual
        override
    {
        super.setApprovalForAll(operator, approved);

        bytes memory extraData = _extractExtraCalldata(APPROVE_CALL_SIZE);

        TransferData memory data = TransferData(
            address(this),
            _msgData(),
            0x00000000000000000000000000000000,
            _msgSender(),
            _msgSender(),
            operator,
            0,
            0,
            extraData,
            extraData
        );

        _triggerTokenApprovalEvent(data);
    }

    function approve(address to, uint256 tokenId) public virtual override {
        super.approve(to, tokenId);

        bytes memory extraData = _extractExtraCalldata(APPROVE_CALL_SIZE);

        TransferData memory data = TransferData(
            address(this),
            _msgData(),
            0x00000000000000000000000000000000,
            _msgSender(),
            _msgSender(),
            to,
            0,
            tokenId,
            extraData,
            extraData
        );

        _triggerTokenApprovalEvent(data);
    }

    function mintingAllowed() public view returns (bool) {
        ERC721ProtectedTokenData storage m = _getProtectedTokenData();
        return m.allowMint;
    }

    function burningAllowed() public view returns (bool) {
        ERC721ProtectedTokenData storage m = _getProtectedTokenData();
        return m.allowBurn;
    }

    /**
     * @notice Returns the maximum value the totalSupply() can be for this token
     */
    function maxSupply() external view returns (uint256) {
        return _getProtectedTokenData().maxSupply;
    }

    function _toggleMinting(bool allowMinting) internal {
        ERC721ProtectedTokenData storage m = _getProtectedTokenData();
        m.allowMint = allowMinting;
    }

    function _toggleBurning(bool allowBurning) internal {
        ERC721ProtectedTokenData storage m = _getProtectedTokenData();
        m.allowBurn = allowBurning;
    }
}
