/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ExtensionBase, ExtensionBaseInterface } from "../ExtensionBase";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

export class ExtensionBase__factory {
  static readonly abi = _abi;
  static createInterface(): ExtensionBaseInterface {
    return new utils.Interface(_abi) as ExtensionBaseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ExtensionBase {
    return new Contract(address, _abi, signerOrProvider) as ExtensionBase;
  }
}
