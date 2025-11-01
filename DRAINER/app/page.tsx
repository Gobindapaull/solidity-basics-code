import WalletButton from "../app/components/WalletButton";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Free Airdrop</h1>
      <WalletButton />
    </main>
  );
}
