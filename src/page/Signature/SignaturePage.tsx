import "./SignaturePage.css";
import "../../styles/GlobalStyle.css";
import { Wallet, ethers } from "ethers";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { checkContextType, checkPrivateKeyLength } from "../../utils/check";
import {
  initializeProvider,
  context,
  initializeCA,
  lodisSelector,
} from "../../utils/lodis/config";
import ContextHeader from "../../components/ContextHeader/ContextHeader";
import { SearchOrderById } from "../../modules/OrderModules";
import Loading from "../../components/Loading/Loading";
import JSONPretty from "react-json-pretty";
import { forwardRequest } from "../../utils/lodis/libs/Signature";
import { Order } from "../../utils/lodis/libs/Order";
import { TxForwarder } from "../../utils/lodis/libs/TxForwarder";
import { SignDelayPickUp } from "./SignDelayPickUp";
import { SignExpiredOrder } from "./SignExpiredOrder";

function SignaturePage() {
  const { context } = useParams();
  const [contextTitle, setContextTitle] = useState("");
  const [Provider, setProvider] = useState({ L1: "", L2: "" });
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
    setProvider(provider);
    setContextTitle(_context);
    setF_Order(_order);
    setF_TxForwarder(_txForwarder);
  }, []);

  return (
    <div className="container">
      <h1>⚙️ Signature Function</h1>
      <ContextHeader contextTitle={contextTitle} Provider={Provider} />
      <SignDelayPickUp ca={ca} F_Order={F_Order!} F_TxForwarder={F_TxForwarder!}/>
      <SignExpiredOrder ca={ca} F_Order={F_Order!} F_TxForwarder={F_TxForwarder!}/>
    </div>
  );
}

export default SignaturePage;
