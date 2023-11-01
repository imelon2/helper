import "./SignaturePage.css";
import "../../styles/GlobalStyle.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { checkContextType } from "../../utils/check";
import {
  initializeProvider,
  context,
  initializeCA,
} from "../../utils/lodis/config";
import ContextHeader from "../../components/ContextHeader/ContextHeader";
import { Order } from "../../utils/lodis/libs/Order";
import { TxForwarder } from "../../utils/lodis/libs/TxForwarder";
import { SignDelayPickUp } from "./SignDelayPickUp";
import { SignExpiredOrder } from "./SignExpiredOrder";
import { GetLatestOrderId } from "modules/OrderModules";

function SignaturePage() {
  const { context } = useParams();
  const [contextTitle, setContextTitle] = useState<context>("dev");
  const [providerURL, setProviderURL] = useState({ L1: "", L2: "" })
  const [F_Order, setF_Order] = useState<Order>();
  const [F_TxForwarder, setF_TxForwarder] = useState<TxForwarder>();
  const [ca,setCA] = useState<any>()

  useEffect(() => {
    const _context = checkContextType(context!) ? (context as context) : "dev";
    const provider = initializeProvider(_context);
    const _ca = initializeCA(_context);
    const _provider = new ethers.providers.JsonRpcProvider(provider.L2);
    const _order = new Order(_ca.order, _provider);
    const _txForwarder = new TxForwarder(_ca.forwarder, _provider);

    setCA(_ca)
    setProviderURL(provider);
    setContextTitle(_context);
    setF_Order(_order);
    setF_TxForwarder(_txForwarder);
  }, []);


  return (
    <div className="container">
      <h1>⚙️ Signature Function</h1>
      <ContextHeader F_Order={F_Order!} contextTitle={contextTitle} providerURL={providerURL} />
      <SignDelayPickUp contextTitle={contextTitle} ca={ca} F_Order={F_Order!} F_TxForwarder={F_TxForwarder!}/>
      <SignExpiredOrder contextTitle={contextTitle} ca={ca} F_Order={F_Order!} F_TxForwarder={F_TxForwarder!}/>
    </div>
  );
}

export default SignaturePage;
