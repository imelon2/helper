import { useEffect, useState } from "react";
import "./ContextHeader.css";
import Loading from "components/Loading/Loading";
import { Order } from "utils/lodis/libs/Order";

type IProps = {
  contextTitle: string;
  providerURL: {
    L1: string;
    L2: string;
  };
  F_Order:Order;
};

const ContextHeader = ({contextTitle, providerURL,F_Order }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [latestOrderId,setLatestOrderId] = useState<string>("-")

  useEffect(() => {
    onClickRefersh()
  },[])
  
  const onClickRefersh = async() => {
    try {
      setIsLoading(true)
      let _latestOrderId = await F_Order.getOrderId()
      _latestOrderId --;
      setLatestOrderId(_latestOrderId.toString())
    } catch (error) {
      
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div>
      <div className="titleText">📝 Lodis 환경 정보 : {contextTitle}</div>
      <div className="provider">Provider</div>
      <li className="L1">L1 : {providerURL.L1}</li>
      <li className="L2">L2 : {providerURL.L2}</li>
        <div className="latestOrderId-button-wrapper">
          <div className="titleText latestOrderId">Latest Order Id 
          <span className="latestOrderId-Text">{latestOrderId}</span>
          <span className="message">가장 마지막에 생성된 Order Id</span>
          </div>
          <button className="latestOrderId-button" onClick={onClickRefersh}> {isLoading ? <Loading /> : "새로고침"}</button>
        </div>
    </div>
  );
};

export default ContextHeader;
