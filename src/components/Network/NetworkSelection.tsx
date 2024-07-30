"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { BsChevronDown } from "react-icons/bs";

import Selection from "../Selection";
import { Networks } from "@/data/Networks";
import { useUserStore, useWalletStore } from "@/lib/states";
import toast from "react-hot-toast";
import Logout from "@/actions/auth/Logout";

type item = {
    [n: string]: {
        icon: string;
        title: string;
    };
};

const items: item = {};
const itemTitles: Array<string> = [];

// TODO: Currently only network is Theta mainnet & testnet, implement more advanced conditions here
Networks.forEach(n => {
    const title = n.includes("Mainnet") ? "Mainnet" : "Testnet";

    itemTitles.push(title);

    items[n] = {
        icon: "theta",
        title: title,
    };
});

export default function NetworkSelection() {
    const user = useUserStore(s => s.user);
    const network = useUserStore(s => s.network);
    const handler = useWalletStore(s => s.handler);
    const setNetwork = useUserStore(s => s.setNetwork);

    // Selections
    const [networkSelection, setNetworkSelection] = useState(false);

    useEffect(() => {
        // Get network from localStorage
        if (user && network) {
            handleNetworkChange(null, network);
        } else {
            const localNetwork = localStorage.getItem("network");
            if (localNetwork && Networks.includes(localNetwork)) setNetwork(localNetwork);
        }
    }, [user]);

    async function handleNetworkChange(e: any, plainNetwork?: string) {
        const networkFromTitle = plainNetwork ?? Object.keys(items)[itemTitles.indexOf(e?.target?.innerText)];

        if (!user) {
            localStorage.setItem("network", networkFromTitle);
            window.location.reload();
            setNetwork(networkFromTitle);
            return;
        }

        if (!handler) {
            toast.error("Connect your wallet");
            return;
        }

        try {
            await handler?.detectNetwork(networkFromTitle);
            localStorage.setItem("network", networkFromTitle);

            if (!plainNetwork) {
                Logout();
                window.location.reload();
            }

            setNetwork(networkFromTitle);
        } catch (e) {
            console.error(e);
            toast.error("Cannot change the network");
        }
    }

    return (
        <div className="selection-container">
            <button
                style={{
                    padding: "0 30px 0 10px",
                    height: 36,
                    borderRadius: 7,
                }}
                onClick={() => {
                    setNetworkSelection(true);
                }}
            >
                <Image
                    src={`/logos/${items[network ?? "Theta Mainnet"].icon}.svg`}
                    alt={network ?? "Theta Mainnet"}
                    height={25}
                    width={25}
                    style={{ borderRadius: "50%" }}
                />
                <BsChevronDown className="down-arrow" size={14} style={{ marginRight: 0 }} />
            </button>
            <div>
                <Selection
                    visible={networkSelection}
                    setVisible={setNetworkSelection}
                    items={itemTitles}
                    click={handleNetworkChange}
                    active={items[network || "Theta Mainnet"].title}
                    position="left"
                />
            </div>
        </div>
    );
}
