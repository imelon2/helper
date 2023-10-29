import { JsonRpcProvider, AlchemyProvider as EthersAlchemyProvider, TransactionResponse } from "@ethersproject/providers";
import { Interface } from "ethers/lib/utils";
import { Contract, Signer, Wallet } from "ethers";
import TxForwarderSol from "../contracts/TxForwarder.sol/TxForwarder.json";

export type metaTx = {
  from: string;
  to: string;
  value: string | number;
  gas: string | number;
  nonce: number;
  data: string;
};

const forwardRequest_domain = (chainId: number, address: string) => {
    return {
      name: "MinimalForwarder",
      version: "0.0.1",
      chainId: chainId,
      verifyingContract: address,
    };
  };

const forwardRequest_types = () => {
    return {
      ForwardRequest: [
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
        { name: "gas", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "data", type: "bytes" },
      ],
    };
  };

export class TxForwarder {
  private provider: EthersAlchemyProvider | JsonRpcProvider;
  private abi: Array<any>;
  private contract: Contract;
  private interface: any;
  public CA: string;

  constructor(CA: string, provider: JsonRpcProvider) {
    this.CA = CA;
    this.provider = provider;
    this.abi = TxForwarderSol.abi;
    this.contract = new Contract(this.CA, this.abi, this.provider);
    this.interface = new Interface(this.abi);
  }

  async connect(provider: JsonRpcProvider): Promise<void> {
    this.contract = this.contract.connect(provider);
  }

  async getNonce(address: string): Promise<bigint> {
    return await this.contract.getNonce(address);
  }

  async signMetaTx(req: metaTx, signer: Wallet): Promise<string> {
    const domain = forwardRequest_domain(
      Number(this.provider.network.chainId),
      this.CA
    );
    const types = forwardRequest_types();
    return await signer._signTypedData(domain, types, req);
  }

  async execute(
    req: metaTx,
    signature: string,
    signer: Signer
  ): Promise<TransactionResponse> {
    const txInfo = await this.contract
      .connect(signer)
      .execute(req, signature, { gasLimit: 2000000 });
    return txInfo;
  }
}
