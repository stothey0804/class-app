export const Title = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <header className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
      {children}
    </header>
  );
};
