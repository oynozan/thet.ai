import Search from "@/components/Search";
import Loader from "@/components/Loader";
import TPR from "@/components/Coins/TPR";
import Listing from "@/components/Listing";
import TFUEL from "@/components/Coins/TFUEL";
import { GPTModels } from "@/data/PromptTypes";
import TrendingPrompts from "@/components/Listing/TrendingPrompts";
import MostRecentPrompts from "@/components/Listing/MostRecentPrompts";

import "./home.scss";
import BestSellingPrompts from "@/components/Listing/BestSellingPrompts";

export default async function Home() {
    return (
        <div id="home">
            <div className="search-container">
                <h1>First ever P2P prompt marketplace</h1>
                <p>
                    Sell & Buy AI prompts - Earn TFUEL <TFUEL /> & TPR <TPR />
                </p>
                <Search />
            </div>
            <div className="marketplace">
                <div className="category">
                    <h2>Trending Text to Image Prompts</h2>
                    <TrendingPrompts n={10} type="Stable Diffusion XL Turbo" />
                </div>
                <div className="category">
                    <h2>Trending LLM Prompts</h2>
                    <TrendingPrompts n={10} type={GPTModels as any} />
                </div>
                <div className="category">
                    <h2>Best Selling Text to Image Prompts</h2>
                    <BestSellingPrompts n={10} type="Stable Diffusion XL Turbo" />
                </div>
                <div className="category">
                    <h2>Most Recent Prompts</h2>
                    <MostRecentPrompts n={10} />
                </div>
                <div className="category">
                    <h2>Best Selling LLM Prompts</h2>
                    <BestSellingPrompts n={10} type={GPTModels as any} />
                </div>
                <div className="category">
                    <h2>Most Recent Text to Image Prompts</h2>
                    <MostRecentPrompts n={10} type="Stable Diffusion XL Turbo" />
                </div>
                <div className="category">
                    <h2>Most Recent LLM Prompts</h2>
                    <MostRecentPrompts n={10} type={GPTModels as any} />
                </div>
            </div>
        </div>
    );
}
