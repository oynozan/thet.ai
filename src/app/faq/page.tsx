import Link from "next/link";

import "./faq.scss";

export default function FAQ() {
    return (
        <div id="faq">
            <div>
                <h3>What is thet.ai?</h3>
                <p>
                    <Link href="/">thet.ai</Link> is a prompt market built on Web3. You can buy prompts or
                    sell your custom prompts.
                </p>
                <p>
                    A prompt is a piece of text or a question given to an AI model to guide its response.
                    It&apos;s like giving the AI a starting point or context for generating its answer.
                </p>
                <p>
                    For example, if you want to generate an image of something very specific (like a flying
                    lamppost) you need a detailed prompt. Most of the time, purchasing a prompt saves your
                    time since you don&apos;t have to run tests for hours.
                </p>
            </div>
            <div>
                <h3>What is TPR token?</h3>
                <p>
                    TPR token is an utility token that you can use to buy prompts from{" "}
                    <Link href="/">thet.ai</Link>. TPR is currently only available on Theta Testnet. A faucet
                    for TPR is coming very soon.
                </p>
                <p>
                    Contract address:{" "}
                    <span style={{ color: "#2de3bd" }}>0xdD94af5CC36AA7aDBeE5e22Ea4942e32060FEd72</span>
                </p>
            </div>
            <div>
                <h3>How can I sell prompts?</h3>
                <p>First, connect your wallet and you&apos;ll have your account created.</p>
                <p>
                    Secondly, you need to own at least 10 TFUEL in your wallet. So we can be sure you&apos;re
                    not a bot.
                </p>
                <p>
                    And now, you are ready to sell your prompt. Go to <Link href="/sell">Sell</Link> page and
                    enter your prompt.
                </p>
                <p>
                    In order to sell it, a preview will be generated. So buyers can see an actual output of
                    your prompt. This way, we prevent poor prompts to be sold.
                </p>
                <p>After you pay a fee with TFUEL or TPR, you are ready to sell.</p>
            </div>
            <div>
                <h3>What about the networks?</h3>
                <p>There are 2 networks on thet.ai: THETA Mainnet & THETA Testnet</p>
                <p>
                    Each account and prompt listing is distinguishable in each network. You can use TPR tokens
                    in Testnet.
                </p>
                <p>
                    If you create a sale of a prompt on Mainnet, you can&apos;t buy it on Testnet, and vice
                    versa.
                </p>
            </div>
            <div>
                <h3>How can I buy prompts?</h3>
                <p>First, connect your wallet and you&apos;ll have your account created.</p>
                <p>
                    Then, enter the page of the prompt you want to buy. Sellers set their price in TFUEL or
                    TPR. It&apos;s up to them.
                </p>
                <p>After you pay for the prompt, you can see it on your dashboard.</p>
                <p>
                    While buying, you send your assets directly to the buyer. You do not pay a fee to us.
                    Buying is P2P (Peer-to-peer)
                </p>
            </div>
        </div>
    );
}
