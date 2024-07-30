"use client";

import { useUserStore } from "@/lib/states";

export default function Network() {
    const network = useUserStore(s => s.network);

    if (!network) return <></>;

    return (
        <div className={network.toLowerCase().replaceAll(" ", "-")}>
            {network.includes("Testnet") && <h5>{network}</h5>}
        </div>
    );
}
