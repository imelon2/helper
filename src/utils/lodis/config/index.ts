import JSONDevlopmentLodisCA from "./lodisCA/lodis-ca-development.json";
import JSONTestLodisCA from "./lodisCA/lodis-ca-test.json";
import JSONStagingLodisCA from "./lodisCA/lodis-ca-staging.json";
import JSONReleaseLodisCA from "./lodisCA/lodis-ca-release.json";
import JSONBetaLodisCA from "./lodisCA/lodis-ca-beta.json";

export type context = "dev" | "test" | "stag" | "release" | "beta"

type contract = {
    "forwarder": string;
    "orderRules": string;
    "order": string;
    "L1DKAToken": string;
    "L2DKAToken": string;
    "fxRootTunnel": string;
    "fxChildTunnel": string;
    "sbtMinter": string;
    "treasury": string;
    "defaultSBT": string;
    "shipperSBT": string;
    "carrierSBT": string;
}

export function initializeCA(context : context) : contract {
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
            throw new Error("non-exist context")
    }
}

export function initializeProvider(context : context) {
    switch (context) {
        case "dev":
            return {
                L1:"https://lodis-dev-geth.dknote.net",
                L2:"https://lodis-dev-polygon.dknote.net",
            };

        case "beta":
            return {
                L1:"https://eth-mainnet.g.alchemy.com/v2/LTGBwhGvw3u0gdwSQ4ZGHPY_hnTa4dVI",
                L2:"https://polygon-mainnet.g.alchemy.com/v2/e-q38pX0CVSX8cL92lxKy-M62lPjIbzs",
            }

        case "test":
            return {
                L1:"https://eth-goerli.g.alchemy.com/v2/f5z6qLCEElGTcFaCKZVwk_L_JC83Wwr3",
                L2:"https://polygon-mumbai.g.alchemy.com/v2/8LB2uMnu87tTyUGsbL2XF9q62DagXXlY",
            }

        case "stag":
            return {
                L1:"https://eth-goerli.g.alchemy.com/v2/f5z6qLCEElGTcFaCKZVwk_L_JC83Wwr3",
                L2:"https://polygon-mumbai.g.alchemy.com/v2/8LB2uMnu87tTyUGsbL2XF9q62DagXXlY",
            }

        case "release":
            return {
                L1:"",
                L2:"",
            }
    
        default:
            throw new Error("non-exist context")
    }
}