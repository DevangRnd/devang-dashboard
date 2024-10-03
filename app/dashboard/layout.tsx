import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto ">
        <div className="container mx-auto px-6 py-8 ">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
