import Search from "@/components/Search";
import Loader from "@/components/Loader";
import TPR from "@/components/Coins/TPR";
import Listing from "@/components/Listing";
import TFUEL from "@/components/Coins/TFUEL";
import { GPTModels } from "@/data/PromptTypes";
import GetTrendingPrompts from "@/actions/listing/GetTrendingPrompts";
import GetMostRecentPrompts from "@/actions/listing/GetMostRecentPrompts";
import GetBestSellingPrompts from "@/actions/listing/GetBestSellingPrompts";

import "./home.scss";

export default async function Home() {
    const mostRecentPrompts = await GetMostRecentPrompts();
    const mostRecentLLMPrompts = await GetMostRecentPrompts(10, GPTModels as any);
    const mostRecentTextToImagePrompts = await GetMostRecentPrompts(10, "Stable Diffusion XL Turbo");

    const trendingLLMPrompts = await GetTrendingPrompts(10, GPTModels as any);
    const trendingTextToImagePrompts = await GetTrendingPrompts(10, "Stable Diffusion XL Turbo");

    const bestSellingLLMPrompts = await GetBestSellingPrompts(10, GPTModels as any);
    const bestSellingTextToImagePrompts = await GetBestSellingPrompts(10, "Stable Diffusion XL Turbo");

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
                    <div className="list">
                        {!trendingTextToImagePrompts?.length && <Loader />}
                        {trendingTextToImagePrompts?.map((p, i) => {
                            return (
                                <Listing
                                    key={i}
                                    id={p._id}
                                    type={p.type}
                                    title={p.title}
                                    description={p.description}
                                    preview={p.preview}
                                    price={p.price}
                                    currency={p.currency}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="category">
                    <h2>Trending LLM Prompts</h2>
                    <div className="list">
                        {!trendingLLMPrompts?.length && <Loader />}
                        {trendingLLMPrompts?.map((p, i) => {
                            return (
                                <Listing
                                    key={i}
                                    id={p._id}
                                    type={p.type}
                                    title={p.title}
                                    description={p.description}
                                    preview={p.preview}
                                    price={p.price}
                                    currency={p.currency}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="category">
                    <h2>Best Selling Text to Image Prompts</h2>
                    <div className="list">
                        {!bestSellingTextToImagePrompts?.length && <Loader />}
                        {bestSellingTextToImagePrompts?.map((p, i) => {
                            return (
                                <Listing
                                    key={i}
                                    id={p._id}
                                    type={p.type}
                                    title={p.title}
                                    description={p.description}
                                    preview={p.preview}
                                    price={p.price}
                                    currency={p.currency}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="category">
                    <h2>Most Recent Prompts</h2>
                    <div className="list">
                        {!mostRecentPrompts?.length && <Loader />}
                        {mostRecentPrompts?.map((p, i) => {
                            return (
                                <Listing
                                    key={i}
                                    id={p._id}
                                    type={p.type}
                                    title={p.title}
                                    description={p.description}
                                    preview={p.preview}
                                    price={p.price}
                                    currency={p.currency}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* 
                <div className="banner">
                    <div className="content"></div>
                </div>
                */}

                <div className="category">
                    <h2>Best Selling LLM Prompts</h2>
                    <div className="list">
                        {!bestSellingLLMPrompts?.length && <Loader />}
                        {bestSellingLLMPrompts?.map((p, i) => {
                            return (
                                <Listing
                                    key={i}
                                    id={p._id}
                                    type={p.type}
                                    title={p.title}
                                    description={p.description}
                                    preview={p.preview}
                                    price={p.price}
                                    currency={p.currency}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="category">
                    <h2>Most Recent Text to Image Prompts</h2>
                    <div className="list">
                        {!mostRecentTextToImagePrompts?.length && <Loader />}
                        {mostRecentTextToImagePrompts?.map((p, i) => {
                            return (
                                <Listing
                                    key={i}
                                    id={p._id}
                                    type={p.type}
                                    title={p.title}
                                    description={p.description}
                                    preview={p.preview}
                                    price={p.price}
                                    currency={p.currency}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="category">
                    <h2>Most Recent LLM Prompts</h2>
                    <div className="list">
                        {!mostRecentLLMPrompts?.length && <Loader />}
                        {mostRecentLLMPrompts?.map((p, i) => {
                            return (
                                <Listing
                                    key={i}
                                    id={p._id}
                                    type={p.type}
                                    title={p.title}
                                    description={p.description}
                                    preview={p.preview}
                                    price={p.price}
                                    currency={p.currency}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
