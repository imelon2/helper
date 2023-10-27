export const checkContextType = (context : string) => {
    return context === 'beta' || context === 'dev' || context === 'stag' || context === 'release' || context === 'test'
}

export const checkPrivateKeyLength = (address:string) => {
    if(address.slice(0,2) === "0x") {
        return address.length === 66
    } else {
        return address.length === 64
    }
}