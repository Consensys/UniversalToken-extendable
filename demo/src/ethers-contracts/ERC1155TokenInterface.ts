/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
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

export interface ERC1155TokenInterfaceInterface extends utils.Interface {
  functions: {
    "canImplementInterfaceForAddress(bytes32,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "canImplementInterfaceForAddress"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "canImplementInterfaceForAddress",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "canImplementInterfaceForAddress",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ERC1155TokenInterface extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ERC1155TokenInterfaceInterface;

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
     * Indicates whether the contract implements the interface 'interfaceHash' for the address 'addr' or not.
     * @param addr Address for which the contract will implement the interface
     * @param interfaceHash keccak256 hash of the name of the interface
     */
    canImplementInterfaceForAddress(
      interfaceHash: PromiseOrValue<BytesLike>,
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  /**
   * Indicates whether the contract implements the interface 'interfaceHash' for the address 'addr' or not.
   * @param addr Address for which the contract will implement the interface
   * @param interfaceHash keccak256 hash of the name of the interface
   */
  canImplementInterfaceForAddress(
    interfaceHash: PromiseOrValue<BytesLike>,
    addr: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    /**
     * Indicates whether the contract implements the interface 'interfaceHash' for the address 'addr' or not.
     * @param addr Address for which the contract will implement the interface
     * @param interfaceHash keccak256 hash of the name of the interface
     */
    canImplementInterfaceForAddress(
      interfaceHash: PromiseOrValue<BytesLike>,
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    /**
     * Indicates whether the contract implements the interface 'interfaceHash' for the address 'addr' or not.
     * @param addr Address for which the contract will implement the interface
     * @param interfaceHash keccak256 hash of the name of the interface
     */
    canImplementInterfaceForAddress(
      interfaceHash: PromiseOrValue<BytesLike>,
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    /**
     * Indicates whether the contract implements the interface 'interfaceHash' for the address 'addr' or not.
     * @param addr Address for which the contract will implement the interface
     * @param interfaceHash keccak256 hash of the name of the interface
     */
    canImplementInterfaceForAddress(
      interfaceHash: PromiseOrValue<BytesLike>,
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
