/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ERC20TokenInterface,
  ERC20TokenInterfaceInterface,
} from "../ERC20TokenInterface";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "interfaceHash",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "canImplementInterfaceForAddress",
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
];

export class ERC20TokenInterface__factory {
  static readonly abi = _abi;
  static createInterface(): ERC20TokenInterfaceInterface {
    return new utils.Interface(_abi) as ERC20TokenInterfaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC20TokenInterface {
    return new Contract(address, _abi, signerOrProvider) as ERC20TokenInterface;
  }
}
