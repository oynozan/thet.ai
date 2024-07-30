"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useUserStore, useWalletStore } from "@/lib/states";
import Button from "../Button";
import Loader from "../Loader";
import BuyPrompt from "@/actions/listing/BuyPrompt";

export default function BuyButton({
    id,
    address,
    amount,
    currency,
}: {
    id: string;
    address: string;
    amount: number;
    currency: "TPR" | "TFUEL";
}) {
    const router = useRouter();

    const network = useUserStore(s => s.network);
    const wallet = useWalletStore(s => s.wallet);
    const handler = useWalletStore(s => s.handler);

    const [loading, setLoading] = useState(false);

    async function buy() {
        if (!network) return;
        if (!handler || !wallet) return toast.error("Please connect your wallet");
        toast.loading("Waiting transaction...");
        setLoading(true);

        let hash;

        try {
            hash = await handler.sendTransaction(address, amount.toString(), id);
            toast.loading("Verifying the transaction...");
        } catch (e: any) {
            toast.dismiss();
            toast.error("Transaction is failed");
            setLoading(false);
            return;
        }

        console.log("Hash:", hash);

        const buyResponse: any = await BuyPrompt(wallet, network, address, id, amount, hash, currency);

        if (buyResponse?.error) {
            console.log(buyResponse.error);
            toast.error(buyResponse.error);
            setLoading(false);
            return;
        }

        setLoading(false);
        toast.dismiss();
        toast.success("You've successfully bought the prompt. You can access it from your profile");

        router.push(`/profile/prompts/${id}`);
    }

    if (wallet === address) return <></>;
    if (loading) return <Loader />;

    return (
        <Button type="main" click={() => buy()}>
            Buy
        </Button>
    );
}
