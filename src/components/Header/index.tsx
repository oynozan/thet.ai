import Image from "next/image";
import Link from "next/link";

import { IoMenu } from "react-icons/io5";

import ConnectButton from "../Connect/ConnectButton";

import "./header.scss";
import Search from '../Search';

export default function Header() {
    return (
        <header>
            <Link href="/">
                <Image src="/logo.png" alt="thet.ai Logo" height={50} width={50} />
            </Link>

            <div className="links">
                <Link href="/">Home</Link>
                <Link href="/sell">Sell</Link>
                <Link href="/swap">Buy TPR</Link>
                <Link href="/faq">FAQ</Link>
                <Link href="/whitepaper">Whitepaper</Link>
                <Link href="/sponsors">Sponsors</Link>
            </div>

            <div className="actions">
                <Search />
                <ConnectButton />
            </div>

            <div className="mobile">
                <IoMenu color="#1c1c1c" size={30} />
            </div>
        </header>
    );
}
