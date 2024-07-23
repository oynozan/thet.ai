import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "../styles/main.scss";
import Wrapper from '@/components/Wrapper';

// Fonts
const inter = Inter({ subsets: ["latin"], variable: "--inter" });
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--poppins",
});

// Metadata
export const metadata: Metadata = {
    title: "thet.ai - Web3 Prompt Market",
    description: "Welcome to thet.ai, the prompt market on Web3.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${poppins.variable}`}>
                <Wrapper>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </Wrapper>
            </body>
        </html>
    );
}
