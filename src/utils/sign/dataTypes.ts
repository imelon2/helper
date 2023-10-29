export const EIP712_types = () => {
    return {
        EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
        ]
    }
}

export const EIP712_domain = (
    name: string,
    version: string,
    chainId: number,
    address: string
  ) => {
    return {
      name: name,
      version: version,
      chainId: chainId,
      verifyingContract: address,
    };
  };

  export const forwardRequest_types = () => {
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

export const forwardRequest_domain = (chainId: number, address: string) => {
    return {
      name: "MinimalForwarder",
      version: "0.0.1",
      chainId: chainId,
      verifyingContract: address,
    };
  };