import { useParams } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import "../styles/OrderHandle.css"
import { initializeProvider, context } from "../utils/lodis/config"

function OrderHandle() {
    const { context } = useParams()
    const [OrderId,setOrderId] = useState('')
    const [UserPrivateKey,setUserPrivateKey] = useState('')
    const [AdminPrivateKey,setAdminPrivateKey] = useState('')
    const [Provider,setProvider] = useState({L1:"", L2:""})
    
    useEffect(() => {
        const provider = initializeProvider(context as context)
        setProvider(provider)
    },[])
    return (
        <div className='order'>
            <span className='LodisTEST'>
                Lodis 환경 정보 : {context}
            </span>
            <span className='orderTitle'>
                주문 완료
            </span>
            <span className='completeOrderWithOutSig'>
                (completeOrderWithOutSig)
            </span>
            <span className='Provider'>
                Provider
            </span>
            <span className='L1httpsgoerliinfuraiov3d269e2226158443ea6b9b4a06afe77f2'>
                L1 : {Provider.L1}
            </span>
            <span className='L2httpsgoerliinfuraiov3d269e2226158443ea6b9b4a06afe77f2'>
                L2 : {Provider.L2}
            </span>
            <span className='UserPrivateKey'>
                User Private Key
                <input placeholder="0x" value={UserPrivateKey} onChange={(data) => setUserPrivateKey(data.target.value.toString())}/>
            </span>
            <span className='OrderId'>
                Order Id
                <input style={{width:60}} value={OrderId} onChange={(data) => setOrderId(data.target.value.toString())}/>
            </span>
            <span className='AdminPrivateKey'>
                Admin Private Key
                <input placeholder="0x" value={AdminPrivateKey} onChange={(data) => setAdminPrivateKey(data.target.value.toString())}/>
            </span>
        </div>
    )
}



export default OrderHandle
