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

export interface MultiTradeEscrowInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "autoCancelTrades"
      | "cancelTrade"
      | "confirmTrade"
      | "createTrade"
      | "defaultFeeRate"
      | "defaultProfitMargin"
      | "disputeTrade"
      | "forceCancelTrade"
      | "fundTrade"
      | "getContractBalance"
      | "getTrade"
      | "owner"
      | "platformWallet"
      | "resolveDispute"
      | "tradeCount"
      | "trades"
      | "updateDefaultFeeRate"
      | "updateDefaultProfitMargin"
      | "updatePlatformWallet"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "ArbitrationResolved"
      | "TradeCancelled"
      | "TradeCompleted"
      | "TradeConfirmed"
      | "TradeCreated"
      | "TradeDisputed"
      | "TradeFunded"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "autoCancelTrades",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "cancelTrade",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "confirmTrade",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createTrade",
    values: [
      AddressLike,
      AddressLike,
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "defaultFeeRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "defaultProfitMargin",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "disputeTrade",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "forceCancelTrade",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "fundTrade",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getContractBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTrade",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "platformWallet",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "resolveDispute",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tradeCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "trades",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateDefaultFeeRate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateDefaultProfitMargin",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updatePlatformWallet",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "autoCancelTrades",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelTrade",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "confirmTrade",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createTrade",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "defaultFeeRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "defaultProfitMargin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "disputeTrade",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "forceCancelTrade",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fundTrade", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getContractBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getTrade", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "platformWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "resolveDispute",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tradeCount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "trades", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateDefaultFeeRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateDefaultProfitMargin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updatePlatformWallet",
    data: BytesLike
  ): Result;
}

export namespace ArbitrationResolvedEvent {
  export type InputTuple = [
    tradeId: BigNumberish,
    winner: AddressLike,
    buyerAmount: BigNumberish,
    sellerAmount: BigNumberish
  ];
  export type OutputTuple = [
    tradeId: bigint,
    winner: string,
    buyerAmount: bigint,
    sellerAmount: bigint
  ];
  export interface OutputObject {
    tradeId: bigint;
    winner: string;
    buyerAmount: bigint;
    sellerAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TradeCancelledEvent {
  export type InputTuple = [tradeId: BigNumberish];
  export type OutputTuple = [tradeId: bigint];
  export interface OutputObject {
    tradeId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TradeCompletedEvent {
  export type InputTuple = [tradeId: BigNumberish];
  export type OutputTuple = [tradeId: bigint];
  export interface OutputObject {
    tradeId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TradeConfirmedEvent {
  export type InputTuple = [tradeId: BigNumberish];
  export type OutputTuple = [tradeId: bigint];
  export interface OutputObject {
    tradeId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TradeCreatedEvent {
  export type InputTuple = [
    tradeId: BigNumberish,
    buyer: AddressLike,
    seller: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [
    tradeId: bigint,
    buyer: string,
    seller: string,
    amount: bigint
  ];
  export interface OutputObject {
    tradeId: bigint;
    buyer: string;
    seller: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TradeDisputedEvent {
  export type InputTuple = [tradeId: BigNumberish, initiator: AddressLike];
  export type OutputTuple = [tradeId: bigint, initiator: string];
  export interface OutputObject {
    tradeId: bigint;
    initiator: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TradeFundedEvent {
  export type InputTuple = [
    tradeId: BigNumberish,
    amount: BigNumberish,
    sellerCollateral: BigNumberish
  ];
  export type OutputTuple = [
    tradeId: bigint,
    amount: bigint,
    sellerCollateral: bigint
  ];
  export interface OutputObject {
    tradeId: bigint;
    amount: bigint;
    sellerCollateral: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface MultiTradeEscrow extends BaseContract {
  connect(runner?: ContractRunner | null): MultiTradeEscrow;
  waitForDeployment(): Promise<this>;

  interface: MultiTradeEscrowInterface;

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

  autoCancelTrades: TypedContractMethod<[], [void], "nonpayable">;

  cancelTrade: TypedContractMethod<
    [_tradeId: BigNumberish],
    [void],
    "nonpayable"
  >;

  confirmTrade: TypedContractMethod<
    [_tradeId: BigNumberish],
    [void],
    "payable"
  >;

  createTrade: TypedContractMethod<
    [
      _buyer: AddressLike,
      _seller: AddressLike,
      _arbitrator: AddressLike,
      _cryptoAmount: BigNumberish,
      _buyerCollateral: BigNumberish,
      _sellerCollateral: BigNumberish,
      _tradeDuration: BigNumberish,
      _feeRate: BigNumberish,
      _profitMargin: BigNumberish
    ],
    [bigint],
    "nonpayable"
  >;

  defaultFeeRate: TypedContractMethod<[], [bigint], "view">;

  defaultProfitMargin: TypedContractMethod<[], [bigint], "view">;

  disputeTrade: TypedContractMethod<
    [_tradeId: BigNumberish],
    [void],
    "nonpayable"
  >;

  forceCancelTrade: TypedContractMethod<
    [_tradeId: BigNumberish],
    [void],
    "nonpayable"
  >;

  fundTrade: TypedContractMethod<[_tradeId: BigNumberish], [void], "payable">;

  getContractBalance: TypedContractMethod<[], [bigint], "view">;

  getTrade: TypedContractMethod<
    [_tradeId: BigNumberish],
    [
      [
        string,
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint
      ] & {
        buyer: string;
        seller: string;
        arbitrator: string;
        cryptoAmount: bigint;
        buyerCollateral: bigint;
        sellerCollateral: bigint;
        feeRate: bigint;
        profitMargin: bigint;
        tradeDeadline: bigint;
        state: bigint;
      }
    ],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  platformWallet: TypedContractMethod<[], [string], "view">;

  resolveDispute: TypedContractMethod<
    [_tradeId: BigNumberish, buyerPercentage: BigNumberish],
    [void],
    "nonpayable"
  >;

  tradeCount: TypedContractMethod<[], [bigint], "view">;

  trades: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        string,
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint
      ] & {
        id: bigint;
        buyer: string;
        seller: string;
        arbitrator: string;
        cryptoAmount: bigint;
        buyerCollateral: bigint;
        sellerCollateral: bigint;
        feeRate: bigint;
        profitMargin: bigint;
        tradeDeadline: bigint;
        state: bigint;
      }
    ],
    "view"
  >;

  updateDefaultFeeRate: TypedContractMethod<
    [_newFeeRate: BigNumberish],
    [void],
    "nonpayable"
  >;

  updateDefaultProfitMargin: TypedContractMethod<
    [_newProfitMargin: BigNumberish],
    [void],
    "nonpayable"
  >;

  updatePlatformWallet: TypedContractMethod<
    [_newPlatformWallet: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "autoCancelTrades"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "cancelTrade"
  ): TypedContractMethod<[_tradeId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "confirmTrade"
  ): TypedContractMethod<[_tradeId: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "createTrade"
  ): TypedContractMethod<
    [
      _buyer: AddressLike,
      _seller: AddressLike,
      _arbitrator: AddressLike,
      _cryptoAmount: BigNumberish,
      _buyerCollateral: BigNumberish,
      _sellerCollateral: BigNumberish,
      _tradeDuration: BigNumberish,
      _feeRate: BigNumberish,
      _profitMargin: BigNumberish
    ],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "defaultFeeRate"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "defaultProfitMargin"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "disputeTrade"
  ): TypedContractMethod<[_tradeId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "forceCancelTrade"
  ): TypedContractMethod<[_tradeId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "fundTrade"
  ): TypedContractMethod<[_tradeId: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "getContractBalance"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getTrade"
  ): TypedContractMethod<
    [_tradeId: BigNumberish],
    [
      [
        string,
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint
      ] & {
        buyer: string;
        seller: string;
        arbitrator: string;
        cryptoAmount: bigint;
        buyerCollateral: bigint;
        sellerCollateral: bigint;
        feeRate: bigint;
        profitMargin: bigint;
        tradeDeadline: bigint;
        state: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "platformWallet"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "resolveDispute"
  ): TypedContractMethod<
    [_tradeId: BigNumberish, buyerPercentage: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "tradeCount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "trades"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        string,
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint
      ] & {
        id: bigint;
        buyer: string;
        seller: string;
        arbitrator: string;
        cryptoAmount: bigint;
        buyerCollateral: bigint;
        sellerCollateral: bigint;
        feeRate: bigint;
        profitMargin: bigint;
        tradeDeadline: bigint;
        state: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "updateDefaultFeeRate"
  ): TypedContractMethod<[_newFeeRate: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateDefaultProfitMargin"
  ): TypedContractMethod<
    [_newProfitMargin: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "updatePlatformWallet"
  ): TypedContractMethod<
    [_newPlatformWallet: AddressLike],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "ArbitrationResolved"
  ): TypedContractEvent<
    ArbitrationResolvedEvent.InputTuple,
    ArbitrationResolvedEvent.OutputTuple,
    ArbitrationResolvedEvent.OutputObject
  >;
  getEvent(
    key: "TradeCancelled"
  ): TypedContractEvent<
    TradeCancelledEvent.InputTuple,
    TradeCancelledEvent.OutputTuple,
    TradeCancelledEvent.OutputObject
  >;
  getEvent(
    key: "TradeCompleted"
  ): TypedContractEvent<
    TradeCompletedEvent.InputTuple,
    TradeCompletedEvent.OutputTuple,
    TradeCompletedEvent.OutputObject
  >;
  getEvent(
    key: "TradeConfirmed"
  ): TypedContractEvent<
    TradeConfirmedEvent.InputTuple,
    TradeConfirmedEvent.OutputTuple,
    TradeConfirmedEvent.OutputObject
  >;
  getEvent(
    key: "TradeCreated"
  ): TypedContractEvent<
    TradeCreatedEvent.InputTuple,
    TradeCreatedEvent.OutputTuple,
    TradeCreatedEvent.OutputObject
  >;
  getEvent(
    key: "TradeDisputed"
  ): TypedContractEvent<
    TradeDisputedEvent.InputTuple,
    TradeDisputedEvent.OutputTuple,
    TradeDisputedEvent.OutputObject
  >;
  getEvent(
    key: "TradeFunded"
  ): TypedContractEvent<
    TradeFundedEvent.InputTuple,
    TradeFundedEvent.OutputTuple,
    TradeFundedEvent.OutputObject
  >;

  filters: {
    "ArbitrationResolved(uint256,address,uint256,uint256)": TypedContractEvent<
      ArbitrationResolvedEvent.InputTuple,
      ArbitrationResolvedEvent.OutputTuple,
      ArbitrationResolvedEvent.OutputObject
    >;
    ArbitrationResolved: TypedContractEvent<
      ArbitrationResolvedEvent.InputTuple,
      ArbitrationResolvedEvent.OutputTuple,
      ArbitrationResolvedEvent.OutputObject
    >;

    "TradeCancelled(uint256)": TypedContractEvent<
      TradeCancelledEvent.InputTuple,
      TradeCancelledEvent.OutputTuple,
      TradeCancelledEvent.OutputObject
    >;
    TradeCancelled: TypedContractEvent<
      TradeCancelledEvent.InputTuple,
      TradeCancelledEvent.OutputTuple,
      TradeCancelledEvent.OutputObject
    >;

    "TradeCompleted(uint256)": TypedContractEvent<
      TradeCompletedEvent.InputTuple,
      TradeCompletedEvent.OutputTuple,
      TradeCompletedEvent.OutputObject
    >;
    TradeCompleted: TypedContractEvent<
      TradeCompletedEvent.InputTuple,
      TradeCompletedEvent.OutputTuple,
      TradeCompletedEvent.OutputObject
    >;

    "TradeConfirmed(uint256)": TypedContractEvent<
      TradeConfirmedEvent.InputTuple,
      TradeConfirmedEvent.OutputTuple,
      TradeConfirmedEvent.OutputObject
    >;
    TradeConfirmed: TypedContractEvent<
      TradeConfirmedEvent.InputTuple,
      TradeConfirmedEvent.OutputTuple,
      TradeConfirmedEvent.OutputObject
    >;

    "TradeCreated(uint256,address,address,uint256)": TypedContractEvent<
      TradeCreatedEvent.InputTuple,
      TradeCreatedEvent.OutputTuple,
      TradeCreatedEvent.OutputObject
    >;
    TradeCreated: TypedContractEvent<
      TradeCreatedEvent.InputTuple,
      TradeCreatedEvent.OutputTuple,
      TradeCreatedEvent.OutputObject
    >;

    "TradeDisputed(uint256,address)": TypedContractEvent<
      TradeDisputedEvent.InputTuple,
      TradeDisputedEvent.OutputTuple,
      TradeDisputedEvent.OutputObject
    >;
    TradeDisputed: TypedContractEvent<
      TradeDisputedEvent.InputTuple,
      TradeDisputedEvent.OutputTuple,
      TradeDisputedEvent.OutputObject
    >;

    "TradeFunded(uint256,uint256,uint256)": TypedContractEvent<
      TradeFundedEvent.InputTuple,
      TradeFundedEvent.OutputTuple,
      TradeFundedEvent.OutputObject
    >;
    TradeFunded: TypedContractEvent<
      TradeFundedEvent.InputTuple,
      TradeFundedEvent.OutputTuple,
      TradeFundedEvent.OutputObject
    >;
  };
}
