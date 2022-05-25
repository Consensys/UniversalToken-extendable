pragma solidity ^0.8.0;

import {ITokenLogic} from "../ITokenLogic.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

/**
* @notice Protected ERC20 token metadata stored in the proxy storage in a special storage slot.
* Includes thing such as name, symbol and deployment options.
* @dev This struct should only be written to inside the constructor and should be treated as readonly.
* Solidity 0.8.7 does not have anything for marking storage slots as read-only, so we'll just use
* the honor system for now.
* @param initialized Whether this proxy is initialized
* @param name The name of this ERC20 token. This is stored here as a backup (required for _domainName inside constructor)
* @param symbol The symbol of this ERC20 token. This is stored here as a backup
* @param maxSupply The max supply of token allowed
* @param allowMint Whether minting is allowed
* @param allowBurn Whether burning is allowed
*/
struct ERC20ProtectedTokenData {
    bool initialized;
    string name;
    string symbol;
    uint256 maxSupply;
    bool allowMint;
    bool allowBurn;
}

/**
* @title Upgradable ERC20 Logic Interface
* @notice An interface to interact with an ERC20 Token (logic).
*/
interface IERC20Logic is IERC20Metadata, ITokenLogic {
    /**
     * @notice Destroys `amount` tokens from the caller.
     *
     * @dev See {ERC20-_burn}.
     * @param amount The amount of tokens to burn from the caller.
     */
    function burn(uint256 amount) external returns (bool);

    /**
     * @notice Creates `amount` new tokens for `to`.
     *
     * @dev See {ERC20-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     * @param recipient The address to mint tokens to
     * @param amount The amount of new tokens to mint
     */
    function mint(address recipient, uint256 amount) external returns (bool);

    /**
     * @notice Destroys `amount` tokens from `account`, deducting from the caller's
     * allowance.
     *
     * @dev See {ERC20-_burn} and {ERC20-allowance}.
     *
     * Requirements:
     *
     * - the caller must have allowance for ``accounts``'s tokens of at least
     * `amount`.
     * @param account The account to burn from
     * @param amount The amount of tokens to burn
     */
    function burnFrom(address account, uint256 amount) external returns (bool);

    /**
     * @notice Atomically decreases the allowance granted to `spender` by the caller.
     *
     * @dev This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     * @param spender The address that will be given the allownace decrease
     * @param amount How much the allowance should be decreased by
     */
    function decreaseAllowance(address spender, uint256 amount) external returns (bool);

    /** 
     * @notice Atomically increases the allowance granted to `spender` by the caller.
     *
     * @dev This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * @param spender The address that will be given the allownace increase
     * @param amount How much the allowance should be increased by
     */
    function increaseAllowance(address spender, uint256 amount) external returns (bool);

    /**
    * @notice Returns true if minting is allowed on this token, otherwise false
    */
    function mintingAllowed() external view returns (bool);

    /**
    * @notice Returns true if burning is allowed on this token, otherwise false
    */
    function burningAllowed() external view returns (bool);

    /**
    * @notice Returns the maximum value the totalSupply() can be for this token
    */
    function maxSupply() external view returns (uint256);
}