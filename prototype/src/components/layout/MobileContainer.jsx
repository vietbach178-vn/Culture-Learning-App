export default function MobileContainer({ children }) {
  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-surface relative shadow-lg">
      {children}
    </div>
  );
}
