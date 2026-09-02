import LayoutWrapper from "@/features/layouts";
import { LAYOUT } from "@/lib/constant";
import { Suspense } from "react";
function PageLoader() {
  return (
    <div
      className="fixed inset-0  flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/navbar-bg.png')" 
      }}
    >
      <div className="absolute inset-0 "></div>

      <div className="relative z-10 flex flex-col items-center">
        
        <h1 className="text-4xl font-bold tracking-widest text-black mb-10">
          NATRAJALUFORM
        </h1>
        <div className="w-14 h-14 rounded-full border-[4px] border-black border-t-gray-500 animate-spin"></div>

      </div>
    </div>
  );
}
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
         <Suspense fallback={<PageLoader />}>
            <LayoutWrapper variant={LAYOUT.public}>
                {children}
            </LayoutWrapper>
            </Suspense>
        </>
    )
};
export default Layout;
