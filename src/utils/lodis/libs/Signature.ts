import { forwardRequest_domain } from "../../sign/dataTypes";
import { TxForwarder, metaTx } from "./TxForwarder";

export const forwardRequest = (
    from: string,
    to: string,
    nonce:string,
    inputData: string
  ) : metaTx => {
    try {
      return {
        from: from,
        to: to,
        value: 0,
        gas: 1500000,
        nonce: Number(nonce),
        data: inputData,
      };
    } catch (error) {
      throw error;
    }
  }
