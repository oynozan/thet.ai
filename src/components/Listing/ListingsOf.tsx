"use client";

import { useEffect, useState } from "react";

import Loader from "../Loader";
import Listing from "@/components/Listing";
import { useUserStore } from "@/lib/states";
import GetListingsOf from "@/actions/listing/GetListingsOf";

export default function ListingsOf({ wallet }: { wallet: string }) {
    const network = useUserStore(s => s.network);

    const [items, setItems] = useState<Array<any>>([]);

    useEffect(() => {
        if (!network) return;

        (async () => {
            const listings = await GetListingsOf(wallet, network);
            setItems(listings);
        })();
    }, [network]);

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
                    />
                );
            })}
        </div>
    );
}
