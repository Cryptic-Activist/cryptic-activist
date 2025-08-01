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
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { MockERC20, MockERC20Interface } from "../../contracts/MockERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_decimals",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_totalSupply",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
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
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523461036057610a5a8038038061001981610365565b9283398101906080818303126103605780516001600160401b038111610360578261004591830161038a565b602082015190926001600160401b0382116103605761006591830161038a565b9060408101519060ff8216809203610360576060015183519091906001600160401b03811161026b57600054600181811c91168015610356575b602082101461024b57601f81116102f2575b50602094601f821160011461028c57948192939495600092610281575b50508160011b916000199060031b1c1916176000555b82516001600160401b03811161026b57600154600181811c91168015610261575b602082101461024b57601f81116101e6575b506020601f821160011461017f5781929394600092610174575b50508160011b916000199060031b1c1916176001555b60ff1960025416176002558060035533600052600460205260406000205560405161066490816103f68239f35b015190503880610131565b601f198216906001600052806000209160005b8181106101ce575095836001959697106101b5575b505050811b01600155610147565b015160001960f88460031b161c191690553880806101a7565b9192602060018192868b015181550194019201610192565b60016000527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6601f830160051c81019160208410610241575b601f0160051c01905b8181106102355750610117565b60008155600101610228565b909150819061021f565b634e487b7160e01b600052602260045260246000fd5b90607f1690610105565b634e487b7160e01b600052604160045260246000fd5b0151905038806100ce565b601f1982169560008052806000209160005b8881106102da575083600195969798106102c1575b505050811b016000556100e4565b015160001960f88460031b161c191690553880806102b3565b9192602060018192868501518155019401920161029e565b600080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563601f830160051c8101916020841061034c575b601f0160051c01905b81811061034057506100b1565b60008155600101610333565b909150819061032a565b90607f169061009f565b600080fd5b6040519190601f01601f191682016001600160401b0381118382101761026b57604052565b81601f82011215610360578051906001600160401b03821161026b576103b9601f8301601f1916602001610365565b92828452602083830101116103605760005b8281106103e057505060206000918301015290565b806020809284010151828287010152016103cb56fe6080604052600436101561001257600080fd5b60003560e01c806306fdde03146104cf578063095ea7b31461045557806318160ddd1461043757806323b872dd1461036a578063313ce5671461034957806340c10f19146102ce57806370a082311461029457806395d89b4114610173578063a9059cbb146100e05763dd62ed3e1461008a57600080fd5b346100db5760403660031901126100db576100a36105d2565b6100ab6105e8565b6001600160a01b039182166000908152600560209081526040808320949093168252928352819020549051908152f35b600080fd5b346100db5760403660031901126100db576100f96105d2565b6024359033600052600460205260406000206101168382546105fe565b905560018060a01b031690816000526004602052604060002061013a828254610621565b90556040519081527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60203392a3602060405160018152f35b346100db5760003660031901126100db576000604051816001548060011c9060018116801561028a575b6020831081146102765782855290811561025a5750600114610206575b50819003601f01601f1916810167ffffffffffffffff8111828210176101f2576101ee925060405260405191829182610589565b0390f35b634e487b7160e01b83526041600452602483fd5b600184529050827fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf65b828210610244575060209150820101836101ba565b600181602092548385880101520191019061022f565b90506020925060ff191682840152151560051b820101836101ba565b634e487b7160e01b86526022600452602486fd5b91607f169161019d565b346100db5760203660031901126100db576001600160a01b036102b56105d2565b1660005260046020526020604060002054604051908152f35b346100db5760403660031901126100db576102e76105d2565b60007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60206024359360018060a01b031693848452600482526040842061032f828254610621565b905561033d81600354610621565b600355604051908152a3005b346100db5760003660031901126100db57602060ff60025416604051908152f35b346100db5760603660031901126100db576103836105d2565b61038b6105e8565b7fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60206044359360018060a01b0316928360005260058252604060002060018060a01b033316600052825260406000206103e68682546105fe565b9055836000526004825260406000206104008682546105fe565b905560018060a01b03169384600052600482526040600020610423828254610621565b9055604051908152a3602060405160018152f35b346100db5760003660031901126100db576020600354604051908152f35b346100db5760403660031901126100db5761046e6105d2565b3360008181526005602090815260408083206001600160a01b03909516808452948252918290206024359081905591519182527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a3602060405160018152f35b346100db5760003660031901126100db5760006040518182548060011c9060018116801561057f575b6020831081146102765782855290811561025a57506001146105485750819003601f01601f1916810167ffffffffffffffff8111828210176101f2576101ee925060405260405191829182610589565b90508280526020832083905b828210610569575060209150820101836101ba565b6001816020925483858801015201910190610554565b91607f16916104f8565b91909160208152825180602083015260005b8181106105bc575060409293506000838284010152601f8019910116010190565b806020809287010151604082860101520161059b565b600435906001600160a01b03821682036100db57565b602435906001600160a01b03821682036100db57565b9190820391821161060b57565b634e487b7160e01b600052601160045260246000fd5b9190820180921161060b5756fea26469706673582212200515d6964f65d3a06743c0efb3bcd7c99556f8e85767271d42369bf4aeec4fa364736f6c634300081c0033";

type MockERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockERC20__factory extends ContractFactory {
  constructor(...args: MockERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _name: string,
    _symbol: string,
    _decimals: BigNumberish,
    _totalSupply: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _name,
      _symbol,
      _decimals,
      _totalSupply,
      overrides || {}
    );
  }
  override deploy(
    _name: string,
    _symbol: string,
    _decimals: BigNumberish,
    _totalSupply: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _name,
      _symbol,
      _decimals,
      _totalSupply,
      overrides || {}
    ) as Promise<
      MockERC20 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MockERC20__factory {
    return super.connect(runner) as MockERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockERC20Interface {
    return new Interface(_abi) as MockERC20Interface;
  }
  static connect(address: string, runner?: ContractRunner | null): MockERC20 {
    return new Contract(address, _abi, runner) as unknown as MockERC20;
  }
}
