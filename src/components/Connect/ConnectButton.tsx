"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import Button from "../Button";
import { Wallet } from "@/lib/wallet";
import GetUser from "@/actions/auth/GetUser";
import { truncateWalletAddress } from "@/lib/helpers";
import { useUserStore, useWalletStore } from "@/lib/states";
import ValidateSignature from "@/actions/auth/ValidateSignature";

export default function ConnectButton({
    children,
}: Readonly<{
    children?: React.ReactNode;
}>) {
    const setUser = useUserStore(s => s.setUser);
    const network = useUserStore(s => s.network);
    const wallet = useWalletStore(s => s.wallet);
    const handler = useWalletStore(s => s.handler);
    const loading = useWalletStore(s => s.loading);
    const setWallet = useWalletStore(s => s.setWallet);
    const setHandler = useWalletStore(s => s.setHandler);
    const setLoading = useWalletStore(s => s.setLoading);

    const [readyToConnect, setReadyToConnect] = useState(false);

    useEffect(() => {
        try {
            const walletHandler = new Wallet();
            setHandler(walletHandler);
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        if (!handler) return setLoading(false);

        const finalize = () => {
            setLoading(false);
            clearInterval(interval);
        };

        const interval = setInterval(async () => {
            try {
                const accounts = await handler.accounts();
                if (accounts) setReadyToConnect(true);
            } catch (e) {
                console.error(e);
            }

            finalize();
        }, 500);
    }, [handler]);

    useEffect(() => {
        if (!readyToConnect || !network) return;

        (async () => {
            let wallet_ = await handler!.connect(network);
            if (!wallet_) return;

            const signedIn = await ValidateSignature(wallet_, network);
            if (signedIn) setWallet(wallet_);
        })();
    }, [readyToConnect, network]);

    useEffect(() => {
        if (!network) return;
        if (wallet) {
            (async () => {
                const user = await GetUser(wallet, network);
                if (user) setUser(user);
                else setUser(null);
            })();
        }
    }, [wallet, network]);

    async function connect() {
        if (wallet || !network) return;
        if (!handler) return toast.error("Please install MetaMask extension.");

        const wallet_ = await handler.connect(network);
        if (!wallet_) return toast.error("An error has been occured while connecting your wallet");

        // Get signature
        let signature;
        try {
            signature = await handler.signMessage("Welcome to thet.ai - The P2P Prompt Marketplace");
            if (!signature) return toast.error("You have to sign the message in order to sign in");
        } catch (e) {
            return toast.error("You have to sign the message in order to sign in");
        }

        // Validate signature
        const validated = await ValidateSignature(wallet_, network, signature);

        if (validated) setWallet(wallet_);
        else toast.error("Your signature cannot be validated, please try again");
    }

    if (loading) return <></>;

    return (
        <>
            {wallet ? (
                <Button type="main" href="/profile">
                    {truncateWalletAddress(wallet)}
                </Button>
            ) : (
                <Button type="main" click={connect}>
                    {children ?? "Connect Wallet"}
                </Button>
            )}
        </>
    );
}
