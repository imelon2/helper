import {
    initializeProvider,
    context,
    initializeCA,
    lodisSelector
} from "../utils/lodis/config"
import { TxForwarder } from "utils/lodis/libs/TxForwarder";
import { Order } from "../utils/lodis/libs/Order";
import { _praseOrderdata } from "../utils/prase";
import { Wallet, ethers } from "ethers";
import { forwardRequest } from "utils/lodis/libs/Signature";

export const GetLatestOrderId = async (order: Order) => {
    return await order.getOrderId()
}

export const SearchOrderById = async (id: number, order: Order) => {
    try {
        const OrderData = await order.getOrder(id)
        return _praseOrderdata(OrderData)
    } catch (error) {
        console.log(error);
    }
}

export const Sign2770DelayPickUp = async (_context: context, wallet: Wallet, OrderId: string | number) => {
    const provider = initializeProvider(_context);
    const _ca = initializeCA(_context);
    const _provider = new ethers.providers.JsonRpcProvider(provider.L2);
    const _order = new Order(_ca.order, _provider);
    const _txForwarder = new TxForwarder(_ca.forwarder, _provider);

    const nonce = await _txForwarder.getNonce(wallet.address);
    const data = await _order.delayPickUp(Number(OrderId));

    const req = forwardRequest(
        wallet.address,
        _ca.order,
        nonce.toString(),
        data
    );
    const sign = await _txForwarder.signMetaTx(req, wallet);

    return {
        "function selector":
            data.slice(0, 10) + ` (${lodisSelector[data.slice(0, 10)]})`,
        orderId: OrderId,
        req: req,
        signature: sign,
    };
}


export const Sign2770ExpiredOrder = async (_context: context, wallet: Wallet, OrderId: string | number) => {
    const provider = initializeProvider(_context);
    const _ca = initializeCA(_context);
    const _provider = new ethers.providers.JsonRpcProvider(provider.L2);
    const _order = new Order(_ca.order, _provider);
    const _txForwarder = new TxForwarder(_ca.forwarder, _provider);

    const nonce = await _txForwarder.getNonce(wallet.address);
    const data = await _order.expiredOrder(Number(OrderId));

    const req = forwardRequest(
        wallet.address,
        _ca.order,
        nonce.toString(),
        data
    );
    const sign = await _txForwarder.signMetaTx(req, wallet);

    return {
        "function selector":
            data.slice(0, 10) + ` (${lodisSelector[data.slice(0, 10)]})`,
        orderId: OrderId,
        req: req,
        signature: sign,
    };
}


