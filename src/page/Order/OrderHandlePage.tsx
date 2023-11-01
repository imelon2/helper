import { useParams } from "react-router-dom"
import React, { useCallback, useEffect, useState } from 'react'
import "./OrderHandlePage.css"
import ContextHeader from "../../components/ContextHeader/ContextHeader"
import { initializeProvider, context, initializeCA } from "../../utils/lodis/config"
import Loading from "../../components/Loading/Loading"
import { checkContextType, checkPrivateKeyLength } from "../../utils/check"
import { Wallet, ethers } from "ethers"
import JSONPretty from 'react-json-pretty';
import { GetLatestOrderByEvent, SearchOrderById } from "../../modules/OrderModules"
import { Order } from "../../utils/lodis/libs/Order"
import { AiOutlineHistory } from "react-icons/ai";
import { IOrderEventData } from "utils/prase"
import { convertDate } from "utils/time"

type IMoniterState = "Object" | "UI"
function OrderHandlePage() {
    /**------------------ Context Param /**------------------*/
    const { context } = useParams()
    const [contextTitle, setContextTitle] = useState<context>()
    const [providerURL, setProviderURL] = useState({ L1: "", L2: "" })
    const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider>()
    /**------------------ Data Param /**------------------*/
    const [order, setOrder] = useState<Order>()
    const [latestBlock, setLatestBlock] = useState<number>()
    const [OrderId, setOrderId] = useState('')
    const [searchFromBlockNumber, setSearchFromBlockNumber] = useState<string>("")
    const [searchToBlockNumber, setSearchToBlockNumber] = useState<string>("43200")
    /**------------------ View Param /**------------------*/
    const [showJSON, setShowJSON] = useState<any>()
    const [showOrderList, setShowOrderList] = useState<IOrderEventData[]>([])
    /**------------------ Switch Param /**------------------*/
    const [isLoading, setIsLoading] = useState({ orderId: false, latestBlock: false, latestOrder: false })
    const [moniterState, setMoniterState] = useState<IMoniterState>("Object")

    useEffect(() => {
        const _context = checkContextType(context!) ? context as context : 'dev';
        const providerURL = initializeProvider(_context)
        const ca = initializeCA(_context)
        const _provider = new ethers.providers.JsonRpcProvider(providerURL.L2);
        const _order = new Order(ca.order, _provider)
        setProvider(_provider)
        setProviderURL(providerURL)
        setContextTitle(_context)
        setOrder(_order)

        const getLatestBlock = async () => {
            const _latestBlock = await _provider.getBlockNumber()
            setLatestBlock(_latestBlock)
            setSearchFromBlockNumber(_latestBlock.toString())
        }
        getLatestBlock()
    }, [])


    const onChangeOrderId = useCallback((data: any) => {
        const _id = data.target.value.toString()
        if (_id > 999999) return;
        setOrderId(_id)
    }, [OrderId])

    const onChangeSearchToBlockNumber = useCallback((data: any) => {
        const _id = data.target.value.toString()
        if (_id > 43200) {
            setSearchToBlockNumber("43200")
            return;
        }
        setSearchToBlockNumber(_id)
    }, [searchToBlockNumber])

    const onChangeSearchFromBlockNumber = useCallback((data: any) => {
        const _id = data.target.value.toString()
        if (_id < 43200) {
            return;
        }
        setSearchFromBlockNumber(_id)
    }, [searchFromBlockNumber])

    const onClickOrderIdSearch = useCallback(async () => {
        try {
            setIsLoading((prev) => {
                return { ...prev, orderId: true }
            })
            if (!OrderId) return;
            if (!order) return;
            const data = await SearchOrderById(Number(OrderId), order);
            setShowJSON(data)
        } catch (error) {

        } finally {
            setMoniterState("Object")
            setIsLoading((prev) => {
                return { ...prev, orderId: false }
            })
        }
    }, [OrderId, isLoading])

    const onClickRefreshLatestBlock = useCallback(async () => {
        try {
            setIsLoading((prev) => {
                return { ...prev, latestBlock: true }
            })
            const _latestBlock = await provider?.getBlockNumber()
            setLatestBlock(_latestBlock)
            setSearchFromBlockNumber(_latestBlock!.toString())
        } catch (error) {
            console.error("onClickRefreshLatestBlock : " + error)
        } finally {
            setIsLoading((prev) => {
                return { ...prev, latestBlock: false }
            })
        }
    }, [latestBlock, provider])


    const onClickSearchOrderDataList = async () => {
        try {
            setIsLoading((prev) => {
                return { ...prev, latestOrder: true }
            })
            const data = await GetLatestOrderByEvent(contextTitle!, searchFromBlockNumber!, searchToBlockNumber!)
            setShowOrderList(data)

        } catch (error) {
            console.error("onClickSearchOrderDataList : " + error)
        } finally {
            setMoniterState("UI")
            setIsLoading((prev) => {
                return { ...prev, latestOrder: false }
            })
        }
    }

    const onClickTxHash = async (tx: string) => {
        try {
            const txRes = await provider?.getTransaction(tx)
            setShowJSON(txRes)
            console.log(txRes);
        } catch (error) {
            console.error("onClickTxHash : " + error)
        } finally {
            setMoniterState("Object")
        }
    }
    return (
        <div className='container'>
            <ContextHeader F_Order={order!} contextTitle={contextTitle!} providerURL={providerURL} />
            <div className="wrapper">
                <div className='orderTitle'><div className="icon">📌</div>Lodis Contract Seacher</div>
                <div>
                    <div className="inputWrapper">
                        <div className='componentTitle OrderId'>🔎 Search Order Data</div>
                        <input style={{ width: 80 }} value={OrderId} onChange={onChangeOrderId} placeholder="order id" />
                        <button className="OrderId button" onClick={onClickOrderIdSearch}>
                            {isLoading.orderId ? <Loading /> : "검색"}
                        </button>
                    </div>
                    <div className="inputWrapper">
                        <div className='componentTitle'>
                            <span>🔎 Search Lastest Order List</span>
                        </div>
                        <div className="latest-block-wrapper">
                            <div className="block-range" >
                                <span>{"Block Number "}</span>
                                <input onChange={onChangeSearchFromBlockNumber} value={searchFromBlockNumber} style={{ width: 90 }} />
                                <span>{"부터 "}</span>
                            </div>
                            <input onChange={onChangeSearchToBlockNumber} value={searchToBlockNumber} style={{ width: 70 }} />
                            <span> 개 Block                                 <span className="text12 gray">  (MAX 43200)</span></span>
                            <button className="OrderId button" onClick={onClickSearchOrderDataList}>
                                {isLoading.latestOrder ? <Loading /> : "검색"}
                            </button>
                            <span className="text12 latest-block">Latest Block : {latestBlock}</span>
                            <button onClick={onClickRefreshLatestBlock} className="latest-block-button"> {isLoading.latestBlock ? <Loading /> : <AiOutlineHistory className="refrash-button" />}</button>
                        </div>
                    </div>
                </div>
                <div className="OrderId jsonForm">
                    {moniterState === "Object" && showOrderList.length !== 0 ? <button onClick={(() => {
                        setMoniterState("UI")
                    })}>뒤로 가기</button> : <></>}
                    {moniterState === 'Object' ? <JSONPretty json={showJSON} className="jsonForm" /> : <></>}
                    {moniterState === 'UI' ? <>
                        <div className="order-list-header">
                            <div className="order-list-ul action">Action</div>
                            <div className="order-list-ul orderId">Order ID</div>
                            <div className="order-list-ul blockNumber">Block Number</div>
                            <div className="order-list-ul timeStamp">TimeStamp</div>
                            <div className="order-list-ul txHash">TX Hash</div>
                        </div>
                        {showOrderList?.map((data, i) => {
                            return (
                                <div className="order-list-header data" key={i}>
                                    <div className="order-list-ul data action">{data.action}</div>
                                    <div className="order-list-ul data orderId">{data.orderId}</div>
                                    <div className="order-list-ul data blockNumber">{data.blockNumber}</div>
                                    <div className="order-list-ul data timeStamp">{convertDate(data.timestamp)}</div>
                                    <div onClick={() => onClickTxHash(data.txHash)} className="order-list-ul data txHash">{data.txHash}</div>
                                </div>
                            )
                        })}</> : <></>}
                </div>
            </div>
        </div>
    )
}



export default OrderHandlePage
