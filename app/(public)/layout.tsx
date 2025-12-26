import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      <Footer />
    </section>
  );
}
