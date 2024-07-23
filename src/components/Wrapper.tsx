import { Toaster } from "react-hot-toast";

import Modals from "@/components/Modal/Modals";
import Top from './Top';

export default function Wrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Toaster position="bottom-right" containerClassName="toast-container" />
            <Modals />
            {children}
            <Top />
        </>
    );
}
