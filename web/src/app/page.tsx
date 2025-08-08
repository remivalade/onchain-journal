import JournalApp from '@/components/JournalApp';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        <JournalApp />
      </main>
      <Footer />
    </>
  );
}
