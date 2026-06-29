export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`html, body { background-color: transparent !important; color: inherit !important; font-family: inherit !important; }`}</style>
      {children}
    </>
  );
}
