import Link from "next/link";

import TPR from "../Coins/TPR";
import TFUEL from "../Coins/TFUEL";
import { GPTModels, PromptTypes } from "@/data/PromptTypes";

import "./listing.scss";

export default function Listing({
    id,
    type,
    title,
    description,
    preview,
    price,
    currency,
}: {
    id: string;
    type: keyof (typeof PromptTypes)["types"];
    title: string;
    description?: string;
    preview: string;
    price: number;
    currency: "TPR" | "TFUEL";
}) {
    return (
        <Link className="listing" href={`/prompt/${id}`}>
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
                    <span>{price}</span>
                    {currency} {currency === "TPR" ? <TPR /> : <TFUEL />}
                </div>
                <div className="model">{type as string}</div>
            </div>
        </Link>
    );
}
