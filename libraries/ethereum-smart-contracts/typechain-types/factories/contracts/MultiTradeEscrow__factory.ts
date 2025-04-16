/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  MultiTradeEscrow,
  MultiTradeEscrowInterface,
} from "../../contracts/MultiTradeEscrow";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_platformWallet",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_feeRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_profitMargin",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tradeId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "buyerAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sellerAmount",
        type: "uint256",
      },
    ],
    name: "ArbitrationResolved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tradeId",
        type: "uint256",
      },
    ],
    name: "TradeCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tradeId",
        type: "uint256",
      },
    ],
    name: "TradeCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tradeId",
        type: "uint256",
      },
    ],
    name: "TradeConfirmed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tradeId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TradeCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tradeId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "initiator",
        type: "address",
      },
    ],
    name: "TradeDisputed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tradeId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sellerCollateral",
        type: "uint256",
      },
    ],
    name: "TradeFunded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tradeId",
        type: "uint256",
      },
    ],
    name: "cancelTrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tradeId",
        type: "uint256",
      },
    ],
    name: "confirmTrade",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_buyer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_seller",
        type: "address",
      },
      {
        internalType: "address",
        name: "_arbitrator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_cryptoAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_buyerCollateral",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_sellerCollateral",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tradeDuration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_feeRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_profitMargin",
        type: "uint256",
      },
    ],
    name: "createTrade",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultFeeRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultProfitMargin",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tradeId",
        type: "uint256",
      },
    ],
    name: "disputeTrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tradeId",
        type: "uint256",
      },
    ],
    name: "fundTrade",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tradeId",
        type: "uint256",
      },
    ],
    name: "getTrade",
    outputs: [
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "address",
        name: "arbitrator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "cryptoAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "buyerCollateral",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sellerCollateral",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "feeRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "profitMargin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tradeDeadline",
        type: "uint256",
      },
      {
        internalType: "enum MultiTradeEscrow.TradeState",
        name: "state",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "platformWallet",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tradeId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "buyerPercentage",
        type: "uint256",
      },
    ],
    name: "resolveDispute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tradeCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "trades",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "address",
        name: "arbitrator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "cryptoAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "buyerCollateral",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sellerCollateral",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "feeRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "profitMargin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tradeDeadline",
        type: "uint256",
      },
      {
        internalType: "enum MultiTradeEscrow.TradeState",
        name: "state",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newFeeRate",
        type: "uint256",
      },
    ],
    name: "updateDefaultFeeRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newProfitMargin",
        type: "uint256",
      },
    ],
    name: "updateDefaultProfitMargin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newPlatformWallet",
        type: "address",
      },
    ],
    name: "updatePlatformWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60803461017657601f6113ca38819003918201601f19168301916001600160401b0383118484101761017b578084926060946040528339810103126101765780516001600160a01b03811691908290036101765760406020820151910151918015610131576127108210156100f8576127108310156100b35760018060a01b031960005416176000556002556003553360018060a01b03196001541617600155600060045560405161123890816101928239f35b60405162461bcd60e51b815260206004820152601660248201527f50726f666974206d617267696e20746f6f2068696768000000000000000000006044820152606490fd5b60405162461bcd60e51b815260206004820152601160248201527008ccaca40e4c2e8ca40e8dede40d0d2ced607b1b6044820152606490fd5b60405162461bcd60e51b815260206004820152601760248201527f496e76616c696420706c6174666f726d2077616c6c65740000000000000000006044820152606490fd5b600080fd5b634e487b7160e01b600052604160045260246000fdfe608080604052600436101561001357600080fd5b60003560e01c90816307d334551461102e5750806309ec6cc714610eb65780631e6c598e14610dfa578063239c903014610ddc5780632db25e0514610d19578063347291bd14610bb95780635b427fb314610b7e5780636f9fb98a14610b625780638ba9f70814610a295780638c2e9b38146107195780638da5cb5b146106f05780639ec0507f1461049b578063ada4ef3014610401578063bd55022a146103e3578063bdc84ac314610143578063f838e4b5146101085763fa2af9da146100da57600080fd5b34610103576000366003190112610103576000546040516001600160a01b039091168152602090f35b600080fd5b346101035760203660031901126101035760043561013160018060a01b03600154163314611107565b61013e61271082106111a2565b600255005b3461010357604036600319011261010357600435600081815260056020526040902060030154602435906001600160a01b0316330361038f5781600052600560205260ff600a604060002001541660068110156103795760036101a691146110bc565b6101b3600454831061106c565b6064811161033f5781600052600560205260406000209060048201546102066101ff6127106101e66007870154856111e2565b046127106101f86008880154866111e2565b04906110af565b80926111f5565b90600080808061024161023561022960646102218b8b6111e2565b0480996111f5565b9760058b0154906110af565b9660068a0154906110af565b81549095906001600160a01b0316828215610336575bf115610318576001840160008080808660018060a01b0386541682821561032d575bf115610318576002850160008080808660018060a01b03865416828215610324575bf115610318576032606095600a7f7c4a227b7c31773c6fb876de0aefb5be3c7960e8ddcd29f089f955ed937415169801600460ff19825416179055116000146103065750546001600160a01b0316915b6040519260018060a01b0316835260208301526040820152a2005b546001600160a01b03169290506102eb565b6040513d6000823e3d90fd5b506108fc61029b565b506108fc610279565b506108fc610257565b60405162461bcd60e51b8152602060048201526012602482015271496e76616c69642070657263656e7461676560701b6044820152606490fd5b634e487b7160e01b600052602160045260246000fd5b60405162461bcd60e51b815260206004820152602660248201527f4f6e6c792061726269747261746f722063616e2063616c6c20746869732066756044820152653731ba34b7b760d11b6064820152608490fd5b34610103576000366003190112610103576020600454604051908152f35b346101035760203660031901126101035761041a611056565b61042f60018060a01b03600154163314611107565b6001600160a01b03168015610456576001600160601b0360a01b6000541617600055600080f35b60405162461bcd60e51b815260206004820152601760248201527f496e76616c696420706c6174666f726d2077616c6c65740000000000000000006044820152606490fd5b6020366003190112610103576004356000818152600560205260409020600101546001600160a01b031633036106a15780600052600560205260ff600a604060002001541660068110156103795760016104f591146110bc565b610502600454821061106c565b80600052600560205260406000206005810154341061065c57600a01805460ff19166002179055807f56ab764471b8940ceae99d18ee42f7ccef7190a57d284469b2321de29c6afa9b600080a28060005260056020526040600020600481015460008080806105a561059a61059361271061058160078b01548a6111e2565b046127106101f860088c01548b6111e2565b80976111f5565b6006880154906110af565b81549095906001600160a01b0316828215610653575bf1156103185760028201546000918291829182916001600160a01b031682821561064a575bf11561031857600080808060018060a01b03600186015416600586015490828215610641575bf11561031857600a01805460ff191660041790557f60f91a26281f20fb528663f4da55773c83e2ee8a7a5dddb6d1753749e81dc49b600080a2005b506108fc610606565b506108fc6105e0565b506108fc6105bb565b60405162461bcd60e51b815260206004820152601960248201527f427579657220636f6c6c61746572616c207265717569726564000000000000006044820152606490fd5b60405162461bcd60e51b815260206004820152602160248201527f4f6e6c792062757965722063616e2063616c6c20746869732066756e6374696f6044820152603760f91b6064820152608490fd5b34610103576000366003190112610103576001546040516001600160a01b039091168152602090f35b346101035761012036600319011261010357610733611056565b6024356001600160a01b0381169190829003610103576044356001600160a01b03811692908390036101035761010435916001600160a01b031660643560e43582151580610a20575b80610a17575b156109de57811561099957801561098f57935b801561098557935b6107aa61271082106111a2565b6107b7612710861061115d565b60045494600019861461096f57600186016004556107d760c435426110af565b9060405192610160840184811067ffffffffffffffff821117610959576040528784526020840198868a526040850190888252606086019081526080860187815260a0870191608435835260c088019360a435855260e089019586526101008901968752610120890197885261014089019d60008f528d6000526005602052604060002099518a55600160a01b6001900390511660018a0190600160a01b60019003166001600160601b0360a01b825416179055600160a01b600190039051166002890190600160a01b60019003166001600160601b0360a01b825416179055600160a01b600190039051166003880190600160a01b60019003166001600160601b0360a01b825416179055516004870155516005860155516006850155516007840155516008830155516009820155600a01945194600686101561037957602085927f7db1856a9087992b8c7c25a7f1622a9b144ff325953aee6bbb6d38d762c189f692829860ff80198354169116179055604051908152a4604051908152f35b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052601160045260246000fd5b506003549361079d565b5060025493610795565b60405162461bcd60e51b815260206004820152601d60248201527f416d6f756e74206d7573742062652067726561746572207468616e20300000006044820152606490fd5b60405162461bcd60e51b8152602060048201526011602482015270496e76616c69642061646472657373657360781b6044820152606490fd5b50851515610782565b5083151561077c565b346101035760203660031901126101035760043580600052600560205260018060a01b036001604060002001541633148015610b40575b15610ae45780600052600560205260ff600a60406000200154166006811015610379576001610a8f91146110bc565b610a9c600454821061106c565b806000526005602052600a604060002001600360ff198254161790557f1716a391765fa98cf509fa991d6f31a43dcb9c128bdceca13baf8ae746c4d09c6020604051338152a2005b60405162461bcd60e51b815260206004820152602e60248201527f4f6e6c79207472616465207061727469636970616e74732063616e2063616c6c60448201526d103a3434b990333ab731ba34b7b760911b6064820152608490fd5b5080600052600560205260018060a01b03600260406000200154163314610a60565b3461010357600036600319011261010357602047604051908152f35b3461010357602036600319011261010357600435610ba760018060a01b03600154163314611107565b610bb4612710821061115d565b600355005b6020366003190112610103576004356000818152600560205260409020600201546001600160a01b03163303610cc95780600052600560205260ff600a6040600020015416600681101561037957610c1190156110bc565b610c1e600454821061106c565b806000526005602052604060002060048101908154610c4360068301918254906110af565b3403610c8c577fbe01c2c653297af8400bf87c16beb2690b9e0a2c54d7a9728222669fbace077392600a60409301600160ff1982541617905554905482519182526020820152a2005b60405162461bcd60e51b8152602060048201526015602482015274125b98dbdc9c9958dd08185b5bdd5b9d081cd95b9d605a1b6044820152606490fd5b60405162461bcd60e51b815260206004820152602260248201527f4f6e6c792073656c6c65722063616e2063616c6c20746869732066756e63746960448201526137b760f11b6064820152608490fd5b3461010357602036600319011261010357600435610d3a600454821061106c565b60005260056020526101406040600020610dda60018060a01b036001830154169160018060a01b036002820154169060018060a01b036003820154166004820154600583015460068401549060078501549260088601549460ff600a600989015498015416976040519a8b5260208b015260408a01526060890152608088015260a087015260c086015260e0850152610100840152610120830190611049565bf35b34610103576000366003190112610103576020600354604051908152f35b346101035760203660031901126101035760043560005260056020526101606040600020610dda81549160018060a01b036001820154169060018060a01b0360028201541660018060a01b036003830154166004830154600584015460068501549160078601549360088701549560ff600a60098a015499015416986040519b8c5260208c015260408b015260608a0152608089015260a088015260c087015260e0860152610100850152610120840152610140830190611049565b3461010357602036600319011261010357600435610ed7600454821061106c565b80600052600560205260406000206009810154421115610fe957600a81019060ff8254166006811015806103795781158015610fdc575b15610f975761037957600114610f52575b50805460ff191660051790557f4e02dcf02d8510f6c8a6878a3c54ae6e2bfbf552df29221d7a1eed173a6b1ae7600080a2005b600080808093610f7960018060a01b036002830154169160066004820154910154906110af565b90828215610f8e575bf1156103185782610f1f565b506108fc610f82565b60405162461bcd60e51b815260206004820152601e60248201527f43616e6e6f742063616e63656c20696e2063757272656e7420737461746500006044820152606490fd5b5050600060018214610f0e565b60405162461bcd60e51b815260206004820152601a60248201527f547261646520646561646c696e65206e6f7420726561636865640000000000006044820152606490fd5b34610103576000366003190112610103576020906002548152f35b9060068210156103795752565b600435906001600160a01b038216820361010357565b1561107357565b60405162461bcd60e51b8152602060048201526014602482015273151c98591948191bd95cc81b9bdd08195e1a5cdd60621b6044820152606490fd5b9190820180921161096f57565b156110c357565b606460405162461bcd60e51b815260206004820152602060248201527f496e76616c696420737461746520666f722074686973206f7065726174696f6e6044820152fd5b1561110e57565b60405162461bcd60e51b815260206004820152602160248201527f4f6e6c79206f776e65722063616e2063616c6c20746869732066756e6374696f6044820152603760f91b6064820152608490fd5b1561116457565b60405162461bcd60e51b81526020600482015260166024820152750a0e4deccd2e840dac2e4ced2dc40e8dede40d0d2ced60531b6044820152606490fd5b156111a957565b60405162461bcd60e51b815260206004820152601160248201527008ccaca40e4c2e8ca40e8dede40d0d2ced607b1b6044820152606490fd5b8181029291811591840414171561096f57565b9190820391821161096f5756fea264697066735822122069f1d80bf4b0b73d2b0882af5c8c608018d42abc20cd1e5b183459152244a5c364736f6c634300081c0033";

type MultiTradeEscrowConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MultiTradeEscrowConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MultiTradeEscrow__factory extends ContractFactory {
  constructor(...args: MultiTradeEscrowConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _platformWallet: AddressLike,
    _feeRate: BigNumberish,
    _profitMargin: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _platformWallet,
      _feeRate,
      _profitMargin,
      overrides || {}
    );
  }
  override deploy(
    _platformWallet: AddressLike,
    _feeRate: BigNumberish,
    _profitMargin: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _platformWallet,
      _feeRate,
      _profitMargin,
      overrides || {}
    ) as Promise<
      MultiTradeEscrow & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MultiTradeEscrow__factory {
    return super.connect(runner) as MultiTradeEscrow__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MultiTradeEscrowInterface {
    return new Interface(_abi) as MultiTradeEscrowInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MultiTradeEscrow {
    return new Contract(address, _abi, runner) as unknown as MultiTradeEscrow;
  }
}
