import { metaTx } from "./TxForwarder";

export const forwardRequest = async (
    from: string,
    to: string,
    nonce:string,
    inputData: string
  ) : Promise<metaTx> => {
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