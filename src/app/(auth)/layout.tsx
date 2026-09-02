import LayoutWrapper from "@/features/layouts";
import { LAYOUT } from "@/lib/constant";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <LayoutWrapper variant={LAYOUT.minimal}>
                {children}
            </LayoutWrapper>
        </>
    )
};
export default Layout;
