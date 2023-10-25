import { JsonRpcProvider, Provider } from "@ethersproject/providers";
import { Interface, Result } from "ethers/lib/utils";
import { Contract, ethers } from "ethers";
import OrderSol from "../contracts/Order.sol/Order.json";

export class Order {
  private provider:  JsonRpcProvider;
  private abi: Array<any>;
  private contract: any;
  private interface: Interface;
  public CA: string;

  constructor(CA: string, provider: JsonRpcProvider) {
    this.CA = CA;
    this.provider = provider;
    this.abi = OrderSol.abi;
    this.contract = new Contract(this.CA, this.abi, this.provider);
    this.interface = new Interface(this.abi);
  }

  async connect(provider: Provider): Promise<void> {
    this.contract = this.contract.connect(provider);
  }

  async getOrderId(): Promise<number> {
    try {
      const id = await this.contract.getOrderId();
      return id;
    } catch (error) {
      throw error;
    }
  }
  async getNonce(orderId: number, userAddress: string): Promise<number> {
    try {
      const nonce = await this.contract.getNonce(orderId, userAddress);
      return nonce;
    } catch (error) {
      throw error
    }
  }

  async getOrder(id: number): Promise<any> {
    try {
      const order = await this.contract.getOrder(id);
      return order;
    } catch (error) {
      throw error;
    }
  }

  async getRecord(user: string): Promise<any> {
    try {
      const record = await this.contract.getRecord(user);
      return record;
    } catch (error) {
      throw error
    }
  }

  async signatureData(orderId: number, signer: string): Promise<any> {
  try {
    const data = await this.contract.getOrder(orderId);
    const nonce = await this.contract.getNonce(orderId, signer);
    const sigData = {
      orderId: data[0],
      shipper: data[1],
      carrier: data[2],
      departure: data[3],
      destination: data[4],
      packageWeight: data[5],
      packagePrice: data[6],
      reward: data[7],
      collateral: data[8],
      expiredDate: data[11],
      nonce: nonce,
    };

    return sigData;
  } catch (error) {
    throw error;
  }
  }

  async cancelOrderBeforeMatch(orderId: number): Promise<string> {
    const rawdata = this.interface.encodeFunctionData(
      "cancelOrderBeforeMatch",
      [orderId]
    );
    return rawdata;
  }

  async cancelOrderBeforePickUp(orderId: number): Promise<string> {
    const rawdata = this.interface.encodeFunctionData(
      "cancelOrderBeforePickUp",
      [orderId]
    );
    return rawdata;
  }

  async cancelOrderByFault(
    orderId: number,
    signer: string,
    cancelSig: string
  ): Promise<string> {
    try {
      const rawdata = this.interface.encodeFunctionData("cancelOrderByFault", [
        orderId,
        await this.signatureData(orderId, signer),
        cancelSig,
      ]);
      return rawdata;
    } catch (error) {
      throw error;
    }
  }

  async createOrder(
    shipper: string,
    departure: string,
    destination: string,
    weight: string,
    price: string,
    expiredDate: string,
    ispickContact: boolean,
    iscompContact: boolean,
    extraData: string
  ): Promise<string> {
    const rawdata = this.interface.encodeFunctionData("createOrder", [
      shipper,
      ethers.utils.zeroPad(departure, 32), 
      ethers.utils.zeroPad(destination, 32),
      ethers.utils.zeroPad(weight, 32),
      price,
      expiredDate,
      ispickContact,
      iscompContact,
      extraData,
    ]);
    return rawdata;
  }

  async selectOrder(
    orderId: number,
    carrierOrderData: any,
    carrierOrderSig: string,
    carrierPermitData: any,
    carrierCollateralSig: string,
    shipperPermitData: any,
    shipperRewardSig: string
  ): Promise<string> {
    const rawdata = this.interface.encodeFunctionData("selectOrder", [
      orderId,
      carrierOrderData,
      carrierOrderSig,
      carrierPermitData,
      carrierCollateralSig,
      shipperPermitData,
      shipperRewardSig,
    ]);
    return rawdata;
  }

  async pickOrder(
    orderId: number,
    signer: string,
    shipperMsg: string
  ): Promise<string> {
    try {
      const rawdata = this.interface.encodeFunctionData("pickOrder", [
        orderId,
        await this.signatureData(orderId, signer),
        shipperMsg,
      ]);
      return rawdata;
    } catch (error) {
      throw error;
    }
  }

  async pickOrderWithOutSig(orderId: number): Promise<string> {
    const rawdata = this.interface.encodeFunctionData("pickOrderWithOutSig", [
      orderId,
    ]);
    return rawdata;
  }

  async delayPickUp(orderId: number): Promise<string> {
    const rawdata = this.interface.encodeFunctionData("delayPickUp", [orderId]);
    return rawdata;
  }

  async completeOrder(
    orderId: number,
    signer: string,
    shipper712Sig: string
  ): Promise<string> {
    try {
      const rawdata = this.interface.encodeFunctionData("completeOrder", [
        orderId,
        await this.signatureData(orderId, signer),
        shipper712Sig,
      ]);
      return rawdata;
    } catch (error) {
      throw error
    }
  }

  async completeOrderWithOutSig(orderId: number): Promise<string> {
    const rawdata = this.interface.encodeFunctionData(
      "completeOrderWithOutSig",
      [orderId]
    );
    return rawdata;
  }

  async expiredOrder(orderId: number): Promise<string> {
    const rawdata = this.interface.encodeFunctionData("expiredOrder", [
      orderId,
    ]);
    return rawdata;
  }

  decodeEventLog(eventFragmentName: string, logData: string): Result {
    const decodeData = this.interface.decodeEventLog(
      eventFragmentName,
      logData
    );
    return decodeData;
  }

  parseLog(logTopics: string[], logData: string): any {
    const parsed = this.interface.parseLog({
      topics: logTopics,
      data: logData,
    });
    return parsed;
  }
}
