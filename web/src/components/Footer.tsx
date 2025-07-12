export default function Footer() {
  return (
    <footer className="w-full max-w-6xl bg-gray-800 rounded-2xl shadow-2xl p-6 text-sm text-gray-400 text-center space-y-2 mx-auto mt-8">
      <p>
        ⚠️ This project is <em>vibe-coded</em> by{' '}
        <a href="https://x.com/remivalade" target="_blank" className="text-orange-400 hover:underline">
          remivalade
        </a>{' '}
        who openly admits he has no clue about coding 😅.
      </p>
      <p>
        Collection: &nbsp;
        <a
          href="https://element.market/collections/onchain-journal"
          target="_blank"
          className="text-orange-400 hover:underline"
        >
          Buy some journal entries!
        </a>
      </p>
      <p>
        Contract:{' '}
        <a
          href="https://explorer.gobob.xyz/token/0x3fCD67DF58Ecc63d301048A602bDaD1b1fb94a4B?tab=read_write_contract"
          target="_blank"
          className="text-orange-400 hover:underline"
        >
          0x3fCD67…94a4B
        </a>
      </p>
    </footer>
  );
}