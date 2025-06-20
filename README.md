# 📝 OnChainJournal

**OnChainJournal** is an Ethereum smart contract that allows users to write immutable, timestamped journal entries directly on the blockchain. Each entry is recorded as an event, making it verifiable, permanent, and gas-efficient.

## ✨ Features

- **Fully On-Chain Entries**  
  Users can submit journal messages that are logged immutably via blockchain events.

- **Gas-Efficient Design**  
  Entries are emitted as events instead of being stored in state, minimizing gas costs while preserving accessibility.

- **Owner-Managed Metadata**  
  The contract owner can set and update the journal's `name` and `description`.

- **Event-Based Logging**  
  All entries are broadcast using the `NewEntry` event, including:
  - Sender address
  - Timestamp
  - Message content

## 🛠 Functions

### Public Functions

- `write(string memory _message)`  
  Submit a new journal entry. Anyone can call this.

- `name()`  
  Returns the journal name.

- `description()`  
  Returns the journal description.

### Owner-Only Functions

- `setName(string memory _name)`  
  Updates the journal name.

- `setDescription(string memory _description)`  
  Updates the journal description.

- `transferOwnership(address newOwner)`  
  Transfers contract ownership (inherited from `Ownable`).

## 🔍 Events

```solidity
event NewEntry(address indexed from, uint256 indexed timestamp, string message);
```

Use this event to index journal entries off-chain using tools like **The Graph**, **Etherscan**, or your custom UI.

## 📦 Deployment

1. Deploy `OnChainJournal.sol` to any EVM-compatible chain.
2. Initialize the journal by setting the `name` and `description` via the owner.
3. Let users start submitting entries via the `write()` function.

## ⚠️ Notes

- All messages are public and cannot be deleted or modified once submitted.
- Avoid including sensitive or personally identifiable information.
- Ideal for anonymous or pseudonymous public journaling, timestamped records, or writing history on-chain.

## 🧪 Example

```solidity
write("Today I deployed my first smart contract. Feels great!");
```

This will emit:

```
NewEntry(
  from: 0xYourAddress,
  timestamp: 1718918400,
  message: "Today I deployed my first smart contract. Feels great!"
)
```

---

Built with ❤️ for permanence and decentralization.