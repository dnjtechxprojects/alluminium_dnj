import LayoutWrapper from "@/features/layouts";
import { LAYOUT } from "@/lib/constant";
import { Suspense } from "react";
import PageLoader from "@/components/PageLoader";

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
