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
} from "../../common";

export interface TradeEscrowInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "arbitrator"
      | "buyer"
      | "buyerCollateral"
      | "buyerDepositCollateral"
      | "feeRate"
      | "finalizeTrade"
      | "platform"
      | "profitMargin"
      | "seller"
      | "sellerCollateral"
      | "sellerDepositCollateral"
      | "sellerDepositTradeAmount"
      | "tradeAmount"
      | "tradeState"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "BuyerCollateralDeposited"
      | "SellerCollateralDeposited"
      | "SellerDeposited"
      | "TradeFinalized"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "arbitrator",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "buyer", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "buyerCollateral",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "buyerDepositCollateral",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "feeRate", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "finalizeTrade",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "platform", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "profitMargin",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "seller", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "sellerCollateral",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sellerDepositCollateral",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sellerDepositTradeAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tradeAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tradeState",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "arbitrator", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "buyer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "buyerCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "buyerDepositCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "feeRate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "finalizeTrade",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "platform", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "profitMargin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "seller", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "sellerCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sellerDepositCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sellerDepositTradeAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tradeAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tradeState", data: BytesLike): Result;
}

export namespace BuyerCollateralDepositedEvent {
  export type InputTuple = [amount: BigNumberish];
  export type OutputTuple = [amount: bigint];
  export interface OutputObject {
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SellerCollateralDepositedEvent {
  export type InputTuple = [amount: BigNumberish];
  export type OutputTuple = [amount: bigint];
  export interface OutputObject {
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SellerDepositedEvent {
  export type InputTuple = [amount: BigNumberish];
  export type OutputTuple = [amount: bigint];
  export interface OutputObject {
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TradeFinalizedEvent {
  export type InputTuple = [
    netAmount: BigNumberish,
    feeAmount: BigNumberish,
    marginAmount: BigNumberish
  ];
  export type OutputTuple = [
    netAmount: bigint,
    feeAmount: bigint,
    marginAmount: bigint
  ];
  export interface OutputObject {
    netAmount: bigint;
    feeAmount: bigint;
    marginAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface TradeEscrow extends BaseContract {
  connect(runner?: ContractRunner | null): TradeEscrow;
  waitForDeployment(): Promise<this>;

  interface: TradeEscrowInterface;

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

  arbitrator: TypedContractMethod<[], [string], "view">;

  buyer: TypedContractMethod<[], [string], "view">;

  buyerCollateral: TypedContractMethod<[], [bigint], "view">;

  buyerDepositCollateral: TypedContractMethod<[], [void], "payable">;

  feeRate: TypedContractMethod<[], [bigint], "view">;

  finalizeTrade: TypedContractMethod<[], [void], "nonpayable">;

  platform: TypedContractMethod<[], [string], "view">;

  profitMargin: TypedContractMethod<[], [bigint], "view">;

  seller: TypedContractMethod<[], [string], "view">;

  sellerCollateral: TypedContractMethod<[], [bigint], "view">;

  sellerDepositCollateral: TypedContractMethod<[], [void], "payable">;

  sellerDepositTradeAmount: TypedContractMethod<[], [void], "payable">;

  tradeAmount: TypedContractMethod<[], [bigint], "view">;

  tradeState: TypedContractMethod<[], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "arbitrator"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "buyer"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "buyerCollateral"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "buyerDepositCollateral"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "feeRate"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "finalizeTrade"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "platform"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "profitMargin"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "seller"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "sellerCollateral"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "sellerDepositCollateral"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "sellerDepositTradeAmount"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "tradeAmount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "tradeState"
  ): TypedContractMethod<[], [bigint], "view">;

  getEvent(
    key: "BuyerCollateralDeposited"
  ): TypedContractEvent<
    BuyerCollateralDepositedEvent.InputTuple,
    BuyerCollateralDepositedEvent.OutputTuple,
    BuyerCollateralDepositedEvent.OutputObject
  >;
  getEvent(
    key: "SellerCollateralDeposited"
  ): TypedContractEvent<
    SellerCollateralDepositedEvent.InputTuple,
    SellerCollateralDepositedEvent.OutputTuple,
    SellerCollateralDepositedEvent.OutputObject
  >;
  getEvent(
    key: "SellerDeposited"
  ): TypedContractEvent<
    SellerDepositedEvent.InputTuple,
    SellerDepositedEvent.OutputTuple,
    SellerDepositedEvent.OutputObject
  >;
  getEvent(
    key: "TradeFinalized"
  ): TypedContractEvent<
    TradeFinalizedEvent.InputTuple,
    TradeFinalizedEvent.OutputTuple,
    TradeFinalizedEvent.OutputObject
  >;

  filters: {
    "BuyerCollateralDeposited(uint256)": TypedContractEvent<
      BuyerCollateralDepositedEvent.InputTuple,
      BuyerCollateralDepositedEvent.OutputTuple,
      BuyerCollateralDepositedEvent.OutputObject
    >;
    BuyerCollateralDeposited: TypedContractEvent<
      BuyerCollateralDepositedEvent.InputTuple,
      BuyerCollateralDepositedEvent.OutputTuple,
      BuyerCollateralDepositedEvent.OutputObject
    >;

    "SellerCollateralDeposited(uint256)": TypedContractEvent<
      SellerCollateralDepositedEvent.InputTuple,
      SellerCollateralDepositedEvent.OutputTuple,
      SellerCollateralDepositedEvent.OutputObject
    >;
    SellerCollateralDeposited: TypedContractEvent<
      SellerCollateralDepositedEvent.InputTuple,
      SellerCollateralDepositedEvent.OutputTuple,
      SellerCollateralDepositedEvent.OutputObject
    >;

    "SellerDeposited(uint256)": TypedContractEvent<
      SellerDepositedEvent.InputTuple,
      SellerDepositedEvent.OutputTuple,
      SellerDepositedEvent.OutputObject
    >;
    SellerDeposited: TypedContractEvent<
      SellerDepositedEvent.InputTuple,
      SellerDepositedEvent.OutputTuple,
      SellerDepositedEvent.OutputObject
    >;

    "TradeFinalized(uint256,uint256,uint256)": TypedContractEvent<
      TradeFinalizedEvent.InputTuple,
      TradeFinalizedEvent.OutputTuple,
      TradeFinalizedEvent.OutputObject
    >;
    TradeFinalized: TypedContractEvent<
      TradeFinalizedEvent.InputTuple,
      TradeFinalizedEvent.OutputTuple,
      TradeFinalizedEvent.OutputObject
    >;
  };
}
