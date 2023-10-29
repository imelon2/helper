import { Order } from "../utils/lodis/libs/Order";
import { _praseOrderdata } from "../utils/prase";

export const SearchOrderById = async (id:number,order:Order) => {
    try {        
        const OrderData = await order.getOrder(id)
        return _praseOrderdata(OrderData)
    } catch (error) {
        console.log(error);
    }
}