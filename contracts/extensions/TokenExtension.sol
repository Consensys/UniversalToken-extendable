pragma solidity ^0.8.0;

import {ExtensionBase} from "./ExtensionBase.sol";
import {IExtension, TransferData, TokenStandard} from "./IExtension.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {RolesBase} from "../utils/roles/RolesBase.sol";
import {IERC20Proxy} from "../tokens/proxy/ERC20/IERC20Proxy.sol";
import {TokenRolesConstants} from "../utils/roles/TokenRolesConstants.sol";
import {IToken} from "../tokens/IToken.sol";
import {ITokenEventManager} from "../tokens/eventmanager/ITokenEventManager.sol";
import {TokenEventConstants} from "../tokens/eventmanager/TokenEventConstants.sol";

/**
 * @title Token Extension Contract
 * @notice This shouldn't be used directly, it should be extended by child contracts
 * @dev This contract setups the base of every Token Extension contract. It
 * defines a set data structure for holding important information about
 * the current Extension registration instance. This includes the extension
 * supported token standards, function signatures, supported interfaces,
 * deployer address and extension version.
 *
 * The TokenExtension also defines three functions that allow extensions to register
 * callbacks to specific events: _listenForTokenTransfers, _listenForTokenBeforeTransfers,
 * _listenForTokenApprovals
 *
 * The ExtensionBase also provides several function modifiers to restrict function
 * invokation
 */
abstract contract TokenExtension is
    TokenRolesConstants,
    TokenEventConstants,
    IExtension,
    ExtensionBase,
    RolesBase
{
    // map of supported token standards
    mapping(TokenStandard => bool) private supportedTokenStandards;
    //Should only be modified inside the constructor
    bytes4[] private _exposedFuncSigs;
    mapping(bytes4 => bool) private _interfaceMap;
    bytes32[] private _requiredRoles;
    address private _deployer;
    uint256 private _version;
    string private _package;
    bytes32 private _packageHash;
    string private _interfaceLabel;

    /**
     * @dev Invoke TokenExtension constructor and set the deployer as well as register
     * the packageHash
     */
    constructor() {
        _deployer = msg.sender;
        __update_package_hash();
    }

    /**
     * @dev Generates an hash given the deployer and package name
     */
    function __update_package_hash() private {
        _packageHash = keccak256(abi.encodePacked(_deployer, _package));
    }

    /**
     * @dev Sets the package version. Can only be called within
     * the constructor
     * @param __version version of the extension being deployed
     */
    function _setVersion(uint256 __version) internal {
        require(
            _isInsideConstructorCall(),
            "Function must be called inside the constructor"
        );

        _version = __version;
    }

    /**
     * @dev Sets the package name. Can only be called within
     * the constructor
     * @param package name of the extension being deployed
     */
    function _setPackageName(string memory package) internal {
        require(
            _isInsideConstructorCall(),
            "Function must be called inside the constructor"
        );

        _package = package;

        __update_package_hash();
    }

    /**
     * @dev Sets token standard as supported. Can only be called
     * within the constructor. Valid token standards referenced in
     * the TokenStandards enum
     * @param tokenStandard a valid token standard that the extension supports.
     */
    function _supportsTokenStandard(TokenStandard tokenStandard) internal {
        require(
            _isInsideConstructorCall(),
            "Function must be called inside the constructor"
        );
        supportedTokenStandards[tokenStandard] = true;
    }

    /**
     * @dev Sets the interface label of the extension. Can only be
     * called within the constructor and should be called for
     * every extension.
     * @param interfaceLabel_ the interface label.
     */
    function _setInterfaceLabel(string memory interfaceLabel_) internal {
        require(
            _isInsideConstructorCall(),
            "Function must be called inside the constructor"
        );

        _interfaceLabel = interfaceLabel_;
    }

    /**
     * @dev Sets all valid token standard as supported. Can only
     * be called within the constructor.
     */
    function _supportsAllTokenStandards() internal {
        _supportsTokenStandard(TokenStandard.ERC20);
        _supportsTokenStandard(TokenStandard.ERC721);
        _supportsTokenStandard(TokenStandard.ERC1400);
        _supportsTokenStandard(TokenStandard.ERC1155);
    }

    /**
     * @notice Gets the extension deployer address
     * @return the extension deployer address
     */
    function extensionDeployer() external view override returns (address) {
        return _deployer;
    }

    /**
     * @notice Gets the package hash (generated using the package name and
     * deployer address)
     * @return the package hash
     */
    function packageHash() external view override returns (bytes32) {
        return _packageHash;
    }

    /**
     * @notice Gets the package version
     * @return the package version
     */
    function version() external view override returns (uint256) {
        return _version;
    }

    /**
     * @notice Checks if token standard is supported by the extension
     * @param standard a valid TokenStandard (enum)
     * @return a bool. True if the token standard is supported. False otherwise
     */
    function isTokenStandardSupported(TokenStandard standard)
        external
        view
        override
        returns (bool)
    {
        return supportedTokenStandards[standard];
    }

    /**
     * @dev A function modifier to only allow the token owner to execute this function
     */
    modifier onlyOwner() {
        require(
            _msgSender() == _tokenOwner(),
            "Only the token owner can invoke"
        );
        _;
    }

    /**
     * @dev A function modifier to only allow the token owner or the address
     * that registered the extension to execute this function
     */
    modifier onlyTokenOrOwner() {
        address msgSender = _msgSender();
        require(
            msgSender == _tokenOwner() || msgSender == _tokenAddress(),
            "Only the token or token owner can invoke"
        );
        _;
    }

    /**
     * @dev Specify a token role Id that this extension requires. For example
     * if an extension needs to mint tokens then it should require TOKEN_MINTER_ROLE.
     * Can only be called within the constructor.
     * @param roleId the role id.
     */
    function _requireRole(bytes32 roleId) internal {
        require(
            _isInsideConstructorCall(),
            "Function must be called inside the constructor"
        );
        _requiredRoles.push(roleId);
    }

    /**
     * @dev Specify a specific interface label that this extension supports.
     * Can only be called within the constructor.
     * @param interfaceId the interface id.
     */
    function _supportInterface(bytes4 interfaceId) internal {
        require(
            _isInsideConstructorCall(),
            "Function must be called inside the constructor"
        );
        _interfaceMap[interfaceId] = true;
    }

    /**
     * @dev Same as `_registerFunction(bytes4)`, however
     * lets you specify a function by its function signature.
     * Can only be called within the constructor.
     * @param selector the extension function signature.
     */
    function _registerFunctionName(string memory selector) internal {
        _registerFunction(bytes4(keccak256(abi.encodePacked(selector))));
    }

    /**
     * @dev Register a function selector to be added to the token.
     * If this function is invoked on the token, then this extension
     * instance will be invoked. Can only be called within the constructor.
     * @param selector the extension function selector.
     */
    function _registerFunction(bytes4 selector) internal {
        require(
            _isInsideConstructorCall(),
            "Function must be called inside the constructor"
        );
        _exposedFuncSigs.push(selector);
    }

    /**
     * @notice An array of function signatures registered by the extension
     * @dev This function is used by the TokenProxy to determine what
     * function selectors to add to the TokenProxy
     * @return An array containing the function signatures registered by the extension
     */
    function externalFunctions()
        external
        view
        override
        returns (bytes4[] memory)
    {
        return _exposedFuncSigs;
    }

    /**
     * @notice Gets the list of required roles required to call the extension
     * @return a bytes32 array. The required roles in order to call the extension
     */
    function requiredRoles() external view override returns (bytes32[] memory) {
        return _requiredRoles;
    }

    /**
     * @dev Checks if execution context is within the contract constructor
     * @return bool. True if within the constructor, false otherwise.
     */
    function _isInsideConstructorCall() internal view returns (bool) {
        uint256 size;
        address addr = address(this);
        assembly {
            size := extcodesize(addr)
        }
        return size == 0;
    }

    /**
     * @notice The ERC1820 interface label the extension will be registered as
     * in the ERC1820 registry
     */
    function interfaceLabel() external view override returns (string memory) {
        return _interfaceLabel;
    }

    /**
     * @dev Checks if address is the token owner
     * @param addr address
     * @return bool. True if address is token owner, false otherwise.
     */
    function _isTokenOwner(address addr) internal view returns (bool) {
        return addr == _tokenOwner();
    }

    // TODO Move to specific Erc20TokenExtension contract?!?
    /**
     * @dev Explicit method for erc20 tokens. I returns an erc20 proxy contract interface
     * @return IERC20Proxy. Returns an erc20 proxy contract interface.
     */
    function _erc20Token() internal view returns (IERC20Proxy) {
        return IERC20Proxy(_tokenAddress());
    }

    /**
     * @dev Explicit method for erc20 tokens. I returns an erc20 proxy contract interface
     * @return address. Owner address of the registered token
     */
    function _tokenOwner() internal view returns (address) {
        Ownable token = Ownable(_tokenAddress());

        return token.owner();
    }

    /**
     * @dev Creates a TransferData structure, to be used as an argument for tokenTransfer
     * function. Also it is relevant to point out that TransferData supports
     * all token standards available in this enum TokenStandard
     * @return TransferData struct.
     */
    function _buildTransfer(
        address from,
        address to,
        uint256 amountOrTokenId
    ) internal view returns (TransferData memory) {
        uint256 amount = amountOrTokenId;
        uint256 tokenId = 0;
        if (_tokenStandard() == TokenStandard.ERC721) {
            amount = 0;
            tokenId = amountOrTokenId;
        }

        address token = _tokenAddress();
        return
            TransferData(
                token,
                _msgData(),
                bytes32(0),
                _extensionAddress(),
                from,
                to,
                amount,
                tokenId,
                bytes(""),
                bytes("")
            );
    }

    /**
     * @dev Perform a transfer given a TransferData struct. Only addresses with the
     * token controllers role should be able to invoke this function.
     * @return bool If this contract does not support the transfer requested, it should return false.
     * If the contract does support the transfer but the transfer is impossible, it should revert.
     * If the contract does support the transfer and successfully performs the transfer, it should return true
     */
    function _tokenTransfer(TransferData memory tdata) internal returns (bool) {
        return IToken(_tokenAddress()).tokenTransfer(tdata);
    }

    /**
     * @dev Listen for token transfers and invoke the provided callback function.
     * When the callback is invoked, the transfer has already occured.
     * It is important that the callback has the onlyToken modifier in order to ensure that
     * only the token can execute the callback function.
     * @param callback an external/public function that has TransferData as argument.
     */
    function _listenForTokenTransfers(
        function(TransferData memory) external returns (bool) callback
    ) internal {
        ITokenEventManager eventManager = ITokenEventManager(_tokenAddress());

        eventManager.on(TOKEN_TRANSFER_EVENT, callback);
    }

    /**
     * @dev Listen for token approvals and invoke the provided callback function.
     * When the callback is invoked, the approval has already occured.
     * It is important that the callback has the onlyToken modifier in order to ensure that
     * only the token can execute the callback function.
     * @param callback an external/public function that has TransferData as argument.
     */
    function _listenForTokenBeforeTransfers(
        function(TransferData memory) external returns (bool) callback
    ) internal {
        ITokenEventManager eventManager = ITokenEventManager(_tokenAddress());
        eventManager.on(TOKEN_BEFORE_TRANSFER_EVENT, callback);
    }

    /**
     * @dev Listen for token transfers and invoke the provided callback function.
     * The callback is invoked right before the transfer occurs.
     * It is important that the callback has the onlyToken modifier in order to ensure that
     * only the token can execute the callback function
     * @param callback an external/public function that has TransferData as argument.
     */
    function _listenForTokenApprovals(
        function(TransferData memory) external returns (bool) callback
    ) internal {
        ITokenEventManager eventManager = ITokenEventManager(_tokenAddress());

        eventManager.on(TOKEN_APPROVE_EVENT, callback);
    }
}
