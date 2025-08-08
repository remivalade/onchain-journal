export const contractAddress = '0x3fCD67DF58Ecc63d301048A602bDaD1b1fb94a4B';

export const contractAbi = [
  {
    "inputs": [
      { "internalType": "string", "name": "_text", "type": "string" },
      { "internalType": "string", "name": "_mood", "type": "string" }
    ],
    "name": "mintEntry",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          { "internalType": "string", "name": "text", "type": "string" },
          { "internalType": "string", "name": "mood", "type": "string" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "address", "name": "owner", "type": "address" }
        ],
        "internalType": "struct OnChainJournal.JournalEntry",
        "name": "entry",
        "type": "tuple"
      }
    ],
    "name": "generateSVG",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "pure",
    "type": "function"
  }
] as const;
