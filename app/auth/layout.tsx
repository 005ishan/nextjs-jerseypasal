import Header from "./components/Header";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard page layout with header",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#9795FF]">
      <Header />

      <main>
        {children}
        </main>
    </div>
  );
}
