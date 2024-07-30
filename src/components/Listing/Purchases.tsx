"use client";

import { useEffect, useState } from "react";

import Loader from "../Loader";
import Listing from "@/components/Listing";
import GetPurchases from "@/actions/listing/GetPurchases";
import { useUserStore, useWalletStore } from "@/lib/states";

export default function Purchases() {
    const network = useUserStore(s => s.network);
    const wallet = useWalletStore(s => s.wallet);

    const [items, setItems] = useState<Array<any>>([]);

    useEffect(() => {
        if (!wallet || !network) return;

        (async () => {
            const purchases = await GetPurchases(wallet, network);
            setItems(purchases);
        })();
    }, [wallet, network]);

    if (!items.length) return <p>You don&apos;t have any prompt listings yet.</p>;

    return (
        <div className="list">
            {items?.map((p, i) => {
                return (
                    <Listing
                        key={i}
                        id={p._id}
                        type={p.type}
                        title={p.title}
                        description={p.description}
                        preview={p.preview}
                        price={p.price}
                        currency={p.currency}
                        customLink={`/profile/prompts/${p._id}`}
                    />
                );
            })}
        </div>
    );
}
