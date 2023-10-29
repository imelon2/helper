import "./ContextHeader.css";

type IProps = {
  contextTitle: string;
  Provider: {
    L1: string;
    L2: string;
  };
};
const ContextHeader = ({ contextTitle, Provider }: IProps) => {
  return (
    <div>
      <div className="titleText">📝 Lodis 환경 정보 : {contextTitle}</div>
      <div className="Provider">Provider</div>
      <li className="L1">L1 : {Provider.L1}</li>
      <li className="L2">L2 : {Provider.L2}</li>
    </div>
  );
};

export default ContextHeader;
