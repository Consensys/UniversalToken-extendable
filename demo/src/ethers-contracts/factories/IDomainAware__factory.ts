/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IDomainAware, IDomainAwareInterface } from "../IDomainAware";

const _abi = [
  {
    inputs: [],
    name: "domainName",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "domainVersion",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "generateDomainSeparator",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "domainSeparator",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IDomainAware__factory {
  static readonly abi = _abi;
  static createInterface(): IDomainAwareInterface {
    return new utils.Interface(_abi) as IDomainAwareInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IDomainAware {
    return new Contract(address, _abi, signerOrProvider) as IDomainAware;
  }
}
