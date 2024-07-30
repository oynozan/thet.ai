import Link from "next/link";

import TPR from "../Coins/TPR";
import TFUEL from "../Coins/TFUEL";
import { GPTModels, type TPromptType } from "@/data/PromptTypes";

import "./listing.scss";

export default function Listing({
    id,
    type,
    title,
    description,
    preview,
    price,
    currency,
    customLink,
}: {
    id: string;
    type: TPromptType;
    title: string;
    description?: string;
    preview: string;
    price: number;
    currency: "TPR" | "TFUEL";
    customLink?: string;
}) {
    return (
        <Link className="listing" href={customLink || `/prompt/${id}`}>
            {type === "Stable Diffusion XL Turbo" && (
                <div className="image" style={{ backgroundImage: `url(${preview})` }}></div>
            )}
            {GPTModels.includes(type as (typeof GPTModels)[number]) && (
                <div className="text-preview">
                    <p>{preview}</p>
                </div>
            )}
            <div className="text">
                <h3>{title}</h3>
                <p>{description || ""}</p>
            </div>
            <div className="info">
                <div className="price">
                    <span>{price.toFixed(2)}</span>
                    {currency} {currency === "TPR" ? <TPR /> : <TFUEL />}
                </div>
                <div className="model">{type as string}</div>
            </div>
        </Link>
    );
}
