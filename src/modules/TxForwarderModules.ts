import { TxForwarder } from "../utils/lodis/libs/TxForwarder";

export const getNonceFronTxForwarder = async(address:string,txForwarder:TxForwarder) => {
    return await txForwarder.getNonce(address)
}