"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Editor, { type Monaco } from "@monaco-editor/react";

import { BsChevronDown } from "react-icons/bs";
import { LiaRobotSolid } from "react-icons/lia";

import GPT from "@/actions/ai/GPT";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import TPR from "@/components/Coins/TPR";
import TFUEL from "@/components/Coins/TFUEL";
import Selection from "@/components/Selection";
import SDXLTurbo from "@/actions/ai/SDXLTurbo";
import ConfirmUser from "@/actions/auth/ConfirmUser";
import { MonacoOptions } from "@/components/EditorWrapper";
import { GPTModels, PromptTypes } from "@/data/PromptTypes";
import CreateListing from "@/actions/listing/CreateListing";
import { useUserStore, useWalletStore } from "@/lib/states";
import GPTCustomization from "@/components/Customizations/GPT";
import SDXLTurboCustomization from "@/components/Customizations/SDXLTurbo";

import "./sell.scss";

const llm_example_prompt = [
    {
        role: "user",
        content: "How to learn math?",
    },
    {
        role: "assistant",
        content: "1. Build a Strong Foundation\n2. Practice Regularly\n3. Seek Help When Needed",
    },
];

const MAX_HEIGHT = "calc(100dvh - 330px - 70px)";

export default function Sell() {
    const router = useRouter();

    const user = useUserStore(s => s.user);
    const network = useUserStore(s => s.network);
    const wallet = useWalletStore(s => s.wallet);
    const handler = useWalletStore(s => s.handler);
    const loading = useWalletStore(s => s.loading);

    const editorRef = useRef(null);
    const previewRef = useRef(null);

    const [sellPageLoading, setSellPageLoading] = useState(true);
    const [unsufficentTFUEL, setUnsufficentTFUEL] = useState(true);

    const [generatingPreview, setGeneratingPreview] = useState(false);
    const [publishingListing, setPublishingListing] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [previewMessage, setPreviewMessage] = useState<string | null>(null);

    // Form
    const [prompt, setPrompt] = useState<string>("");
    const [promptRaw, setPromptRaw] = useState<string>("");
    const [promptType, setPromptType] =
        useState<keyof (typeof PromptTypes)["types"]>("Stable Diffusion XL Turbo");
    const [promptTitle, setPromptTitle] = useState("");
    const [promptDescription, setPromptDescription] = useState("");
    const [currency, setCurrency] = useState<"TPR" | "TFUEL">("TFUEL");
    const [promptPrice, setPromptPrice] = useState(0);

    // Customization
    const [customization, setCustomization] = useState<any>({
        "Stable Diffusion XL Turbo": [0.5, 0, 3, 0],
        GPT: [2000, 1, 1, 0, 0],
    });
    const [previewCustomization, setPreviewCustomization] = useState<any>(null);

    // Selections
    const [promptTypeSelection, setPromptTypeSelection] = useState(false);

    useEffect(() => {
        if (!network) return;

        if (handler && wallet) {
            (async () => {
                try {
                    if (user && user.confirmed) {
                        setUnsufficentTFUEL(false);
                        setSellPageLoading(false);
                        return;
                    }

                    const TFUEL_Balance = parseFloat(await handler.getBalance());

                    if (TFUEL_Balance >= 10) {
                        setUnsufficentTFUEL(false);
                        await ConfirmUser(wallet, network);
                    }

                    setSellPageLoading(false);
                } catch (e) {
                    console.error(e);
                    toast.error("Request timed out");
                }
            })();
        }
    }, [wallet, handler, network]);

    useEffect(() => scrollToPreview, [previewImage]);

    function handleEditorDidMount(editor: any, monaco: Monaco) {
        editorRef.current = editor;
    }

    async function preview() {
        if (generatingPreview) return;
        if (!editorRef?.current) return;

        // Read prompt
        const prompt_ = (editorRef.current as any).getValue();
        if (prompt_?.length < 10) return toast.error("Your prompt is too short");

        // Generate a preview
        switch (promptType) {
            case "Stable Diffusion XL Turbo":
                setGeneratingPreview(true);
                try {
                    const previewResponse = await SDXLTurbo(
                        prompt_,
                        customization["Stable Diffusion XL Turbo"],
                    );
                    if (previewResponse) {
                        setPrompt(prompt_);
                        setPreviewImage(previewResponse);
                        setPreviewCustomization(customization);
                    } else toast.error("An error occured while generating the preview");
                } catch (e) {
                    console.error(e);
                    toast.error("An error occured while generating the preview");
                }
                setGeneratingPreview(false);
                break;
            case "gpt-4o-mini":
            case "gpt-4-turbo":
            case "gpt-3.5-turbo-0125":
                setGeneratingPreview(true);
                try {
                    const previewResponse = await GPT(prompt_, promptType, customization["GPT"]);
                    if (previewResponse) {
                        setPrompt(prompt_);
                        setPreviewMessage(previewResponse.content);
                        setPreviewCustomization(customization);
                    } else toast.error("An error occured while generating the preview");
                } catch (e) {
                    console.error(e);
                    toast.error("An error occured while generating the preview");
                }
                setGeneratingPreview(false);
                break;
        }
    }

    async function list() {
        if (!handler || !wallet || !network) return;

        // Check fields
        if (!promptTitle || !promptPrice) return toast.error("Fill all the necessary fields");
        if (promptTitle.length < 10 || promptTitle.length > 60)
            return toast.error("Title must be between 10 and 60 characters");

        // If customization changed without re-generate preview
        if (JSON.stringify(previewCustomization?.[promptType]) !== JSON.stringify(customization[promptType]))
            return toast.error("You must re-generate preview");

        // Preview check for each model
        let correspondingPreview: string = "";

        if (promptType === "Stable Diffusion XL Turbo") {
            if (!previewImage) return toast.error("You must generate a preview image");
            correspondingPreview = previewImage;
        }
        if (GPTModels.includes(promptType as (typeof GPTModels)[number])) {
            if (!previewMessage) return toast.error("You must generate a preview message");
            correspondingPreview = previewMessage;
        }

        if (!correspondingPreview) return toast.error("Invalid prompt type");

        toast.loading("Waiting transaction...");
        setPublishingListing(true);

        // Send fee transaction
        const receiver = "0xD1Ae6836A88E7E457527dbbC805b2bEdBd02A843";
        const feeRatio = 0.5 / 100;
        const value = promptPrice * feeRatio;
        const message = `${wallet} creates prompt listing and pays ${value} ${currency} amount of fee`;

        let hash;

        try {
            hash = await handler.sendTransaction(receiver, value.toString(), message);
            toast.dismiss();
        } catch (e) {
            console.log("Transaction error: ", e);
            toast.dismiss();
            toast.error("Transaction is failed");
            setPublishingListing(false);
            return;
        }

        console.log("Hash:", hash);
        setSellPageLoading(true);

        const listingResponse = await CreateListing(
            wallet,
            network,
            prompt,
            promptType,
            promptTitle,
            promptDescription,
            promptPrice,
            hash,
            customization[promptType],
            currency,
            correspondingPreview,
        );

        if (listingResponse?.error) {
            console.log(listingResponse.error);
            toast.error(listingResponse.error);
            setPublishingListing(false);
            setSellPageLoading(false);
            return;
        }

        router.push("/prompt/" + listingResponse.id);
    }

    useEffect(() => {
        setPromptRaw(
            PromptTypes["types"][promptType] === "Chat Completion"
                ? JSON.stringify(llm_example_prompt, null, 2)
                : "Enter your prompt here 🥳",
        );
    }, [promptType]);

    const scrollToPreview = () => {
        if (!previewRef?.current) return;
        (previewRef.current as any).scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (!wallet && !loading)
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: MAX_HEIGHT,
                    padding: "10px",
                }}
            >
                <p style={{ fontSize: "23px", fontWeight: "600", textAlign: "center" }}>
                    You must connect your wallet to sell prompts
                </p>
            </div>
        );

    if (loading || sellPageLoading)
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: MAX_HEIGHT,
                }}
            >
                <Loader />
            </div>
        );

    if (unsufficentTFUEL)
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: MAX_HEIGHT,
                    padding: "10px",
                }}
            >
                <p style={{ fontSize: "23px", fontWeight: "600", textAlign: "center" }}>
                    You need to have at least{" "}
                    <span style={{ color: "orangered", fontWeight: "700" }}>10 TFUEL</span> in your wallet.
                </p>
            </div>
        );

    return (
        <div id="sell">
            <h1>Sell Prompts</h1>
            <p>
                Enter your prompt, generate a preview output, set a title and a price, and you&apos;re ready
                to start selling your prompt!
            </p>

            <div className="containers">
                <div className="input-container">
                    <div className="editor-wrapper">
                        <Editor
                            key={promptType as string}
                            defaultLanguage={
                                PromptTypes["types"][promptType] === "Chat Completion" ? "json" : "plaintext"
                            }
                            value={promptRaw}
                            onChange={e => {
                                if (e) setPromptRaw(e);
                            }}
                            theme="vs-dark"
                            onMount={handleEditorDidMount}
                            options={MonacoOptions}
                        />
                    </div>
                    <div className="customization">
                        {promptType === "Stable Diffusion XL Turbo" && (
                            <SDXLTurboCustomization
                                customization={customization}
                                setCustomization={setCustomization}
                            />
                        )}
                        {(promptType as string).startsWith("gpt") && (
                            <GPTCustomization
                                customization={customization}
                                setCustomization={setCustomization}
                            />
                        )}
                    </div>
                </div>
                <div className="settings">
                    <div className="content">
                        <h4>Select a Prompt Type</h4>
                        <div className="prompt-type">
                            <div className="selection-container">
                                <button
                                    onClick={() => {
                                        setPromptTypeSelection(true);
                                    }}
                                >
                                    <LiaRobotSolid />
                                    {(promptType as string) || "Select a Prompt"}
                                    <BsChevronDown className="down-arrow" />
                                </button>
                                <div>
                                    <Selection
                                        visible={promptTypeSelection}
                                        setVisible={setPromptTypeSelection}
                                        items={Object.keys(PromptTypes.types)}
                                        click={e => {
                                            setPromptType(e.target.innerText);
                                        }}
                                    />
                                </div>
                            </div>
                            <p>{PromptTypes.types[promptType]}</p>
                        </div>

                        <h4>Set a Listing Title</h4>
                        <input
                            onChange={e => setPromptTitle(e.target.value)}
                            placeholder="Realistic Water Physics for Video Generation"
                        />

                        <h4>
                            Prompt Description <small>(Optional)</small>
                        </h4>
                        <textarea
                            onChange={e => setPromptDescription(e.target.value)}
                            placeholder="Type additional information about your prompt. Like, what it does, why would people need it, etc."
                        />

                        <h4>Select Currency</h4>
                        <div className="button-group">
                            <button
                                className={
                                    "tpr-button " +
                                    (currency === "TPR" ? "active " : " ") +
                                    (network !== "Theta Testnet" ? "disabled" : "")
                                }
                                onClick={() => {
                                    if (network === "Theta Testnet") setCurrency("TPR");
                                    else toast.error("Currently, TPR is only available for Theta Testnet.");
                                }}
                            >
                                <TPR size={30} /> TPR
                            </button>
                            <button
                                className={"tfuel-button " + (currency === "TFUEL" ? "active" : "")}
                                onClick={() => setCurrency("TFUEL")}
                            >
                                <TFUEL size={30} /> TFUEL
                            </button>
                        </div>

                        <h4>Prompt Price</h4>
                        <div className="price-container">
                            <input
                                defaultValue={0}
                                onChange={e => setPromptPrice(parseFloat(e.target.value))}
                                type="number"
                                className="price-input"
                            />
                            <p>{currency}</p>
                        </div>
                    </div>

                    <div className="actions">
                        {previewImage || previewMessage ? (
                            <>
                                {generatingPreview || publishingListing ? (
                                    <Loader />
                                ) : (
                                    <>
                                        <Button type="main" click={list}>
                                            Publish
                                        </Button>
                                        <Button type="blue" click={preview}>
                                            Re-Generate Preview
                                        </Button>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {generatingPreview ? (
                                    <Loader />
                                ) : (
                                    <Button type="blue" click={preview}>
                                        Generate Preview
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {previewImage && (
                <div className="preview">
                    <div className="raw">
                        <h3>Preview</h3>
                        <p>If you modify your prompt, you have to re-generate the preview.</p>

                        <img src={previewImage} alt="Preview" ref={previewRef} />
                    </div>
                </div>
            )}

            {previewMessage && (
                <div className="preview">
                    <div className="raw">
                        <h3>Preview</h3>
                        <p>If you modify your prompt, you have to re-generate the preview.</p>

                        <div className="editor-wrapper">
                            <Editor
                                defaultLanguage="plaintext"
                                value={previewMessage}
                                theme="vs-dark"
                                options={MonacoOptions}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
