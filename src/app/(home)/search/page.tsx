"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import Listing from "@/components/Listing";
import { useUserStore } from "@/lib/states";
import SearchListing from "@/actions/listing/SearchListing";

import "./search.scss";

export default function SearchPage() {
    return (
        <Suspense>
            <SearchContent />
        </Suspense>
    );
}

function SearchContent() {
    const searchParams = useSearchParams();
    const q = searchParams.get("q");

    const network = useUserStore(s => s.network);

    const [listings, setListings] = useState<any>([]);

    useEffect(() => {
        if (!q || !network) return;

        (async () => {
            const raw_listings = await SearchListing(q, network);
            setListings(raw_listings);
        })();
    }, [q, network]);

    if (!q || typeof q !== "string") return <p>There are no prompts for this search query.</p>;

    return (
        <div id="search">
            {!listings?.length && <p>There are no prompts for this search query.</p>}
            <div className="list">
                {listings?.map((p: any, i: number) => {
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
        </div>
    );
}
