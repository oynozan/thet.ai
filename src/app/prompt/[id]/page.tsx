import GetListing from "@/actions/listing/GetListing";
import { GPTModels } from "@/data/PromptTypes";
import { Editor } from "@monaco-editor/react";
import TFUEL from "@/components/Coins/TFUEL";
import { formatDate } from "@/lib/helpers";
import Button from "@/components/Button";
import TPR from "@/components/Coins/TPR";
import NotFound from "@/app/not-found";

import "./prompt.scss";
import EditorWrapper from "@/components/EditorWrapper";

export default async function PromptPage({ params }: { params: { id: string } }) {
    const listing = await GetListing(params.id);
    if (!listing) return NotFound();

    const type = listing.type;

    return (
        <div id="prompt-page">
            {type === "Stable Diffusion XL Turbo" && (
                <div className="side">
                    <img src={listing.preview} />
                </div>
            )}
            {GPTModels.includes(type as (typeof GPTModels)[number]) && (
                <div className="side">
                    <EditorWrapper defaultValue={listing.preview} />
                </div>
            )}
            <div className="text">
                <div className="top">
                    <h1>{listing.title}</h1>
                    <span>{type}</span>
                </div>

                {listing?.description && <p>{listing.description}</p>}

                <h4>
                    Prompt Details: <span>{formatDate(new Date(listing.date))}</span>
                </h4>
                <div className="prompt-info">
                    <p>
                        <span>Length: </span>
                        {listing.promptLength}
                    </p>
                    <p>
                        <span>Does preview include seed: </span>
                        {listing.seed !== 0 ? "Yes" : "No"}
                    </p>
                    <p>
                        <span>Sales: </span>
                        {listing.sales || 0}
                    </p>
                </div>

                <div className="actions">
                    <div className="price">
                        <span>{listing.price}</span>
                        {listing.currency}{" "}
                        {listing.currency === "TPR" ? <TPR size={24} /> : <TFUEL size={24} />}
                    </div>

                    <Button type="main">Buy</Button>
                </div>
            </div>
        </div>
    );
}
