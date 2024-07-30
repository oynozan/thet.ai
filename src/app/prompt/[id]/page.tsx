import EditorWrapper from "@/components/EditorWrapper";
import GetListing from "@/actions/listing/GetListing";
import BuyButton from "@/components/Buy/BuyButton";
import { GPTModels } from "@/data/PromptTypes";
import TFUEL from "@/components/Coins/TFUEL";
import { formatDate } from "@/lib/helpers";
import TPR from "@/components/Coins/TPR";
import NotFound from "@/app/not-found";

import "./prompt.scss";

export default async function PromptPage({ params }: { params: { id: string } }) {
    const listing = await GetListing(params.id);
    if (!listing) return NotFound();

    const type = listing.type;

    return (
        <div id="prompt-page">
            {type === "Stable Diffusion XL Turbo" && (
                <div className="side">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={listing.preview} alt="Prompt Preview" />
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
                        <span>{listing.price.toFixed(2)}</span>
                        {listing.currency}{" "}
                        {listing.currency === "TPR" ? <TPR size={24} /> : <TFUEL size={24} />}
                    </div>

                    <BuyButton
                        id={params.id}
                        address={listing.wallet}
                        amount={listing.price}
                        currency={listing.currency}
                    />
                </div>
            </div>
        </div>
    );
}
