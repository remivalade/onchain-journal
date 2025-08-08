# On-Chain Journal

This project is a simple web application that allows users to mint their thoughts and moods as NFTs on the BOB (Build on Bitcoin) L2 network.

This is a monorepo containing the smart contract and the frontend application.

- `OnChainJournal.sol`: The Solidity smart contract for the ERC721 token.
- `web`: The Next.js frontend application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   [pnpm](https://pnpm.io/installation)
*   A web browser with a wallet extension, such as [MetaMask](https://metamask.io/).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/bob-collective/onchain-journal.git
    cd onchain-journal
    ```

2.  **Install dependencies:**
    This command will install dependencies for all the packages in the monorepo.
    ```bash
    pnpm install
    ```

3.  **Run the development server:**
    This command will start the Next.js development server.
    ```bash
    pnpm --filter web dev
    ```

4.  **Open the application:**
    Open your web browser and navigate to `http://localhost:3000`.

## Wallet Setup

To interact with the application, you need to connect your wallet and switch to the BOB Mainnet.

### Add BOB Mainnet to MetaMask

If you don't have the BOB network configured in your MetaMask wallet, you can add it using the following details:

*   **Network Name:** BOB Mainnet
*   **RPC URL:** `https://rpc.gobob.xyz`
*   **Chain ID:** 60808
*   **Currency Symbol:** ETH
*   **Block Explorer URL:** `https://explorer.gobob.xyz`

Once the network is added, switch to it, and you should be able to connect your wallet and mint your journal entries.
