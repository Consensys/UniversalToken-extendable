/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface IExtensionMetadataInterface extends utils.Interface {
  functions: {
    "externalFunctions()": FunctionFragment;
    "requiredRoles()": FunctionFragment;
    "isTokenStandardSupported(uint8)": FunctionFragment;
    "extensionDeployer()": FunctionFragment;
    "packageHash()": FunctionFragment;
    "version()": FunctionFragment;
    "interfaceLabel()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "externalFunctions"
      | "requiredRoles"
      | "isTokenStandardSupported"
      | "extensionDeployer"
      | "packageHash"
      | "version"
      | "interfaceLabel"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "externalFunctions",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "requiredRoles",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isTokenStandardSupported",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "extensionDeployer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "packageHash",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "interfaceLabel",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "externalFunctions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requiredRoles",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isTokenStandardSupported",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "extensionDeployer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "packageHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "interfaceLabel",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IExtensionMetadata extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IExtensionMetadataInterface;

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
     * This function is used by the TokenProxy to determine what function selectors to add to the TokenProxy
     * An array of function signatures this extension adds when registered when a TokenProxy
     */
    externalFunctions(overrides?: CallOverrides): Promise<[string[]]>;

    /**
     * This function is used by the TokenProxy to determine what roles to grant to the extension after registration and what roles to remove when removing the extension
     * An array of role IDs that this extension requires from the Token in order to function properly
     */
    requiredRoles(overrides?: CallOverrides): Promise<[string[]]>;

    /**
     * Whether a given Token standard is supported by this Extension
     * @param standard The standard to check support for
     */
    isTokenStandardSupported(
      standard: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    /**
     * The address that deployed this extension.
     */
    extensionDeployer(overrides?: CallOverrides): Promise<[string]>;

    /**
     * The hash of the package string this extension was deployed with
     */
    packageHash(overrides?: CallOverrides): Promise<[string]>;

    /**
     * The version of this extension, represented as a number
     */
    version(overrides?: CallOverrides): Promise<[BigNumber]>;

    /**
     * The ERC1820 interface label the extension will be registered as in the ERC1820 registry
     */
    interfaceLabel(overrides?: CallOverrides): Promise<[string]>;
  };

  /**
   * This function is used by the TokenProxy to determine what function selectors to add to the TokenProxy
   * An array of function signatures this extension adds when registered when a TokenProxy
   */
  externalFunctions(overrides?: CallOverrides): Promise<string[]>;

  /**
   * This function is used by the TokenProxy to determine what roles to grant to the extension after registration and what roles to remove when removing the extension
   * An array of role IDs that this extension requires from the Token in order to function properly
   */
  requiredRoles(overrides?: CallOverrides): Promise<string[]>;

  /**
   * Whether a given Token standard is supported by this Extension
   * @param standard The standard to check support for
   */
  isTokenStandardSupported(
    standard: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  /**
   * The address that deployed this extension.
   */
  extensionDeployer(overrides?: CallOverrides): Promise<string>;

  /**
   * The hash of the package string this extension was deployed with
   */
  packageHash(overrides?: CallOverrides): Promise<string>;

  /**
   * The version of this extension, represented as a number
   */
  version(overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * The ERC1820 interface label the extension will be registered as in the ERC1820 registry
   */
  interfaceLabel(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    /**
     * This function is used by the TokenProxy to determine what function selectors to add to the TokenProxy
     * An array of function signatures this extension adds when registered when a TokenProxy
     */
    externalFunctions(overrides?: CallOverrides): Promise<string[]>;

    /**
     * This function is used by the TokenProxy to determine what roles to grant to the extension after registration and what roles to remove when removing the extension
     * An array of role IDs that this extension requires from the Token in order to function properly
     */
    requiredRoles(overrides?: CallOverrides): Promise<string[]>;

    /**
     * Whether a given Token standard is supported by this Extension
     * @param standard The standard to check support for
     */
    isTokenStandardSupported(
      standard: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    /**
     * The address that deployed this extension.
     */
    extensionDeployer(overrides?: CallOverrides): Promise<string>;

    /**
     * The hash of the package string this extension was deployed with
     */
    packageHash(overrides?: CallOverrides): Promise<string>;

    /**
     * The version of this extension, represented as a number
     */
    version(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * The ERC1820 interface label the extension will be registered as in the ERC1820 registry
     */
    interfaceLabel(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    /**
     * This function is used by the TokenProxy to determine what function selectors to add to the TokenProxy
     * An array of function signatures this extension adds when registered when a TokenProxy
     */
    externalFunctions(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * This function is used by the TokenProxy to determine what roles to grant to the extension after registration and what roles to remove when removing the extension
     * An array of role IDs that this extension requires from the Token in order to function properly
     */
    requiredRoles(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Whether a given Token standard is supported by this Extension
     * @param standard The standard to check support for
     */
    isTokenStandardSupported(
      standard: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    /**
     * The address that deployed this extension.
     */
    extensionDeployer(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * The hash of the package string this extension was deployed with
     */
    packageHash(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * The version of this extension, represented as a number
     */
    version(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * The ERC1820 interface label the extension will be registered as in the ERC1820 registry
     */
    interfaceLabel(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    /**
     * This function is used by the TokenProxy to determine what function selectors to add to the TokenProxy
     * An array of function signatures this extension adds when registered when a TokenProxy
     */
    externalFunctions(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * This function is used by the TokenProxy to determine what roles to grant to the extension after registration and what roles to remove when removing the extension
     * An array of role IDs that this extension requires from the Token in order to function properly
     */
    requiredRoles(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Whether a given Token standard is supported by this Extension
     * @param standard The standard to check support for
     */
    isTokenStandardSupported(
      standard: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    /**
     * The address that deployed this extension.
     */
    extensionDeployer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * The hash of the package string this extension was deployed with
     */
    packageHash(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * The version of this extension, represented as a number
     */
    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * The ERC1820 interface label the extension will be registered as in the ERC1820 registry
     */
    interfaceLabel(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}