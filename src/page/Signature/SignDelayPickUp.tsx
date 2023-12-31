import { Wallet, ethers } from "ethers";
import { useCallback, useState } from "react";
import JSONPretty from "react-json-pretty";
import Loading from "../../components/Loading/Loading";
import { SearchOrderById, Sign2770DelayPickUp } from "../../modules/OrderModules";
import { TxForwarder } from "utils/lodis/libs/TxForwarder";
import { Order } from "utils/lodis/libs/Order";
import { context } from "utils/lodis/config";
import { checkPrivateKeyLength } from "utils";


type IProps = {
  contextTitle:context;
  F_TxForwarder: TxForwarder;
  F_Order: Order;
  ca:any
};
export const SignDelayPickUp = ({ contextTitle, ca, F_TxForwarder, F_Order }: IProps) => {
  const [isLoading, setIsLoading] = useState({
    orderId: false,
    delayPickUpSign: false,
  });
  /**------------------ Data Param /**------------------*/
  const [OrderId, setOrderId] = useState("");
  const [jsonObject, setJsonObject] = useState<any>();
  /**------------------ User Data /**------------------*/
  const [UserPrivateKey, setUserPrivateKey] = useState("");
  const [UserAddress, setUserAddress] = useState("-");
  const [UserWallet, setUserWallet] = useState<Wallet>();

  const onClickOrderIdSearch = useCallback(async () => {
    try {
      setIsLoading((prev) => {
        return { ...prev, orderId: true };
      });
      if (!OrderId) return;
      if (!F_Order) return;
      const json = await SearchOrderById(Number(OrderId), F_Order);
      setJsonObject(json);
    } catch (error) {
      console.error("Error Up from onClickOrderIdSearch()");
      console.error(error);
    } finally {
      setIsLoading((prev) => {
        return { ...prev, orderId: false };
      });
    }
  }, [OrderId, isLoading]);

  const onClickSign = async () => {
    try {
      setIsLoading((prev) => {
        return { ...prev, delayPickUpSign: true };
      });
      if (!UserWallet) return;
      const json = await Sign2770DelayPickUp(contextTitle,UserWallet,OrderId)
      setJsonObject(json);
    } catch (error) {
      alert("ERROR onClick delayPickUpSign : " + error);
    } finally {
      setIsLoading((prev) => {
        return { ...prev, delayPickUpSign: false };
      });
    }
  };

  const onChangeOrderId = useCallback(
    (data: any) => {
      const _id = data.target.value.toString();
      if (_id > 999999) return;
      setOrderId(_id);
    },
    [OrderId]
  );

  const onChangeUserPrivateKey = useCallback(
    (data: any) => {
      const _key = data.target.value.toString();
      setUserPrivateKey(data.target.value.toString());
      if (!checkPrivateKeyLength(_key)) {
        setUserAddress("-");
        return;
      }
      const _wallet = new ethers.Wallet(_key);
      setUserWallet(_wallet);
      const _address = _wallet.address;
      setUserAddress(
        _address.slice(0, 8) + "..." + _address.slice(_address.length - 6)
      );
    },
    [UserPrivateKey, UserAddress, UserWallet]
  );

  return (
    <div className="wrapper">
      <div className="text20">
        <div className="icon">📌</div>픽업 지연
      </div>
      <div className="functionName">(delayPickUp)</div>
      {/* Order Id Search */}
      <div className="inputWrapper">
        <div className="text12 OrderId">Order Id</div>
        <input
          style={{ width: 60 }}
          value={OrderId}
          onChange={onChangeOrderId}
        />
        <button className="OrderId button" onClick={onClickOrderIdSearch}>
          {isLoading.orderId ? <Loading /> : "검색"}
        </button>
      </div>
      {/* User Private Key */}
      <div className="inputWrapper">
        <div className="text12">🔑 User Private Key</div>
        <input
          placeholder="0x"
          value={UserPrivateKey}
          onChange={onChangeUserPrivateKey}
        />
        <button
          onClick={onClickSign}
          disabled={!OrderId || UserAddress === "-"}
          className="delayPickUp button"
        >
          {isLoading.delayPickUpSign ? <Loading /> : "서명"}
        </button>
        <div className="address text10">{UserAddress}</div>
      </div>
      <div className="DelayPickUp monitor">
        <JSONPretty className="jsonForm" json={jsonObject} placeholder="..." />
      </div>
    </div>
  );
};
