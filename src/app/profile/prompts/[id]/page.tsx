"use client";

import { useEffect, useState } from "react";

import EditorWrapper from "@/components/EditorWrapper";
import { useUserStore, useWalletStore } from "@/lib/states";
import GetFullListing from "@/actions/listing/GetFullListing";
import GPTCustomization from "@/components/Customizations/GPT";
import SDXLTurboCustomization from "@/components/Customizations/SDXLTurbo";

import "./bought.scss";
import toast from 'react-hot-toast';

export default function BoughtPrompt({ params }: { params: { id: string } }) {
    const id = params.id;

    const wallet = useWalletStore(s => s.wallet);
    const network = useUserStore(s => s.network);

    const [prompt, setPrompt] = useState<any>(null);
    const [customization, setCustomization] = useState<any>({});

    useEffect(() => {
        if (!wallet || !network) return;

        (async () => {
            const raw_prompt = await GetFullListing(id, wallet, network);

            if (!raw_prompt) return;
            if (raw_prompt?.error) return toast.error(raw_prompt.error);

            setPrompt(raw_prompt);

            const raw_customization: any = {};
            raw_customization[raw_prompt.type] = raw_prompt.customization;
            setCustomization(raw_customization);
        })();
    }, [wallet, network]);

    if (!prompt) return <></>;

    return (
        <div id="bought">
            <EditorWrapper defaultValue={prompt.prompt} readOnly={true} />

            <div className="customization">
                {prompt.type === "Stable Diffusion XL Turbo" && (
                    <SDXLTurboCustomization
                        customization={customization}
                        setCustomization={setCustomization}
                    />
                )}
                {prompt.type.startsWith("gpt") && (
                    <GPTCustomization customization={customization} setCustomization={setCustomization} />
                )}
            </div>
        </div>
    );
}
