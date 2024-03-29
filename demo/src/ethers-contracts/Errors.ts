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

export interface ErrorsInterface extends utils.Interface {
  functions: {
    "NO_CONTRACT_OWNER()": FunctionFragment;
    "SW_ALLOWANCE_NOT_GIVEN()": FunctionFragment;
    "SW_BEFORE_SETTLEMENT_DATE()": FunctionFragment;
    "SW_COMPETITION_ON_PRICE_OWNERSHIP()": FunctionFragment;
    "SW_ETH_AMOUNT_INCORRECT()": FunctionFragment;
    "SW_ETH_TRADE_REQUIRES_ESCROW()": FunctionFragment;
    "SW_EXECUTE_TRADE_POSSIBLE()": FunctionFragment;
    "SW_FORCE_TRADE_NOT_POSSIBLE_NO_TOKENS()": FunctionFragment;
    "SW_HOLD_DOESNT_EXIST()": FunctionFragment;
    "SW_HOLD_TOKEN_EXTENSION_MISSING()": FunctionFragment;
    "SW_NO_HOLDID_GIVEN()": FunctionFragment;
    "SW_NO_PRICE_OWNERSHIP()": FunctionFragment;
    "SW_ONLY_EXECUTER_CAN_FORCE_TRADE()": FunctionFragment;
    "SW_ONLY_REGISTERED_HOLDERS()": FunctionFragment;
    "SW_PRICE_HIGHER_THAN_AMOUNT()": FunctionFragment;
    "SW_PRICE_SETTER_NOT_TOKEN_ORACLE_1()": FunctionFragment;
    "SW_PRICE_SETTER_NOT_TOKEN_ORACLE_2()": FunctionFragment;
    "SW_SENDER_CANT_CANCEL_TRADE_0()": FunctionFragment;
    "SW_SENDER_CANT_CANCEL_TRADE_1()": FunctionFragment;
    "SW_SENDER_CANT_CANCEL_TRADE_2()": FunctionFragment;
    "SW_SENDER_CANT_CANCEL_TRADE_3()": FunctionFragment;
    "SW_SENDER_CANT_FORCE_TRADE()": FunctionFragment;
    "SW_SENDER_NOT_EXECUTER()": FunctionFragment;
    "SW_SENDER_NOT_PRICE_ORACLE()": FunctionFragment;
    "SW_SENDER_NOT_TOKEN_CONTROLLER()": FunctionFragment;
    "SW_START_DATE_MUST_BE_ONE_WEEK_BEFORE()": FunctionFragment;
    "SW_TOKENS_IN_WRONG_PARTITION()": FunctionFragment;
    "SW_TOKEN_AMOUNT_INCORRECT()": FunctionFragment;
    "SW_TOKEN_INCORRECT_STANDARD()": FunctionFragment;
    "SW_TOKEN_STANDARD_NOT_SUPPORTED()": FunctionFragment;
    "SW_TRADE_ALREADY_ACCEPTED()": FunctionFragment;
    "SW_TRADE_EXECUTER_NOT_ALLOWED()": FunctionFragment;
    "SW_TRADE_EXPIRED()": FunctionFragment;
    "SW_TRADE_NOT_FULLY_ACCEPTED()": FunctionFragment;
    "SW_TRADE_NOT_FULLY_APPROVED()": FunctionFragment;
    "SW_TRADE_NOT_PENDING()": FunctionFragment;
    "SW_WRONG_TOKEN_SENT()": FunctionFragment;
    "TR_INVALID_RECEIVER()": FunctionFragment;
    "TR_SENDER_NOT_ERC1400_TOKEN()": FunctionFragment;
    "TR_TO_ADDRESS_NOT_ME()": FunctionFragment;
    "ZERO_ADDRESS_NOT_ALLOWED()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "NO_CONTRACT_OWNER"
      | "SW_ALLOWANCE_NOT_GIVEN"
      | "SW_BEFORE_SETTLEMENT_DATE"
      | "SW_COMPETITION_ON_PRICE_OWNERSHIP"
      | "SW_ETH_AMOUNT_INCORRECT"
      | "SW_ETH_TRADE_REQUIRES_ESCROW"
      | "SW_EXECUTE_TRADE_POSSIBLE"
      | "SW_FORCE_TRADE_NOT_POSSIBLE_NO_TOKENS"
      | "SW_HOLD_DOESNT_EXIST"
      | "SW_HOLD_TOKEN_EXTENSION_MISSING"
      | "SW_NO_HOLDID_GIVEN"
      | "SW_NO_PRICE_OWNERSHIP"
      | "SW_ONLY_EXECUTER_CAN_FORCE_TRADE"
      | "SW_ONLY_REGISTERED_HOLDERS"
      | "SW_PRICE_HIGHER_THAN_AMOUNT"
      | "SW_PRICE_SETTER_NOT_TOKEN_ORACLE_1"
      | "SW_PRICE_SETTER_NOT_TOKEN_ORACLE_2"
      | "SW_SENDER_CANT_CANCEL_TRADE_0"
      | "SW_SENDER_CANT_CANCEL_TRADE_1"
      | "SW_SENDER_CANT_CANCEL_TRADE_2"
      | "SW_SENDER_CANT_CANCEL_TRADE_3"
      | "SW_SENDER_CANT_FORCE_TRADE"
      | "SW_SENDER_NOT_EXECUTER"
      | "SW_SENDER_NOT_PRICE_ORACLE"
      | "SW_SENDER_NOT_TOKEN_CONTROLLER"
      | "SW_START_DATE_MUST_BE_ONE_WEEK_BEFORE"
      | "SW_TOKENS_IN_WRONG_PARTITION"
      | "SW_TOKEN_AMOUNT_INCORRECT"
      | "SW_TOKEN_INCORRECT_STANDARD"
      | "SW_TOKEN_STANDARD_NOT_SUPPORTED"
      | "SW_TRADE_ALREADY_ACCEPTED"
      | "SW_TRADE_EXECUTER_NOT_ALLOWED"
      | "SW_TRADE_EXPIRED"
      | "SW_TRADE_NOT_FULLY_ACCEPTED"
      | "SW_TRADE_NOT_FULLY_APPROVED"
      | "SW_TRADE_NOT_PENDING"
      | "SW_WRONG_TOKEN_SENT"
      | "TR_INVALID_RECEIVER"
      | "TR_SENDER_NOT_ERC1400_TOKEN"
      | "TR_TO_ADDRESS_NOT_ME"
      | "ZERO_ADDRESS_NOT_ALLOWED"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "NO_CONTRACT_OWNER",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_ALLOWANCE_NOT_GIVEN",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_BEFORE_SETTLEMENT_DATE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_COMPETITION_ON_PRICE_OWNERSHIP",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_ETH_AMOUNT_INCORRECT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_ETH_TRADE_REQUIRES_ESCROW",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_EXECUTE_TRADE_POSSIBLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_FORCE_TRADE_NOT_POSSIBLE_NO_TOKENS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_HOLD_DOESNT_EXIST",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_HOLD_TOKEN_EXTENSION_MISSING",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_NO_HOLDID_GIVEN",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_NO_PRICE_OWNERSHIP",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_ONLY_EXECUTER_CAN_FORCE_TRADE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_ONLY_REGISTERED_HOLDERS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_PRICE_HIGHER_THAN_AMOUNT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_PRICE_SETTER_NOT_TOKEN_ORACLE_1",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_PRICE_SETTER_NOT_TOKEN_ORACLE_2",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_SENDER_CANT_CANCEL_TRADE_0",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_SENDER_CANT_CANCEL_TRADE_1",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_SENDER_CANT_CANCEL_TRADE_2",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_SENDER_CANT_CANCEL_TRADE_3",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_SENDER_CANT_FORCE_TRADE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_SENDER_NOT_EXECUTER",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_SENDER_NOT_PRICE_ORACLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_SENDER_NOT_TOKEN_CONTROLLER",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_START_DATE_MUST_BE_ONE_WEEK_BEFORE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_TOKENS_IN_WRONG_PARTITION",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_TOKEN_AMOUNT_INCORRECT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_TOKEN_INCORRECT_STANDARD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_TOKEN_STANDARD_NOT_SUPPORTED",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_TRADE_ALREADY_ACCEPTED",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_TRADE_EXECUTER_NOT_ALLOWED",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_TRADE_EXPIRED",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_TRADE_NOT_FULLY_ACCEPTED",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_TRADE_NOT_FULLY_APPROVED",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_TRADE_NOT_PENDING",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SW_WRONG_TOKEN_SENT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "TR_INVALID_RECEIVER",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "TR_SENDER_NOT_ERC1400_TOKEN",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "TR_TO_ADDRESS_NOT_ME",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ZERO_ADDRESS_NOT_ALLOWED",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "NO_CONTRACT_OWNER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_ALLOWANCE_NOT_GIVEN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_BEFORE_SETTLEMENT_DATE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_COMPETITION_ON_PRICE_OWNERSHIP",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_ETH_AMOUNT_INCORRECT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_ETH_TRADE_REQUIRES_ESCROW",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_EXECUTE_TRADE_POSSIBLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_FORCE_TRADE_NOT_POSSIBLE_NO_TOKENS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_HOLD_DOESNT_EXIST",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_HOLD_TOKEN_EXTENSION_MISSING",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_NO_HOLDID_GIVEN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_NO_PRICE_OWNERSHIP",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_ONLY_EXECUTER_CAN_FORCE_TRADE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_ONLY_REGISTERED_HOLDERS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_PRICE_HIGHER_THAN_AMOUNT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_PRICE_SETTER_NOT_TOKEN_ORACLE_1",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_PRICE_SETTER_NOT_TOKEN_ORACLE_2",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_SENDER_CANT_CANCEL_TRADE_0",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_SENDER_CANT_CANCEL_TRADE_1",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_SENDER_CANT_CANCEL_TRADE_2",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_SENDER_CANT_CANCEL_TRADE_3",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_SENDER_CANT_FORCE_TRADE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_SENDER_NOT_EXECUTER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_SENDER_NOT_PRICE_ORACLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_SENDER_NOT_TOKEN_CONTROLLER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_START_DATE_MUST_BE_ONE_WEEK_BEFORE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_TOKENS_IN_WRONG_PARTITION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_TOKEN_AMOUNT_INCORRECT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_TOKEN_INCORRECT_STANDARD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_TOKEN_STANDARD_NOT_SUPPORTED",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_TRADE_ALREADY_ACCEPTED",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_TRADE_EXECUTER_NOT_ALLOWED",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_TRADE_EXPIRED",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_TRADE_NOT_FULLY_ACCEPTED",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_TRADE_NOT_FULLY_APPROVED",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_TRADE_NOT_PENDING",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SW_WRONG_TOKEN_SENT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "TR_INVALID_RECEIVER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "TR_SENDER_NOT_ERC1400_TOKEN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "TR_TO_ADDRESS_NOT_ME",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ZERO_ADDRESS_NOT_ALLOWED",
    data: BytesLike
  ): Result;

  events: {};
}

export interface Errors extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ErrorsInterface;

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
    NO_CONTRACT_OWNER(overrides?: CallOverrides): Promise<[string]>;

    SW_ALLOWANCE_NOT_GIVEN(overrides?: CallOverrides): Promise<[string]>;

    SW_BEFORE_SETTLEMENT_DATE(overrides?: CallOverrides): Promise<[string]>;

    SW_COMPETITION_ON_PRICE_OWNERSHIP(
      overrides?: CallOverrides
    ): Promise<[string]>;

    SW_ETH_AMOUNT_INCORRECT(overrides?: CallOverrides): Promise<[string]>;

    SW_ETH_TRADE_REQUIRES_ESCROW(overrides?: CallOverrides): Promise<[string]>;

    SW_EXECUTE_TRADE_POSSIBLE(overrides?: CallOverrides): Promise<[string]>;

    SW_FORCE_TRADE_NOT_POSSIBLE_NO_TOKENS(
      overrides?: CallOverrides
    ): Promise<[string]>;

    SW_HOLD_DOESNT_EXIST(overrides?: CallOverrides): Promise<[string]>;

    SW_HOLD_TOKEN_EXTENSION_MISSING(
      overrides?: CallOverrides
    ): Promise<[string]>;

    SW_NO_HOLDID_GIVEN(overrides?: CallOverrides): Promise<[string]>;

    SW_NO_PRICE_OWNERSHIP(overrides?: CallOverrides): Promise<[string]>;

    SW_ONLY_EXECUTER_CAN_FORCE_TRADE(
      overrides?: CallOverrides
    ): Promise<[string]>;

    SW_ONLY_REGISTERED_HOLDERS(overrides?: CallOverrides): Promise<[string]>;

    SW_PRICE_HIGHER_THAN_AMOUNT(overrides?: CallOverrides): Promise<[string]>;

    SW_PRICE_SETTER_NOT_TOKEN_ORACLE_1(
      overrides?: CallOverrides
    ): Promise<[string]>;

    SW_PRICE_SETTER_NOT_TOKEN_ORACLE_2(
      overrides?: CallOverrides
    ): Promise<[string]>;

    SW_SENDER_CANT_CANCEL_TRADE_0(overrides?: CallOverrides): Promise<[string]>;

    SW_SENDER_CANT_CANCEL_TRADE_1(overrides?: CallOverrides): Promise<[string]>;

    SW_SENDER_CANT_CANCEL_TRADE_2(overrides?: CallOverrides): Promise<[string]>;

    SW_SENDER_CANT_CANCEL_TRADE_3(overrides?: CallOverrides): Promise<[string]>;

    SW_SENDER_CANT_FORCE_TRADE(overrides?: CallOverrides): Promise<[string]>;

    SW_SENDER_NOT_EXECUTER(overrides?: CallOverrides): Promise<[string]>;

    SW_SENDER_NOT_PRICE_ORACLE(overrides?: CallOverrides): Promise<[string]>;

    SW_SENDER_NOT_TOKEN_CONTROLLER(
      overrides?: CallOverrides
    ): Promise<[string]>;

    SW_START_DATE_MUST_BE_ONE_WEEK_BEFORE(
      overrides?: CallOverrides
    ): Promise<[string]>;

    SW_TOKENS_IN_WRONG_PARTITION(overrides?: CallOverrides): Promise<[string]>;

    SW_TOKEN_AMOUNT_INCORRECT(overrides?: CallOverrides): Promise<[string]>;

    SW_TOKEN_INCORRECT_STANDARD(overrides?: CallOverrides): Promise<[string]>;

    SW_TOKEN_STANDARD_NOT_SUPPORTED(
      overrides?: CallOverrides
    ): Promise<[string]>;

    SW_TRADE_ALREADY_ACCEPTED(overrides?: CallOverrides): Promise<[string]>;

    SW_TRADE_EXECUTER_NOT_ALLOWED(overrides?: CallOverrides): Promise<[string]>;

    SW_TRADE_EXPIRED(overrides?: CallOverrides): Promise<[string]>;

    SW_TRADE_NOT_FULLY_ACCEPTED(overrides?: CallOverrides): Promise<[string]>;

    SW_TRADE_NOT_FULLY_APPROVED(overrides?: CallOverrides): Promise<[string]>;

    SW_TRADE_NOT_PENDING(overrides?: CallOverrides): Promise<[string]>;

    SW_WRONG_TOKEN_SENT(overrides?: CallOverrides): Promise<[string]>;

    TR_INVALID_RECEIVER(overrides?: CallOverrides): Promise<[string]>;

    TR_SENDER_NOT_ERC1400_TOKEN(overrides?: CallOverrides): Promise<[string]>;

    TR_TO_ADDRESS_NOT_ME(overrides?: CallOverrides): Promise<[string]>;

    ZERO_ADDRESS_NOT_ALLOWED(overrides?: CallOverrides): Promise<[string]>;
  };

  NO_CONTRACT_OWNER(overrides?: CallOverrides): Promise<string>;

  SW_ALLOWANCE_NOT_GIVEN(overrides?: CallOverrides): Promise<string>;

  SW_BEFORE_SETTLEMENT_DATE(overrides?: CallOverrides): Promise<string>;

  SW_COMPETITION_ON_PRICE_OWNERSHIP(overrides?: CallOverrides): Promise<string>;

  SW_ETH_AMOUNT_INCORRECT(overrides?: CallOverrides): Promise<string>;

  SW_ETH_TRADE_REQUIRES_ESCROW(overrides?: CallOverrides): Promise<string>;

  SW_EXECUTE_TRADE_POSSIBLE(overrides?: CallOverrides): Promise<string>;

  SW_FORCE_TRADE_NOT_POSSIBLE_NO_TOKENS(
    overrides?: CallOverrides
  ): Promise<string>;

  SW_HOLD_DOESNT_EXIST(overrides?: CallOverrides): Promise<string>;

  SW_HOLD_TOKEN_EXTENSION_MISSING(overrides?: CallOverrides): Promise<string>;

  SW_NO_HOLDID_GIVEN(overrides?: CallOverrides): Promise<string>;

  SW_NO_PRICE_OWNERSHIP(overrides?: CallOverrides): Promise<string>;

  SW_ONLY_EXECUTER_CAN_FORCE_TRADE(overrides?: CallOverrides): Promise<string>;

  SW_ONLY_REGISTERED_HOLDERS(overrides?: CallOverrides): Promise<string>;

  SW_PRICE_HIGHER_THAN_AMOUNT(overrides?: CallOverrides): Promise<string>;

  SW_PRICE_SETTER_NOT_TOKEN_ORACLE_1(
    overrides?: CallOverrides
  ): Promise<string>;

  SW_PRICE_SETTER_NOT_TOKEN_ORACLE_2(
    overrides?: CallOverrides
  ): Promise<string>;

  SW_SENDER_CANT_CANCEL_TRADE_0(overrides?: CallOverrides): Promise<string>;

  SW_SENDER_CANT_CANCEL_TRADE_1(overrides?: CallOverrides): Promise<string>;

  SW_SENDER_CANT_CANCEL_TRADE_2(overrides?: CallOverrides): Promise<string>;

  SW_SENDER_CANT_CANCEL_TRADE_3(overrides?: CallOverrides): Promise<string>;

  SW_SENDER_CANT_FORCE_TRADE(overrides?: CallOverrides): Promise<string>;

  SW_SENDER_NOT_EXECUTER(overrides?: CallOverrides): Promise<string>;

  SW_SENDER_NOT_PRICE_ORACLE(overrides?: CallOverrides): Promise<string>;

  SW_SENDER_NOT_TOKEN_CONTROLLER(overrides?: CallOverrides): Promise<string>;

  SW_START_DATE_MUST_BE_ONE_WEEK_BEFORE(
    overrides?: CallOverrides
  ): Promise<string>;

  SW_TOKENS_IN_WRONG_PARTITION(overrides?: CallOverrides): Promise<string>;

  SW_TOKEN_AMOUNT_INCORRECT(overrides?: CallOverrides): Promise<string>;

  SW_TOKEN_INCORRECT_STANDARD(overrides?: CallOverrides): Promise<string>;

  SW_TOKEN_STANDARD_NOT_SUPPORTED(overrides?: CallOverrides): Promise<string>;

  SW_TRADE_ALREADY_ACCEPTED(overrides?: CallOverrides): Promise<string>;

  SW_TRADE_EXECUTER_NOT_ALLOWED(overrides?: CallOverrides): Promise<string>;

  SW_TRADE_EXPIRED(overrides?: CallOverrides): Promise<string>;

  SW_TRADE_NOT_FULLY_ACCEPTED(overrides?: CallOverrides): Promise<string>;

  SW_TRADE_NOT_FULLY_APPROVED(overrides?: CallOverrides): Promise<string>;

  SW_TRADE_NOT_PENDING(overrides?: CallOverrides): Promise<string>;

  SW_WRONG_TOKEN_SENT(overrides?: CallOverrides): Promise<string>;

  TR_INVALID_RECEIVER(overrides?: CallOverrides): Promise<string>;

  TR_SENDER_NOT_ERC1400_TOKEN(overrides?: CallOverrides): Promise<string>;

  TR_TO_ADDRESS_NOT_ME(overrides?: CallOverrides): Promise<string>;

  ZERO_ADDRESS_NOT_ALLOWED(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    NO_CONTRACT_OWNER(overrides?: CallOverrides): Promise<string>;

    SW_ALLOWANCE_NOT_GIVEN(overrides?: CallOverrides): Promise<string>;

    SW_BEFORE_SETTLEMENT_DATE(overrides?: CallOverrides): Promise<string>;

    SW_COMPETITION_ON_PRICE_OWNERSHIP(
      overrides?: CallOverrides
    ): Promise<string>;

    SW_ETH_AMOUNT_INCORRECT(overrides?: CallOverrides): Promise<string>;

    SW_ETH_TRADE_REQUIRES_ESCROW(overrides?: CallOverrides): Promise<string>;

    SW_EXECUTE_TRADE_POSSIBLE(overrides?: CallOverrides): Promise<string>;

    SW_FORCE_TRADE_NOT_POSSIBLE_NO_TOKENS(
      overrides?: CallOverrides
    ): Promise<string>;

    SW_HOLD_DOESNT_EXIST(overrides?: CallOverrides): Promise<string>;

    SW_HOLD_TOKEN_EXTENSION_MISSING(overrides?: CallOverrides): Promise<string>;

    SW_NO_HOLDID_GIVEN(overrides?: CallOverrides): Promise<string>;

    SW_NO_PRICE_OWNERSHIP(overrides?: CallOverrides): Promise<string>;

    SW_ONLY_EXECUTER_CAN_FORCE_TRADE(
      overrides?: CallOverrides
    ): Promise<string>;

    SW_ONLY_REGISTERED_HOLDERS(overrides?: CallOverrides): Promise<string>;

    SW_PRICE_HIGHER_THAN_AMOUNT(overrides?: CallOverrides): Promise<string>;

    SW_PRICE_SETTER_NOT_TOKEN_ORACLE_1(
      overrides?: CallOverrides
    ): Promise<string>;

    SW_PRICE_SETTER_NOT_TOKEN_ORACLE_2(
      overrides?: CallOverrides
    ): Promise<string>;

    SW_SENDER_CANT_CANCEL_TRADE_0(overrides?: CallOverrides): Promise<string>;

    SW_SENDER_CANT_CANCEL_TRADE_1(overrides?: CallOverrides): Promise<string>;

    SW_SENDER_CANT_CANCEL_TRADE_2(overrides?: CallOverrides): Promise<string>;

    SW_SENDER_CANT_CANCEL_TRADE_3(overrides?: CallOverrides): Promise<string>;

    SW_SENDER_CANT_FORCE_TRADE(overrides?: CallOverrides): Promise<string>;

    SW_SENDER_NOT_EXECUTER(overrides?: CallOverrides): Promise<string>;

    SW_SENDER_NOT_PRICE_ORACLE(overrides?: CallOverrides): Promise<string>;

    SW_SENDER_NOT_TOKEN_CONTROLLER(overrides?: CallOverrides): Promise<string>;

    SW_START_DATE_MUST_BE_ONE_WEEK_BEFORE(
      overrides?: CallOverrides
    ): Promise<string>;

    SW_TOKENS_IN_WRONG_PARTITION(overrides?: CallOverrides): Promise<string>;

    SW_TOKEN_AMOUNT_INCORRECT(overrides?: CallOverrides): Promise<string>;

    SW_TOKEN_INCORRECT_STANDARD(overrides?: CallOverrides): Promise<string>;

    SW_TOKEN_STANDARD_NOT_SUPPORTED(overrides?: CallOverrides): Promise<string>;

    SW_TRADE_ALREADY_ACCEPTED(overrides?: CallOverrides): Promise<string>;

    SW_TRADE_EXECUTER_NOT_ALLOWED(overrides?: CallOverrides): Promise<string>;

    SW_TRADE_EXPIRED(overrides?: CallOverrides): Promise<string>;

    SW_TRADE_NOT_FULLY_ACCEPTED(overrides?: CallOverrides): Promise<string>;

    SW_TRADE_NOT_FULLY_APPROVED(overrides?: CallOverrides): Promise<string>;

    SW_TRADE_NOT_PENDING(overrides?: CallOverrides): Promise<string>;

    SW_WRONG_TOKEN_SENT(overrides?: CallOverrides): Promise<string>;

    TR_INVALID_RECEIVER(overrides?: CallOverrides): Promise<string>;

    TR_SENDER_NOT_ERC1400_TOKEN(overrides?: CallOverrides): Promise<string>;

    TR_TO_ADDRESS_NOT_ME(overrides?: CallOverrides): Promise<string>;

    ZERO_ADDRESS_NOT_ALLOWED(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    NO_CONTRACT_OWNER(overrides?: CallOverrides): Promise<BigNumber>;

    SW_ALLOWANCE_NOT_GIVEN(overrides?: CallOverrides): Promise<BigNumber>;

    SW_BEFORE_SETTLEMENT_DATE(overrides?: CallOverrides): Promise<BigNumber>;

    SW_COMPETITION_ON_PRICE_OWNERSHIP(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    SW_ETH_AMOUNT_INCORRECT(overrides?: CallOverrides): Promise<BigNumber>;

    SW_ETH_TRADE_REQUIRES_ESCROW(overrides?: CallOverrides): Promise<BigNumber>;

    SW_EXECUTE_TRADE_POSSIBLE(overrides?: CallOverrides): Promise<BigNumber>;

    SW_FORCE_TRADE_NOT_POSSIBLE_NO_TOKENS(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    SW_HOLD_DOESNT_EXIST(overrides?: CallOverrides): Promise<BigNumber>;

    SW_HOLD_TOKEN_EXTENSION_MISSING(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    SW_NO_HOLDID_GIVEN(overrides?: CallOverrides): Promise<BigNumber>;

    SW_NO_PRICE_OWNERSHIP(overrides?: CallOverrides): Promise<BigNumber>;

    SW_ONLY_EXECUTER_CAN_FORCE_TRADE(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    SW_ONLY_REGISTERED_HOLDERS(overrides?: CallOverrides): Promise<BigNumber>;

    SW_PRICE_HIGHER_THAN_AMOUNT(overrides?: CallOverrides): Promise<BigNumber>;

    SW_PRICE_SETTER_NOT_TOKEN_ORACLE_1(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    SW_PRICE_SETTER_NOT_TOKEN_ORACLE_2(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    SW_SENDER_CANT_CANCEL_TRADE_0(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    SW_SENDER_CANT_CANCEL_TRADE_1(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    SW_SENDER_CANT_CANCEL_TRADE_2(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    SW_SENDER_CANT_CANCEL_TRADE_3(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    SW_SENDER_CANT_FORCE_TRADE(overrides?: CallOverrides): Promise<BigNumber>;

    SW_SENDER_NOT_EXECUTER(overrides?: CallOverrides): Promise<BigNumber>;

    SW_SENDER_NOT_PRICE_ORACLE(overrides?: CallOverrides): Promise<BigNumber>;

    SW_SENDER_NOT_TOKEN_CONTROLLER(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    SW_START_DATE_MUST_BE_ONE_WEEK_BEFORE(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    SW_TOKENS_IN_WRONG_PARTITION(overrides?: CallOverrides): Promise<BigNumber>;

    SW_TOKEN_AMOUNT_INCORRECT(overrides?: CallOverrides): Promise<BigNumber>;

    SW_TOKEN_INCORRECT_STANDARD(overrides?: CallOverrides): Promise<BigNumber>;

    SW_TOKEN_STANDARD_NOT_SUPPORTED(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    SW_TRADE_ALREADY_ACCEPTED(overrides?: CallOverrides): Promise<BigNumber>;

    SW_TRADE_EXECUTER_NOT_ALLOWED(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    SW_TRADE_EXPIRED(overrides?: CallOverrides): Promise<BigNumber>;

    SW_TRADE_NOT_FULLY_ACCEPTED(overrides?: CallOverrides): Promise<BigNumber>;

    SW_TRADE_NOT_FULLY_APPROVED(overrides?: CallOverrides): Promise<BigNumber>;

    SW_TRADE_NOT_PENDING(overrides?: CallOverrides): Promise<BigNumber>;

    SW_WRONG_TOKEN_SENT(overrides?: CallOverrides): Promise<BigNumber>;

    TR_INVALID_RECEIVER(overrides?: CallOverrides): Promise<BigNumber>;

    TR_SENDER_NOT_ERC1400_TOKEN(overrides?: CallOverrides): Promise<BigNumber>;

    TR_TO_ADDRESS_NOT_ME(overrides?: CallOverrides): Promise<BigNumber>;

    ZERO_ADDRESS_NOT_ALLOWED(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    NO_CONTRACT_OWNER(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SW_ALLOWANCE_NOT_GIVEN(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_BEFORE_SETTLEMENT_DATE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_COMPETITION_ON_PRICE_OWNERSHIP(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_ETH_AMOUNT_INCORRECT(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_ETH_TRADE_REQUIRES_ESCROW(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_EXECUTE_TRADE_POSSIBLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_FORCE_TRADE_NOT_POSSIBLE_NO_TOKENS(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_HOLD_DOESNT_EXIST(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_HOLD_TOKEN_EXTENSION_MISSING(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_NO_HOLDID_GIVEN(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_NO_PRICE_OWNERSHIP(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_ONLY_EXECUTER_CAN_FORCE_TRADE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_ONLY_REGISTERED_HOLDERS(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_PRICE_HIGHER_THAN_AMOUNT(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_PRICE_SETTER_NOT_TOKEN_ORACLE_1(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_PRICE_SETTER_NOT_TOKEN_ORACLE_2(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_SENDER_CANT_CANCEL_TRADE_0(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_SENDER_CANT_CANCEL_TRADE_1(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_SENDER_CANT_CANCEL_TRADE_2(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_SENDER_CANT_CANCEL_TRADE_3(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_SENDER_CANT_FORCE_TRADE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_SENDER_NOT_EXECUTER(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_SENDER_NOT_PRICE_ORACLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_SENDER_NOT_TOKEN_CONTROLLER(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_START_DATE_MUST_BE_ONE_WEEK_BEFORE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_TOKENS_IN_WRONG_PARTITION(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_TOKEN_AMOUNT_INCORRECT(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_TOKEN_INCORRECT_STANDARD(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_TOKEN_STANDARD_NOT_SUPPORTED(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_TRADE_ALREADY_ACCEPTED(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_TRADE_EXECUTER_NOT_ALLOWED(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_TRADE_EXPIRED(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SW_TRADE_NOT_FULLY_ACCEPTED(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_TRADE_NOT_FULLY_APPROVED(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_TRADE_NOT_PENDING(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    SW_WRONG_TOKEN_SENT(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    TR_INVALID_RECEIVER(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    TR_SENDER_NOT_ERC1400_TOKEN(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    TR_TO_ADDRESS_NOT_ME(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ZERO_ADDRESS_NOT_ALLOWED(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
