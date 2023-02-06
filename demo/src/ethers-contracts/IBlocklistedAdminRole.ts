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

export interface IBlocklistedAdminRoleInterface extends utils.Interface {
  functions: {
    "isBlocklistedAdmin(address)": FunctionFragment;
    "addBlocklistedAdmin(address)": FunctionFragment;
    "removeBlocklistedAdmin(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "isBlocklistedAdmin"
      | "addBlocklistedAdmin"
      | "removeBlocklistedAdmin"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "isBlocklistedAdmin",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "addBlocklistedAdmin",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "removeBlocklistedAdmin",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "isBlocklistedAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addBlocklistedAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeBlocklistedAdmin",
    data: BytesLike
  ): Result;

  events: {
    "BlocklistedAdminAdded(address)": EventFragment;
    "BlocklistedAdminRemoved(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BlocklistedAdminAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BlocklistedAdminRemoved"): EventFragment;
}

export interface BlocklistedAdminAddedEventObject {
  account: string;
}
export type BlocklistedAdminAddedEvent = TypedEvent<
  [string],
  BlocklistedAdminAddedEventObject
>;

export type BlocklistedAdminAddedEventFilter =
  TypedEventFilter<BlocklistedAdminAddedEvent>;

export interface BlocklistedAdminRemovedEventObject {
  account: string;
}
export type BlocklistedAdminRemovedEvent = TypedEvent<
  [string],
  BlocklistedAdminRemovedEventObject
>;

export type BlocklistedAdminRemovedEventFilter =
  TypedEventFilter<BlocklistedAdminRemovedEvent>;

export interface IBlocklistedAdminRole extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IBlocklistedAdminRoleInterface;

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
    isBlocklistedAdmin(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    addBlocklistedAdmin(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeBlocklistedAdmin(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  isBlocklistedAdmin(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  addBlocklistedAdmin(
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeBlocklistedAdmin(
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    isBlocklistedAdmin(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    addBlocklistedAdmin(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    removeBlocklistedAdmin(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "BlocklistedAdminAdded(address)"(
      account?: PromiseOrValue<string> | null
    ): BlocklistedAdminAddedEventFilter;
    BlocklistedAdminAdded(
      account?: PromiseOrValue<string> | null
    ): BlocklistedAdminAddedEventFilter;

    "BlocklistedAdminRemoved(address)"(
      account?: PromiseOrValue<string> | null
    ): BlocklistedAdminRemovedEventFilter;
    BlocklistedAdminRemoved(
      account?: PromiseOrValue<string> | null
    ): BlocklistedAdminRemovedEventFilter;
  };

  estimateGas: {
    isBlocklistedAdmin(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    addBlocklistedAdmin(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeBlocklistedAdmin(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    isBlocklistedAdmin(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    addBlocklistedAdmin(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeBlocklistedAdmin(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}