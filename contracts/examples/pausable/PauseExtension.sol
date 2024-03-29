// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import {IPausable} from "./IPausable.sol";
import {TokenExtension, TransferData} from "../../extensions/TokenExtension.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";

contract PauseExtension is TokenExtension, IPausable {
    bytes32 internal constant PAUSER_ROLE = keccak256("pausable.roles.pausers");

    bool private _isPaused;
    mapping(address => bool) private _pausedFor;

    constructor() {
        _registerFunction(PauseExtension.addPauser.selector);
        _registerFunction(PauseExtension.removePauser.selector);
        _registerFunction(PauseExtension.renouncePauser.selector);
        _registerFunction(PauseExtension.pause.selector);
        _registerFunction(PauseExtension.unpause.selector);
        _registerFunction(PauseExtension.pauseFor.selector);
        _registerFunction(PauseExtension.unpauseFor.selector);

        _registerFunctionName("isPaused()");
        _registerFunctionName("isPausedFor(address)");

        _supportInterface(type(IPausable).interfaceId);

        _supportsAllTokenStandards();

        _setPackageName("net.consensys.tokenext.PauseExtension");
        _setVersion(1);
    }

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     */
    modifier whenNotPaused() {
        require(!this.isPaused(), "Token must not be paused");
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is paused.
     */
    modifier whenPaused() {
        require(this.isPaused(), "Token must be paused");
        _;
    }

    modifier onlyPauser() {
        require(
            hasRole(_msgSender(), PAUSER_ROLE),
            "Only pausers can use this function"
        );
        _;
    }

    function isPaused() public view override returns (bool) {
        return _isPaused;
    }

    function initialize() external override {
        _addRole(_msgSender(), PAUSER_ROLE);
        _listenForTokenTransfers(this.onTransferExecuted);
        _listenForTokenApprovals(this.onTransferExecuted);
    }

    function pause() external override onlyPauser whenNotPaused {
        _isPaused = true;
        emit Paused(_msgSender());
    }

    function unpause() external override onlyPauser whenPaused {
        _isPaused = false;
        emit Unpaused(_msgSender());
    }

    function isPausedFor(address caller) public view override returns (bool) {
        return isPaused() || _pausedFor[caller];
    }

    function pauseFor(address caller) external override onlyPauser {
        _pausedFor[caller] = true;
    }

    function isPauser(address caller) external view override returns (bool) {
        return hasRole(caller, PAUSER_ROLE);
    }

    function unpauseFor(address caller) external override onlyPauser {
        _pausedFor[caller] = false;
    }

    function addPauser(address account) external override onlyPauser {
        _addPauser(account);
    }

    function removePauser(address account) external override onlyPauser {
        _removePauser(account);
    }

    function renouncePauser() external override {
        _removePauser(msg.sender);
    }

    function _addPauser(address account) internal {
        _addRole(account, PAUSER_ROLE);
        emit PauserAdded(account);
    }

    function _removePauser(address account) internal {
        _removeRole(account, PAUSER_ROLE);
        emit PauserRemoved(account);
    }

    function onTransferExecuted(TransferData memory data)
        external
        onlyToken
        returns (bool)
    {
        bool isPaused = isPausedFor(data.from);

        require(!isPaused, "Transfers are paused");

        return true;
    }
}
