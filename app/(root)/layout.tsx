import Navbar from "@/components/navigation/navbar";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <Navbar /> {children}
    </main>
  );
};
export default RootLayout;
