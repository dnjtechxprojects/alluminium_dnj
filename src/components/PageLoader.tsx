export default function PageLoader({ className = "" }: { className?: string }) {
  return (
    <div
      // #eeeeee is the average tone of navbar-bg.png, shown until the 1.2MB image arrives
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#eeeeee] bg-cover bg-center ${className}`}
      style={{
        backgroundImage: "url('/images/navbar-bg.png')",
      }}
    >
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold tracking-widest text-black mb-10">
          NATRAJALUFORM
        </h1>

        <div className="w-14 h-14 rounded-full border-[4px] border-black border-t-gray-400 animate-spin"></div>
      </div>
    </div>
  );
}
