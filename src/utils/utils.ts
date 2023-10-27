import { ethers } from "ethers"

export const getAddressByPrivateKey = (privatekey:string) => {
    return new ethers.Wallet(privatekey).address
}