/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface EscrowFactoryInterface extends Interface {
  getFunction(
    nameOrSignature: "createTrade" | "getTrades" | "trades"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "TradeCreated"): EventFragment;

  encodeFunctionData(
    functionFragment: "createTrade",
    values: [
      AddressLike,
      AddressLike,
      AddressLike,
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(functionFragment: "getTrades", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "trades",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "createTrade",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getTrades", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "trades", data: BytesLike): Result;
}

export namespace TradeCreatedEvent {
  export type InputTuple = [
    tradeAddress: AddressLike,
    buyer: AddressLike,
    seller: AddressLike
  ];
  export type OutputTuple = [
    tradeAddress: string,
    buyer: string,
    seller: string
  ];
  export interface OutputObject {
    tradeAddress: string;
    buyer: string;
    seller: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface EscrowFactory extends BaseContract {
  connect(runner?: ContractRunner | null): EscrowFactory;
  waitForDeployment(): Promise<this>;

  interface: EscrowFactoryInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  createTrade: TypedContractMethod<
    [
      _buyer: AddressLike,
      _seller: AddressLike,
      _arbitrator: AddressLike,
      _platform: AddressLike,
      _feeRate: BigNumberish,
      _profitMargin: BigNumberish,
      _tradeAmount: BigNumberish,
      _buyerCollateral: BigNumberish,
      _sellerCollateral: BigNumberish
    ],
    [string],
    "nonpayable"
  >;

  getTrades: TypedContractMethod<[], [string[]], "view">;

  trades: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "createTrade"
  ): TypedContractMethod<
    [
      _buyer: AddressLike,
      _seller: AddressLike,
      _arbitrator: AddressLike,
      _platform: AddressLike,
      _feeRate: BigNumberish,
      _profitMargin: BigNumberish,
      _tradeAmount: BigNumberish,
      _buyerCollateral: BigNumberish,
      _sellerCollateral: BigNumberish
    ],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getTrades"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "trades"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  getEvent(
    key: "TradeCreated"
  ): TypedContractEvent<
    TradeCreatedEvent.InputTuple,
    TradeCreatedEvent.OutputTuple,
    TradeCreatedEvent.OutputObject
  >;

  filters: {
    "TradeCreated(address,address,address)": TypedContractEvent<
      TradeCreatedEvent.InputTuple,
      TradeCreatedEvent.OutputTuple,
      TradeCreatedEvent.OutputObject
    >;
    TradeCreated: TypedContractEvent<
      TradeCreatedEvent.InputTuple,
      TradeCreatedEvent.OutputTuple,
      TradeCreatedEvent.OutputObject
    >;
  };
}
