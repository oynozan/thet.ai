import Link from "next/link";
import Image from "next/image";

import "./footer.scss";

export default function Footer() {
    return (
        <footer>
            <div className="top">
                <div className="intro">
                    <Link href="/">
                        <Image src="/logo.png" alt="thet.ai Logo" height={100} width={100} />
                    </Link>
                    <p>
                        <Link href="/">thet.ai</Link> is a prompt market running on{" "}
                        <span>THETA</span> network. Sell & buy prompts with <span>TPR</span> and{" "}
                        <span>TFUEL</span>.
                        <br />
                        <span>
                            Contact us at{" "}
                            <a href="mailto:contact@thet.ai" className="mail">
                                contact@thet.ai
                            </a>
                        </span>
                    </p>
                </div>
                <div className="links">
                    <h5>Project</h5>
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/swap">Buy TPR</Link>
                        </li>
                        <li>
                            <Link href="/whitepaper">Whitepaper</Link>
                        </li>
                        <li>
                            <Link href="/sell">Sell</Link>
                        </li>
                    </ul>
                </div>
                <div className="links">
                    <h5>General</h5>
                    <ul>
                        <li>
                            <Link href="/faq">FAQ</Link>
                        </li>
                        <li>
                            <Link href="/tos">Terms of Service</Link>
                        </li>
                        <li>
                            <Link href="/sponsors">Sponsors</Link>
                        </li>
                    </ul>
                </div>
                <div className="links">
                    <h5>Social</h5>
                    <ul>
                        <li>
                            <a href="https://twitter.com/thet_ai">Twitter</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="bottom">
                <p>thet.ai &copy; 2024 - All rights reserved</p>
            </div>
        </footer>
    );
}
