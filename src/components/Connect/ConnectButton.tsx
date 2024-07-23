"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

import Button from "../Button";
import { Wallet } from "@/lib/wallet";
import { useUserStore, useWalletStore } from "@/lib/states";
import { truncateWalletAddress } from "@/lib/helpers";
import ValidateSignature from "@/actions/auth/ValidateSignature";
import GetUser from '@/actions/auth/GetUser';

export default function ConnectButton({
    children,
}: Readonly<{
    children?: React.ReactNode;
}>) {
    const setUser = useUserStore(s => s.setUser);
    const wallet = useWalletStore(s => s.wallet);
    const handler = useWalletStore(s => s.handler);
    const loading = useWalletStore(s => s.loading);
    const setWallet = useWalletStore(s => s.setWallet);
    const setHandler = useWalletStore(s => s.setHandler);
    const setLoading = useWalletStore(s => s.setLoading);

    useEffect(() => {
        try {
            const walletHandler = new Wallet();
            setHandler(walletHandler);
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        if (!handler) return;

        const finalize = () => {
            setLoading(false);
            clearInterval(interval);
        }

        const interval = setInterval(async () => {
            const accounts = await handler.accounts();

            if (accounts) {
                let wallet_ = await handler.connect();
                if (!wallet_) return finalize();

                const signedIn = await ValidateSignature(wallet_);

                if (signedIn) setWallet(wallet_);
                finalize();
            } else finalize();
        }, 500);
    }, [handler]);

    useEffect(() => {
        if (wallet) {
            (async() => {
                const user = await GetUser(wallet);
                if (user) setUser(user);
            })()
        }
    }, [wallet]);

    async function connect() {
        if (wallet) return;

        if (!handler) return toast.error("Please install MetaMask extension.");

        const wallet_ = await handler.connect();
        if (!wallet_) return toast.error("An error has been occured while connecting your wallet");

        // Get signature
        let signature;
        try {
            signature = await handler.signMessage(
                "Welcome to thet.ai - The P2P Prompt Marketplace",
            );
            if (!signature) return toast.error("You have to sign the message in order to sign in");
        } catch (e) {
            return toast.error("You have to sign the message in order to sign in");
        }

        // Validate signature
        const validated = await ValidateSignature(wallet_, signature);

        if (validated) setWallet(wallet_);
        else toast.error("Your signature cannot be validated, please try again");
    }

    if (loading) return <></>

    return (
        <>
        {wallet ? (
            <Button
                type="main"
                href='/profile'
            >
                {truncateWalletAddress(wallet)}
            </Button>
        ) : (
            <Button
                type="main"
                click={() => {
                    if (!wallet) connect();
                }}
            >
                {children ?? "Connect Wallet"}
            </Button>
        )}
        </>
    );
}
