import { useParams } from "react-router-dom"
import React, { useCallback, useEffect, useState } from 'react'
import '../../styles/GlobalStyle.css'
import "./OrderHandlePage.css"
import { initializeProvider, context, initializeCA } from "../../utils/lodis/config"
import Loading from "../../components/Loading/Loading"
import { checkContextType, checkPrivateKeyLength } from "../../utils/check"
import { Order } from "../../utils/lodis/libs/Order"
import { Wallet, ethers } from "ethers"
import JSONPretty from 'react-json-pretty';
import { _praseOrderdata } from "../../utils/prase"

function OrderHandlePage() {
    const { context } = useParams()
    const [contextTitle, setContextTitle] = useState('')
    const [OrderId, setOrderId] = useState('')
    const [UserPrivateKey, setUserPrivateKey] = useState('')
    const [UserAddress, setUserAddress] = useState('-')
    const [UserWallet, setUserWallet] = useState<Wallet>()
    const [AdminPrivateKey, setAdminPrivateKey] = useState('')
    const [AdminAddress, setAdminAddress] = useState('-')
    const [AdminWallet, setAdminWallet] = useState<Wallet>()
    const [Provider, setProvider] = useState({ L1: "", L2: "" })
    const [isLoading, setIsLoading] = useState({orderId:false,sendTx:false})
    const [order, setOrder] = useState<Order>()
    const [showJSON,setShowJSON] = useState<any>()

    useEffect(() => {
        const _context = checkContextType(context!) ?  context as context : 'dev';
        const provider = initializeProvider(_context)
        const ca = initializeCA(_context)
        const _provider = new ethers.providers.JsonRpcProvider(provider.L2);
        const _order = new Order(ca.order,_provider)
        setProvider(provider)
        setContextTitle(_context)
        setOrder(_order)
    }, [])

    const onClickOrderIdSearch = useCallback(async() => {
        try {
            setIsLoading((prev) => {
                return {...prev,orderId:true}
            })
            if(!OrderId) return;
            if(!order) return;
            const OrderData = await order.getOrder(OrderId)
            setShowJSON(_praseOrderdata(OrderData))
        } catch (error) {
            
        } finally {
            setIsLoading((prev) => {
                return {...prev,orderId:false}
            })
        }
    },[OrderId,isLoading])

    const onChangeOrderId = useCallback((data:any) => {
        const _id = data.target.value.toString()
        if(_id > 999999) return;
        setOrderId(_id)
    },[OrderId])

    const onChangeUserPrivateKey = useCallback((data:any) => {
        const _key = data.target.value.toString()
        setUserPrivateKey(data.target.value.toString())
        if(!checkPrivateKeyLength(_key)) {
            setUserAddress("-")
            return;
        };
        const _wallet = new ethers.Wallet(_key)
        setUserWallet(_wallet)
        const _address = _wallet.address
        setUserAddress(_address.slice(0,8)+"..."+_address.slice(_address.length - 6))
    },[UserPrivateKey,UserAddress,UserWallet])

    const onChangeAdminPrivateKey = useCallback((data:any) => {
        const _key = data.target.value.toString()
        setAdminPrivateKey(data.target.value.toString())
        if(!checkPrivateKeyLength(_key)) {
            setAdminAddress("-")
            return;
        };
        const _wallet = new ethers.Wallet(_key)
        setAdminWallet(_wallet)
        const _address = _wallet.address
        setAdminAddress(_address.slice(0,8)+"..."+_address.slice(_address.length - 6))
    },[AdminPrivateKey,AdminAddress,AdminWallet])

    const onClickSendTransaction = () => {
        try {
            setIsLoading((prev) => {
                return {...prev,sendTx:true}
            })
            
        } catch (error) {
            
        } finally {
            setIsLoading((prev) => {
                return {...prev,sendTx:false}
            })
        }
    }

    return (
        <div className='order'>
            <div className='warpper'>
                <div className="titleText">📝 Lodis 환경 정보 : {contextTitle}</div>
                <div className='Provider'>Provider</div>
                <li className='L1'>
                    L1 : {Provider.L1}
                </li>
                <li className='L2'>
                    L2 : {Provider.L2}
                </li>
            </div>
            <div className="warpper">
                <div className='orderTitle'><div className="icon">📌</div>주문 완료</div>
                <div className='functionName'>(completeOrderWithOutSig)</div>
                <div style={{display:"inline-flex"}}>
                    <div className="inputWrapper">
                        <div className='text12 OrderId'>Order Id</div>
                        <input style={{ width: 60 }} value={OrderId} onChange={onChangeOrderId} />
                        <button className="OrderId button" onClick={onClickOrderIdSearch}>
                            {isLoading.orderId ? <Loading /> : "검색"}
                        </button>
                    </div>
                    <div className="inputWrapper">
                        <div className='text12 UserPrivateKey'>User Private Key</div>
                        <input placeholder="0x" value={UserPrivateKey} onChange={onChangeUserPrivateKey} />
                        <div className="address text10">{UserAddress}</div>
                    </div>
                    <div className="inputWrapper">
                        <div className='text12 AdminPrivateKey'>Admin Private Key</div>
                        <input placeholder="0x" value={AdminPrivateKey} onChange={onChangeAdminPrivateKey} />
                        <button className="sendTx button" onClick={onClickSendTransaction}>
                            {isLoading.sendTx ? <Loading /> : "Send Transaction"}
                        </button>
                        <div className="address text10">{AdminAddress}</div>
                    </div>
                </div>
                <div className="OrderId jsonForm">
                    <JSONPretty json={showJSON} className="jsonForm"/>
                </div>
            </div>
        </div>
    )
}



export default OrderHandlePage
