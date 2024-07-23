"use client";

import { useEffect, useState } from "react";

import { TiArrowSortedUp } from "react-icons/ti";

export default function Top() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled to a certain height
    const toggleVisibility = () => {
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <button id="scroll-top" onClick={scrollToTop}>
                    <TiArrowSortedUp />
                </button>
            )}
        </>
    );
}
