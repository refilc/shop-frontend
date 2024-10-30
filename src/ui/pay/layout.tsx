import { ReactNode } from "react";

const PayLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="text-foreground bg-background w-screen h-screen">
            {children}
        </div>
    );
};

export default PayLayout;