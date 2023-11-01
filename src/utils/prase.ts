import { ethers } from "ethers";
import { convertDate } from "./time";

type IOrderData = {
    orderId:number;
    shipper:string;
    carrier:string;
    departure:string;
    destination:string;
    packageWeight:string;
    price:string;
    reward:string;
    collateral:string;
    failDate:string;
    pickupDate:string;
    expiredDate:string;
    shipState:string;
    isDirect:boolean;
    ispickupContact:boolean;
    iscompleteContact:boolean;
    treasuryFee:string;
    shipperFee:string;
    carrierFee:string;
}
export const _praseOrderdata = (_orderData:any[]):IOrderData => {
    if(_orderData.length !== 19) throw new Error("Error up from praseOrderdata")
    return {
        orderId:_orderData[0].toString(),
        shipper:_orderData[1].toString(),
        carrier:_orderData[2].toString(),
        departure:_orderData[3].toString(),
        destination:_orderData[4].toString(),
        packageWeight:_orderData[5].toString(),
        price:_orderData[6].toString() + ` (${ethers.utils.formatEther(_orderData[6].toString())})`,
        reward:_orderData[7].toString() + ` (${ethers.utils.formatEther(_orderData[7].toString())})`,
        collateral:_orderData[8].toString() + ` (${ethers.utils.formatEther(_orderData[8].toString())})`,
        failDate: convertDate(_orderData[9] * 1000),
        pickupDate:convertDate(_orderData[10] * 1000),
        expiredDate:convertDate(_orderData[11] * 1000),
        shipState:_orderData[12].toString(),
        isDirect:_orderData[13],
        ispickupContact:_orderData[14],
        iscompleteContact:_orderData[15],
        treasuryFee:_orderData[16].toString(),
        shipperFee:_orderData[17].toString(),
        carrierFee:_orderData[18].toString(),
    }
}
export type IOrderEventData = {
    action:string|undefined;
    orderId:string;
    blockNumber:number;
    txHash:string;
    timestamp:string|number;
}
export const _parseOrderEvent = async(event:ethers.Event,provider:ethers.providers.JsonRpcProvider):Promise<IOrderEventData> => {
    const timestamp = (await provider.getBlock(event.blockNumber)).timestamp
    return {
        action:event.event,
        orderId:event.args!.orderId.toString(),
        blockNumber:event.blockNumber,
        txHash:event.transactionHash,
        timestamp : timestamp * 1000
    }

}