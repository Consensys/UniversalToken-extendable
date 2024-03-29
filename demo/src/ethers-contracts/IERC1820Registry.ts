/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface IERC1820RegistryInterface extends utils.Interface {
  functions: {
    "setManager(address,address)": FunctionFragment;
    "getManager(address)": FunctionFragment;
    "setInterfaceImplementer(address,bytes32,address)": FunctionFragment;
    "getInterfaceImplementer(address,bytes32)": FunctionFragment;
    "interfaceHash(string)": FunctionFragment;
    "updateERC165Cache(address,bytes4)": FunctionFragment;
    "implementsERC165Interface(address,bytes4)": FunctionFragment;
    "implementsERC165InterfaceNoCache(address,bytes4)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "setManager"
      | "getManager"
      | "setInterfaceImplementer"
      | "getInterfaceImplementer"
      | "interfaceHash"
      | "updateERC165Cache"
      | "implementsERC165Interface"
      | "implementsERC165InterfaceNoCache"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "setManager",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getManager",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setInterfaceImplementer",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getInterfaceImplementer",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "interfaceHash",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateERC165Cache",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "implementsERC165Interface",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "implementsERC165InterfaceNoCache",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(functionFragment: "setManager", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getManager", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setInterfaceImplementer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInterfaceImplementer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "interfaceHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateERC165Cache",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "implementsERC165Interface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "implementsERC165InterfaceNoCache",
    data: BytesLike
  ): Result;

  events: {
    "InterfaceImplementerSet(address,bytes32,address)": EventFragment;
    "ManagerChanged(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "InterfaceImplementerSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ManagerChanged"): EventFragment;
}

export interface InterfaceImplementerSetEventObject {
  account: string;
  interfaceHash: string;
  implementer: string;
}
export type InterfaceImplementerSetEvent = TypedEvent<
  [string, string, string],
  InterfaceImplementerSetEventObject
>;

export type InterfaceImplementerSetEventFilter =
  TypedEventFilter<InterfaceImplementerSetEvent>;

export interface ManagerChangedEventObject {
  account: string;
  newManager: string;
}
export type ManagerChangedEvent = TypedEvent<
  [string, string],
  ManagerChangedEventObject
>;

export type ManagerChangedEventFilter = TypedEventFilter<ManagerChangedEvent>;

export interface IERC1820Registry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IERC1820RegistryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    /**
     * Sets `newManager` as the manager for `account`. A manager of an account is able to set interface implementers for it. By default, each account is its own manager. Passing a value of `0x0` in `newManager` will reset the manager to this initial state. Emits a {ManagerChanged} event. Requirements: - the caller must be the current manager for `account`.
     */
    setManager(
      account: PromiseOrValue<string>,
      newManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    /**
     * Returns the manager for `account`. See {setManager}.
     */
    getManager(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    /**
     * Sets the `implementer` contract as ``account``'s implementer for `interfaceHash`. `account` being the zero address is an alias for the caller's address. The zero address can also be used in `implementer` to remove an old one. See {interfaceHash} to learn how these are created. Emits an {InterfaceImplementerSet} event. Requirements: - the caller must be the current manager for `account`. - `interfaceHash` must not be an {IERC165} interface id (i.e. it must not end in 28 zeroes). - `implementer` must implement {IERC1820Implementer} and return true when queried for support, unless `implementer` is the caller. See {IERC1820Implementer-canImplementInterfaceForAddress}.
     */
    setInterfaceImplementer(
      account: PromiseOrValue<string>,
      _interfaceHash: PromiseOrValue<BytesLike>,
      implementer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    /**
     * Returns the implementer of `interfaceHash` for `account`. If no such implementer is registered, returns the zero address. If `interfaceHash` is an {IERC165} interface id (i.e. it ends with 28 zeroes), `account` will be queried for support of it. `account` being the zero address is an alias for the caller's address.
     */
    getInterfaceImplementer(
      account: PromiseOrValue<string>,
      _interfaceHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    /**
     * Returns the interface hash for an `interfaceName`, as defined in the corresponding https://eips.ethereum.org/EIPS/eip-1820#interface-name[section of the EIP].
     */
    interfaceHash(
      interfaceName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    /**
     * Updates the cache with whether the contract implements an ERC165 interface or not.
     * @param account Address of the contract for which to update the cache.
     * @param interfaceId ERC165 interface for which to update the cache.
     */
    updateERC165Cache(
      account: PromiseOrValue<string>,
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    /**
     * Checks whether a contract implements an ERC165 interface or not. If the result is not cached a direct lookup on the contract address is performed. If the result is not cached or the cached value is out-of-date, the cache MUST be updated manually by calling {updateERC165Cache} with the contract address.
     * @param account Address of the contract to check.
     * @param interfaceId ERC165 interface to check.
     */
    implementsERC165Interface(
      account: PromiseOrValue<string>,
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    /**
     * Checks whether a contract implements an ERC165 interface or not without using nor updating the cache.
     * @param account Address of the contract to check.
     * @param interfaceId ERC165 interface to check.
     */
    implementsERC165InterfaceNoCache(
      account: PromiseOrValue<string>,
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  /**
   * Sets `newManager` as the manager for `account`. A manager of an account is able to set interface implementers for it. By default, each account is its own manager. Passing a value of `0x0` in `newManager` will reset the manager to this initial state. Emits a {ManagerChanged} event. Requirements: - the caller must be the current manager for `account`.
   */
  setManager(
    account: PromiseOrValue<string>,
    newManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  /**
   * Returns the manager for `account`. See {setManager}.
   */
  getManager(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  /**
   * Sets the `implementer` contract as ``account``'s implementer for `interfaceHash`. `account` being the zero address is an alias for the caller's address. The zero address can also be used in `implementer` to remove an old one. See {interfaceHash} to learn how these are created. Emits an {InterfaceImplementerSet} event. Requirements: - the caller must be the current manager for `account`. - `interfaceHash` must not be an {IERC165} interface id (i.e. it must not end in 28 zeroes). - `implementer` must implement {IERC1820Implementer} and return true when queried for support, unless `implementer` is the caller. See {IERC1820Implementer-canImplementInterfaceForAddress}.
   */
  setInterfaceImplementer(
    account: PromiseOrValue<string>,
    _interfaceHash: PromiseOrValue<BytesLike>,
    implementer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  /**
   * Returns the implementer of `interfaceHash` for `account`. If no such implementer is registered, returns the zero address. If `interfaceHash` is an {IERC165} interface id (i.e. it ends with 28 zeroes), `account` will be queried for support of it. `account` being the zero address is an alias for the caller's address.
   */
  getInterfaceImplementer(
    account: PromiseOrValue<string>,
    _interfaceHash: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  /**
   * Returns the interface hash for an `interfaceName`, as defined in the corresponding https://eips.ethereum.org/EIPS/eip-1820#interface-name[section of the EIP].
   */
  interfaceHash(
    interfaceName: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  /**
   * Updates the cache with whether the contract implements an ERC165 interface or not.
   * @param account Address of the contract for which to update the cache.
   * @param interfaceId ERC165 interface for which to update the cache.
   */
  updateERC165Cache(
    account: PromiseOrValue<string>,
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  /**
   * Checks whether a contract implements an ERC165 interface or not. If the result is not cached a direct lookup on the contract address is performed. If the result is not cached or the cached value is out-of-date, the cache MUST be updated manually by calling {updateERC165Cache} with the contract address.
   * @param account Address of the contract to check.
   * @param interfaceId ERC165 interface to check.
   */
  implementsERC165Interface(
    account: PromiseOrValue<string>,
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  /**
   * Checks whether a contract implements an ERC165 interface or not without using nor updating the cache.
   * @param account Address of the contract to check.
   * @param interfaceId ERC165 interface to check.
   */
  implementsERC165InterfaceNoCache(
    account: PromiseOrValue<string>,
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    /**
     * Sets `newManager` as the manager for `account`. A manager of an account is able to set interface implementers for it. By default, each account is its own manager. Passing a value of `0x0` in `newManager` will reset the manager to this initial state. Emits a {ManagerChanged} event. Requirements: - the caller must be the current manager for `account`.
     */
    setManager(
      account: PromiseOrValue<string>,
      newManager: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Returns the manager for `account`. See {setManager}.
     */
    getManager(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    /**
     * Sets the `implementer` contract as ``account``'s implementer for `interfaceHash`. `account` being the zero address is an alias for the caller's address. The zero address can also be used in `implementer` to remove an old one. See {interfaceHash} to learn how these are created. Emits an {InterfaceImplementerSet} event. Requirements: - the caller must be the current manager for `account`. - `interfaceHash` must not be an {IERC165} interface id (i.e. it must not end in 28 zeroes). - `implementer` must implement {IERC1820Implementer} and return true when queried for support, unless `implementer` is the caller. See {IERC1820Implementer-canImplementInterfaceForAddress}.
     */
    setInterfaceImplementer(
      account: PromiseOrValue<string>,
      _interfaceHash: PromiseOrValue<BytesLike>,
      implementer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Returns the implementer of `interfaceHash` for `account`. If no such implementer is registered, returns the zero address. If `interfaceHash` is an {IERC165} interface id (i.e. it ends with 28 zeroes), `account` will be queried for support of it. `account` being the zero address is an alias for the caller's address.
     */
    getInterfaceImplementer(
      account: PromiseOrValue<string>,
      _interfaceHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    /**
     * Returns the interface hash for an `interfaceName`, as defined in the corresponding https://eips.ethereum.org/EIPS/eip-1820#interface-name[section of the EIP].
     */
    interfaceHash(
      interfaceName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    /**
     * Updates the cache with whether the contract implements an ERC165 interface or not.
     * @param account Address of the contract for which to update the cache.
     * @param interfaceId ERC165 interface for which to update the cache.
     */
    updateERC165Cache(
      account: PromiseOrValue<string>,
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Checks whether a contract implements an ERC165 interface or not. If the result is not cached a direct lookup on the contract address is performed. If the result is not cached or the cached value is out-of-date, the cache MUST be updated manually by calling {updateERC165Cache} with the contract address.
     * @param account Address of the contract to check.
     * @param interfaceId ERC165 interface to check.
     */
    implementsERC165Interface(
      account: PromiseOrValue<string>,
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    /**
     * Checks whether a contract implements an ERC165 interface or not without using nor updating the cache.
     * @param account Address of the contract to check.
     * @param interfaceId ERC165 interface to check.
     */
    implementsERC165InterfaceNoCache(
      account: PromiseOrValue<string>,
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "InterfaceImplementerSet(address,bytes32,address)"(
      account?: PromiseOrValue<string> | null,
      interfaceHash?: PromiseOrValue<BytesLike> | null,
      implementer?: PromiseOrValue<string> | null
    ): InterfaceImplementerSetEventFilter;
    InterfaceImplementerSet(
      account?: PromiseOrValue<string> | null,
      interfaceHash?: PromiseOrValue<BytesLike> | null,
      implementer?: PromiseOrValue<string> | null
    ): InterfaceImplementerSetEventFilter;

    "ManagerChanged(address,address)"(
      account?: PromiseOrValue<string> | null,
      newManager?: PromiseOrValue<string> | null
    ): ManagerChangedEventFilter;
    ManagerChanged(
      account?: PromiseOrValue<string> | null,
      newManager?: PromiseOrValue<string> | null
    ): ManagerChangedEventFilter;
  };

  estimateGas: {
    /**
     * Sets `newManager` as the manager for `account`. A manager of an account is able to set interface implementers for it. By default, each account is its own manager. Passing a value of `0x0` in `newManager` will reset the manager to this initial state. Emits a {ManagerChanged} event. Requirements: - the caller must be the current manager for `account`.
     */
    setManager(
      account: PromiseOrValue<string>,
      newManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    /**
     * Returns the manager for `account`. See {setManager}.
     */
    getManager(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * Sets the `implementer` contract as ``account``'s implementer for `interfaceHash`. `account` being the zero address is an alias for the caller's address. The zero address can also be used in `implementer` to remove an old one. See {interfaceHash} to learn how these are created. Emits an {InterfaceImplementerSet} event. Requirements: - the caller must be the current manager for `account`. - `interfaceHash` must not be an {IERC165} interface id (i.e. it must not end in 28 zeroes). - `implementer` must implement {IERC1820Implementer} and return true when queried for support, unless `implementer` is the caller. See {IERC1820Implementer-canImplementInterfaceForAddress}.
     */
    setInterfaceImplementer(
      account: PromiseOrValue<string>,
      _interfaceHash: PromiseOrValue<BytesLike>,
      implementer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    /**
     * Returns the implementer of `interfaceHash` for `account`. If no such implementer is registered, returns the zero address. If `interfaceHash` is an {IERC165} interface id (i.e. it ends with 28 zeroes), `account` will be queried for support of it. `account` being the zero address is an alias for the caller's address.
     */
    getInterfaceImplementer(
      account: PromiseOrValue<string>,
      _interfaceHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * Returns the interface hash for an `interfaceName`, as defined in the corresponding https://eips.ethereum.org/EIPS/eip-1820#interface-name[section of the EIP].
     */
    interfaceHash(
      interfaceName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * Updates the cache with whether the contract implements an ERC165 interface or not.
     * @param account Address of the contract for which to update the cache.
     * @param interfaceId ERC165 interface for which to update the cache.
     */
    updateERC165Cache(
      account: PromiseOrValue<string>,
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    /**
     * Checks whether a contract implements an ERC165 interface or not. If the result is not cached a direct lookup on the contract address is performed. If the result is not cached or the cached value is out-of-date, the cache MUST be updated manually by calling {updateERC165Cache} with the contract address.
     * @param account Address of the contract to check.
     * @param interfaceId ERC165 interface to check.
     */
    implementsERC165Interface(
      account: PromiseOrValue<string>,
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * Checks whether a contract implements an ERC165 interface or not without using nor updating the cache.
     * @param account Address of the contract to check.
     * @param interfaceId ERC165 interface to check.
     */
    implementsERC165InterfaceNoCache(
      account: PromiseOrValue<string>,
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    /**
     * Sets `newManager` as the manager for `account`. A manager of an account is able to set interface implementers for it. By default, each account is its own manager. Passing a value of `0x0` in `newManager` will reset the manager to this initial state. Emits a {ManagerChanged} event. Requirements: - the caller must be the current manager for `account`.
     */
    setManager(
      account: PromiseOrValue<string>,
      newManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Returns the manager for `account`. See {setManager}.
     */
    getManager(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Sets the `implementer` contract as ``account``'s implementer for `interfaceHash`. `account` being the zero address is an alias for the caller's address. The zero address can also be used in `implementer` to remove an old one. See {interfaceHash} to learn how these are created. Emits an {InterfaceImplementerSet} event. Requirements: - the caller must be the current manager for `account`. - `interfaceHash` must not be an {IERC165} interface id (i.e. it must not end in 28 zeroes). - `implementer` must implement {IERC1820Implementer} and return true when queried for support, unless `implementer` is the caller. See {IERC1820Implementer-canImplementInterfaceForAddress}.
     */
    setInterfaceImplementer(
      account: PromiseOrValue<string>,
      _interfaceHash: PromiseOrValue<BytesLike>,
      implementer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Returns the implementer of `interfaceHash` for `account`. If no such implementer is registered, returns the zero address. If `interfaceHash` is an {IERC165} interface id (i.e. it ends with 28 zeroes), `account` will be queried for support of it. `account` being the zero address is an alias for the caller's address.
     */
    getInterfaceImplementer(
      account: PromiseOrValue<string>,
      _interfaceHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Returns the interface hash for an `interfaceName`, as defined in the corresponding https://eips.ethereum.org/EIPS/eip-1820#interface-name[section of the EIP].
     */
    interfaceHash(
      interfaceName: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Updates the cache with whether the contract implements an ERC165 interface or not.
     * @param account Address of the contract for which to update the cache.
     * @param interfaceId ERC165 interface for which to update the cache.
     */
    updateERC165Cache(
      account: PromiseOrValue<string>,
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    /**
     * Checks whether a contract implements an ERC165 interface or not. If the result is not cached a direct lookup on the contract address is performed. If the result is not cached or the cached value is out-of-date, the cache MUST be updated manually by calling {updateERC165Cache} with the contract address.
     * @param account Address of the contract to check.
     * @param interfaceId ERC165 interface to check.
     */
    implementsERC165Interface(
      account: PromiseOrValue<string>,
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * Checks whether a contract implements an ERC165 interface or not without using nor updating the cache.
     * @param account Address of the contract to check.
     * @param interfaceId ERC165 interface to check.
     */
    implementsERC165InterfaceNoCache(
      account: PromiseOrValue<string>,
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
