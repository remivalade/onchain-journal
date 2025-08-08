# On-Chain Journal

This project is a simple web application that allows users to mint their thoughts and moods as NFTs on the BOB (Build on Bitcoin) L2 network.

The frontend is built with Next.js and uses `wagmi` for wallet interactions. The smart contract `OnChainJournal.sol` is an ERC721 token that generates an SVG for each minted NFT.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your macOS system:

*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)
*   A web browser with a wallet extension, such as [MetaMask](https://metamask.io/).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/bob-collective/onchain-journal.git
    cd onchain-journal
    ```

2.  **Navigate to the web directory:**
    The frontend application is located in the `web` directory.
    ```bash
    cd web
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the application:**
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
