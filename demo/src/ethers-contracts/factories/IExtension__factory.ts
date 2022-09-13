/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IExtension, IExtensionInterface } from "../IExtension";

const _abi = [
  {
    inputs: [],
    name: "extensionDeployer",
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
    name: "externalFunctions",
    outputs: [
      {
        internalType: "bytes4[]",
        name: "",
        type: "bytes4[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "interfaceLabel",
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
    inputs: [
      {
        internalType: "enum TokenStandard",
        name: "standard",
        type: "uint8",
      },
    ],
    name: "isTokenStandardSupported",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "packageHash",
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
    name: "requiredRoles",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
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
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IExtension__factory {
  static readonly abi = _abi;
  static createInterface(): IExtensionInterface {
    return new utils.Interface(_abi) as IExtensionInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IExtension {
    return new Contract(address, _abi, signerOrProvider) as IExtension;
  }
}