import { PAPER_COLOR, PaperTexture } from "@/components/common/PaperBackground";

export default function PageLoader({ className = "" }: { className?: string }) {
  return (
    <div
      className={`fixed inset-0 z-[9999] isolate flex items-center justify-center ${className}`}
      style={{ backgroundColor: PAPER_COLOR }}
    >
      <PaperTexture />
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold tracking-widest text-[#212121] mb-10">
          NATRAJALUFORM
        </h1>

        <div className="w-14 h-14 rounded-full border-[4px] border-[#212121]/15 border-t-[#FFB600] animate-spin"></div>
      </div>
    </div>
  );
}
