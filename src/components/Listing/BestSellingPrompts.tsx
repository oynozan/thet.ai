"use client";

import { useEffect, useState } from "react";

import Loader from "../Loader";
import Listing from "@/components/Listing";
import { useUserStore } from "@/lib/states";
import type { TPromptType } from "@/data/PromptTypes";
import GetBestSellingPrompts from "@/actions/listing/GetBestSellingPrompts";

export default function BestSellingPrompts({ n, type }: { n: number; type?: TPromptType }) {
    const network = useUserStore(s => s.network);

    const [items, setItems] = useState<
        Array<{
            _id: any;
            wallet: any;
            type: any;
            title: any;
            description: any;
            price: any;
            currency: any;
            preview: any;
            date: any;
        }>
    >([]);

    useEffect(() => {
        if (!network) return;

        (async () => {
            const bestSellingPrompts = await GetBestSellingPrompts(network, n, type);
            setItems(bestSellingPrompts);
        })();
    }, [network]);

    return (
        <div className="list">
            {!items?.length && <Loader />}
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
