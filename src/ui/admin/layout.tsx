import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            {/* header */}
            {children}
            {/* footer */}
        </div>
    );
};

export default AdminLayout;