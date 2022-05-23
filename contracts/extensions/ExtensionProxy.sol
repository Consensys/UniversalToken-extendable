pragma solidity ^0.8.0;

import {IToken} from "../tokens/IToken.sol";
import {IExtension} from "./IExtension.sol";
import {IExtensionMetadata, TokenStandard} from "./IExtensionMetadata.sol";
import {ExtensionBase} from "./ExtensionBase.sol";
import {StorageSlot} from "@openzeppelin/contracts/utils/StorageSlot.sol";

/**
 * @title Extension Proxy
 * @notice This contract can be interacted directly in a normal manner if the
 * caller is
 *   * An EOA
 *   * Not the registered token address
 *   * Not the registered admin
 *
 * If the caller is the registered token address or registered admin, then
 * each function call should be preceeded by a call to prepareCall.
 */
contract ExtensionProxy is IExtensionMetadata, ExtensionBase {
    event ExtensionUpgraded(
        address indexed extension,
        address indexed newExtension
    );

    constructor(
        address token,
        address extension,
        address callsite
    ) {
        //Ensure we support this token standard
        TokenStandard standard = IToken(token).tokenStandard();

        //Setup proxy data
        ProxyData storage ds = _proxyData();

        ds.token = token;
        ds.extension = extension;
        ds.callsite = callsite;
        ds.standard = standard;

        require(
            isTokenStandardSupported(standard),
            "Extension does not support token standard"
        );

        //Update EIP1967 Storage Slot
        bytes32 EIP1967_LOCATION = bytes32(
            uint256(keccak256("eip1967.proxy.implementation")) - 1
        );
        StorageSlot.getAddressSlot(EIP1967_LOCATION).value = extension;
    }

    /**
     * @return IExtension. The interface of the actual extension registered (logic contract).
     */
    function _extension() internal view returns (IExtension) {
        ProxyData storage ds = ExtensionBase._proxyData();
        return IExtension(ds.extension);
    }

    /**
     * @dev Upgrade the ExtensionProxy logic contract. Can only be executed by the current
     * admin of the extension address
     * @notice Perform an upgrade on the proxy and replace the current logic
     * contract with a new one. You must provide the new address of the
     * logic contract.
     * @param extensionImplementation The address of the new logic contract
     */
    function upgradeTo(address extensionImplementation)
        external
        onlyAuthorizedCaller
    {
        IExtension ext = IExtension(extensionImplementation);

        address currentDeployer = extensionDeployer();
        address newDeployer = ext.extensionDeployer();

        require(
            currentDeployer == newDeployer,
            "Deployer address for new extension is different than current"
        );

        bytes32 currentPackageHash = packageHash();
        bytes32 newPackageHash = ext.packageHash();

        require(
            currentPackageHash == newPackageHash,
            "Package for new extension is different than current"
        );

        uint256 currentVersion = version();
        uint256 newVersion = ext.version();

        require(currentVersion != newVersion, "Versions should not match");

        //TODO Check interfaces?

        //Ensure we support this token standard
        ProxyData storage ds = ExtensionBase._proxyData();
        TokenStandard standard = IToken(ds.token).tokenStandard();

        require(
            ext.isTokenStandardSupported(standard),
            "Token standard is not supported in new extension"
        );

        address old = ds.extension;
        ds.extension = extensionImplementation;

        //Update EIP1967 Storage Slot
        bytes32 EIP1967_LOCATION = bytes32(
            uint256(keccak256("eip1967.proxy.implementation")) - 1
        );
        StorageSlot
            .getAddressSlot(EIP1967_LOCATION)
            .value = extensionImplementation;

        emit ExtensionUpgraded(old, extensionImplementation);
    }

    fallback() external payable {
        ProxyData storage ds = _proxyData();

        _delegate(ds.extension);
    }

    /**
     * @notice This function cannot be invoked directly
     * @dev This function is invoked when the Extension is registered
     * with a TokenProxy
     */
    function initialize() external onlyAuthorizedCaller {
        ProxyData storage ds = _proxyData();

        ds.initialized = true;

        //now forward initalization to the extension
        _delegate(ds.extension);
    }

    /**
     * @dev Delegates execution to an implementation contract.
     * This is a low level function that doesn't return to its internal call site.
     * It will return to the external caller whatever the implementation returns.
     * @param implementation Address to delegate.
     */
    function _delegate(address implementation) internal {
        assembly {
            // Copy msg.data. We take full control of memory in this inline assembly
            // block because it will not return to Solidity code. We overwrite the
            // Solidity scratch pad at memory position 0.
            calldatacopy(0, 0, calldatasize())

            // Call the implementation.
            // out and outsize are 0 because we don't know the size yet.
            let result := delegatecall(
                gas(),
                implementation,
                0,
                calldatasize(),
                0,
                0
            )

            // Copy the returned data.
            returndatacopy(0, 0, returndatasize())

            switch result
            // delegatecall returns 0 on error.
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }

    /**
     * @notice An array of function signatures this extension adds when
     * registered with a TokenProxy
     * @dev This function is used by the TokenProxy to determine what
     * function selectors to add to the TokenProxy
     */
    function externalFunctions()
        external
        view
        override
        returns (bytes4[] memory)
    {
        return _extension().externalFunctions();
    }

    /**
     * @notice An array of role IDs that this extension requires from the Token
     * in order to function properly
     * @dev This function is used by the TokenProxy to determine what
     * roles to grant to the extension after registration and what roles to remove
     * when removing the extension
     */
    function requiredRoles() external view override returns (bytes32[] memory) {
        return _extension().requiredRoles();
    }

    /**
     * @notice Whether a given Token standard is supported by this Extension
     * @param standard The standard to check support for
     */
    function isTokenStandardSupported(TokenStandard standard)
        public
        view
        override
        returns (bool)
    {
        return _extension().isTokenStandardSupported(standard);
    }

    /**
     * @notice The address that deployed this extension.
     */
    function extensionDeployer() public view override returns (address) {
        return _extension().extensionDeployer();
    }

    /**
     * @notice The hash of the package string this extension was deployed with
     */
    function packageHash() public view override returns (bytes32) {
        return _extension().packageHash();
    }

    /**
     * @notice The version of this extension, represented as a number
     */
    function version() public view override returns (uint256) {
        return _extension().version();
    }

    /**
     * @notice The ERC1820 interface label the extension will be registered as in the ERC1820 registry
     */
    function interfaceLabel() public view override returns (string memory) {
        return _extension().interfaceLabel();
    }
}
