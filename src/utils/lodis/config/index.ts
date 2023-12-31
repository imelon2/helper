import JSONDevlopmentLodisCA from "./lodisCA/lodis-ca-development.json";
import JSONTestLodisCA from "./lodisCA/lodis-ca-test.json";
import JSONStagingLodisCA from "./lodisCA/lodis-ca-staging.json";
import JSONReleaseLodisCA from "./lodisCA/lodis-ca-release.json";
import JSONBetaLodisCA from "./lodisCA/lodis-ca-beta.json";


export type context = "dev" | "test" | "stag" | "release" | "beta";

type contract = {
  forwarder: string;
  orderRules: string;
  order: string;
  L1DKAToken: string;
  L2DKAToken: string;
  fxRootTunnel: string;
  fxChildTunnel: string;
  sbtMinter: string;
  treasury: string;
  defaultSBT: string;
  shipperSBT: string;
  carrierSBT: string;
};

// type Ioptions = {
//   [key: string]: WalletOptions;
// };
// const options: Ioptions = {
//   dev: {
//     L1: {
//       operatorType: "Development",
//       chainType: "PRIVATE",
//       timeout: 5000,
//       url: ["https://lodis-dev-geth.dknote.net/"],
//       web3Provider: {
//         name: NETWORK_NAME.ETH_GOERLI, // "goerli"
//         chainId: 4693,
//       },
//     },
//     L2: {
//       operatorType: "Development",
//       chainType: "PRIVATE",
//       timeout: 5000,
//       url: ["https://lodis-dev-polygon.dknote.net/"],
//       web3Provider: {
//         name: NETWORK_NAME.POLY_MUMBAI, // "matic-mumbai"
//         chainId: 15005,
//       },
//     },
//   },
//   beta: {
//     L1: {
//       operatorType: "Beta",
//       chainType: "MAIN",
//       url: [
//         "https://ethereum-mainnet-rpc.allthatnode.com/mgMzRYm4Y33DRV3itfp21os56xny9fjU",
//         "https://eth-mainnet.g.alchemy.com/v2/LTGBwhGvw3u0gdwSQ4ZGHPY_hnTa4dVI",
//         "https://wandering-convincing-moon.quiknode.pro/02e91bc67459e8dbfec3e849ecd790721c014ec4",
//       ],
//       timeout: 5000,
//       web3Provider: {
//         name: NETWORK_NAME.ETH_MAINNET, // "mainnet"
//         chainId: NETWORK_CHAIN_ID.ETH_MAINNET, // 1
//       },
//     },
//     L2: {
//       operatorType: "Beta",
//       chainType: "MAIN",
//       url: [
//         "https://polygon-mainnet-rpc.allthatnode.com:8545/mgMzRYm4Y33DRV3itfp21os56xny9fjU",
//         "https://polygon-mainnet.g.alchemy.com/v2/e-q38pX0CVSX8cL92lxKy-M62lPjIbzs",
//         "https://white-muddy-moon.matic.quiknode.pro/a2aa896f9916448cee6ffe80620117b2be857906",
//       ],
//       timeout: 5000,
//       web3Provider: {
//         name: NETWORK_NAME.POLY_MAINNET, // "matic"
//         chainId: NETWORK_CHAIN_ID.POLY_MAINNET, // 137
//       },
//     },
//   },
//   test: {
//     L1: {
//       operatorType: "Test",
//       chainType: "MAIN",
//       url: [
//         "https://ethereum-goerli-rpc.allthatnode.com/mgMzRYm4Y33DRV3itfp21os56xny9fjU",
//         "https://eth-goerli.g.alchemy.com/v2/f5z6qLCEElGTcFaCKZVwk_L_JC83Wwr3",
//         "https://proportionate-rough-layer.ethereum-goerli.quiknode.pro/c3f686566831be19a11764f66d5349f67d9b7314",
//       ],
//       timeout: 5000,
//       web3Provider: {
//         name: NETWORK_NAME.ETH_GOERLI, // "goerli"
//         chainId: NETWORK_CHAIN_ID.ETH_GOERLI, // 5
//       },
//     },
//     L2: {
//       operatorType: "Test",
//       chainType: "MAIN",
//       url: [
//         "https://polygon-testnet-rpc.allthatnode.com:8545/mgMzRYm4Y33DRV3itfp21os56xny9fjU",
//         "https://polygon-mumbai.g.alchemy.com/v2/8LB2uMnu87tTyUGsbL2XF9q62DagXXlY",
//         "https://practical-burned-aura.matic-testnet.quiknode.pro/9104e50a95c096529c611cbbe3c644a1846adca9",
//       ],
//       timeout: 5000,
//       web3Provider: {
//         name: NETWORK_NAME.POLY_MUMBAI, // "matic-mumbai"
//         chainId: NETWORK_CHAIN_ID.POLY_MUMBAI, // 80001
//       },
//     },
//   },
//   stag: {
//     L1: {
//       operatorType: "Staging",
//       chainType: "MAIN",
//       url: [
//         "https://ethereum-goerli-rpc.allthatnode.com/mgMzRYm4Y33DRV3itfp21os56xny9fjU",
//         "https://eth-goerli.g.alchemy.com/v2/f5z6qLCEElGTcFaCKZVwk_L_JC83Wwr3",
//         "https://proportionate-rough-layer.ethereum-goerli.quiknode.pro/c3f686566831be19a11764f66d5349f67d9b7314",
//       ],
//       timeout: 5000,
//       web3Provider: {
//         name: NETWORK_NAME.ETH_GOERLI, // "goerli"
//         chainId: NETWORK_CHAIN_ID.ETH_GOERLI, // 5
//       },
//     },
//     L2: {
//       operatorType: "Staging",
//       chainType: "MAIN",
//       url: [
//         "https://polygon-testnet-rpc.allthatnode.com:8545/mgMzRYm4Y33DRV3itfp21os56xny9fjU",
//         "https://polygon-mumbai.g.alchemy.com/v2/8LB2uMnu87tTyUGsbL2XF9q62DagXXlY",
//         "https://practical-burned-aura.matic-testnet.quiknode.pro/9104e50a95c096529c611cbbe3c644a1846adca9",
//       ],
//       timeout: 5000,
//       web3Provider: {
//         name: NETWORK_NAME.POLY_MUMBAI, // "matic-mumbai"
//         chainId: NETWORK_CHAIN_ID.POLY_MUMBAI, // 80001
//       },
//     },
//   },
// };

// export function initOptions(context: context): WalletOptions {
//   switch (context) {
//     case "dev":
//       return options["dev"];

//     case "beta":
//       return options["beta"];

//     case "test":
//       return options["test"];

//     case "stag":
//       return options["stag"];

//     // case "release":
//     //     return null;

//     default:
//       throw new Error("non-exist context");
//   }
// }

export function initializeCA(context: context): contract {
  switch (context) {
    case "dev":
      return JSONDevlopmentLodisCA;

    case "beta":
      return JSONBetaLodisCA;

    case "test":
      return JSONTestLodisCA;

    case "stag":
      return JSONStagingLodisCA;

    case "release":
      return JSONReleaseLodisCA;

    default:
      throw new Error("non-exist context");
  }
}

export function initializeProvider(context: context) {
  switch (context) {
    case "dev":
      return {
        L1: "https://lodis-dev-geth.dknote.net",
        L2: "https://lodis-dev-polygon.dknote.net",
      };

    case "beta":
      return {
        L1: "https://ethereum-mainnet-rpc.allthatnode.com/uuPryfzIVwN7gRDw9v5Zzw6jdDHPw11p",
        L2: "https://polygon-mainnet-rpc.allthatnode.com:8545/uuPryfzIVwN7gRDw9v5Zzw6jdDHPw11p",
      };

    case "test":
      return {
        L1: "https://ethereum-goerli-rpc.allthatnode.com/uuPryfzIVwN7gRDw9v5Zzw6jdDHPw11p",
        L2: "https://polygon-testnet-rpc.allthatnode.com:8545/uuPryfzIVwN7gRDw9v5Zzw6jdDHPw11p",
      };

    case "stag":
      return {
        L1: "https://ethereum-goerli-rpc.allthatnode.com/uuPryfzIVwN7gRDw9v5Zzw6jdDHPw11p",
        L2: "https://polygon-testnet-rpc.allthatnode.com:8545/uuPryfzIVwN7gRDw9v5Zzw6jdDHPw11p"
      };

    case "release":
      return {
        L1: "",
        L2: "",
      };

    default:
      throw new Error("non-exist context");
  }
}
type ILodisSelector = {
    [key:string]:string;
}
export const lodisSelector : ILodisSelector = {
  "0x1a8c6c4b": "cancelOrderBeforeMatch",
  "0x52d67c05": "cancelOrderBeforePickUp",
  "0xcfd6adaa": "completeOrderWithOutSig",
  "0x8c4f2140": "completeOrder",
  "0x956896b0": "createOrder",
  "0xb6841c1b": "delayPickUp",
  "0x3644e515": "DOMAIN_SEPARATOR",
  "0x84b0196e": "eip712Domain",
  "0xc67345d7": "expiredOrder",
  "0x73856615": "getNonce",
  "0xd09ef241": "getOrder",
  "0xa8496426": "getOrderId",
  "0x617fba04": "getRecord",
  "0x5084b79e": "hashStruct",
  "0x572b6c05": "isTrustedForwarder",
  "0x28fad555": "pickOrder",
  "0x13c0d2e1": "pickOrderWithOutSig",
  "0x43b422cf": "selectOrder",
};
