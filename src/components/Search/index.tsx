"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FaMagnifyingGlass } from "react-icons/fa6";

import "./search.scss";

const placeholders = [
    "A serene forest clearing at dawn, photorealistic style",
    "Futuristic cityscape with flying cars, cyberpunk style",
    "Medieval knight in shining armor, fantasy art style",
    "Majestic dragon soaring above mountains, epic landscape",
    "Elegant ballerina dancing on a stage, oil painting style",
    "Cute kitten playing with a ball of yarn, cartoon style",
    "Astronaut exploring an alien planet, sci-fi illustration",
    "Vintage car driving through a rainy city street, noir style",
    "Pirate ship sailing through stormy seas, classic adventure",
    "Zen garden with blooming cherry blossoms, watercolor style",
];

export default function Search() {
    const router = useRouter();

    const [search, setSearch] = useState<string>("");
    const [placeholder, setPlaceholder] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const currentWord = placeholders[currentWordIndex];
        const typingDelay = 30;
        const deletionDelay = 20;
        const pauseDelay = 1400;

        const timer = setTimeout(
            () => {
                if (!isDeleting && !isPaused && placeholder !== currentWord) {
                    setPlaceholder(currentWord.slice(0, placeholder.length + 1));
                } else if (isDeleting && !isPaused && placeholder !== "") {
                    setPlaceholder(placeholder.slice(0, -1));
                } else if (placeholder === currentWord && !isPaused) {
                    setIsPaused(true);
                    setTimeout(() => {
                        setIsPaused(false);
                        setIsDeleting(true);
                    }, pauseDelay);
                } else if (placeholder === "" && isDeleting) {
                    setIsDeleting(false);
                    setCurrentWordIndex(prevIndex => (prevIndex + 1) % placeholders.length);
                }
            },
            isDeleting ? deletionDelay : typingDelay,
        );

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [placeholder, currentWordIndex, isDeleting, isPaused, placeholders]);

    useEffect(() => {
        setCurrentWordIndex(Math.floor(Math.random() * (placeholders.length - 1)));
    }, []);

    return (
        <div className="searchbar">
            <FaMagnifyingGlass />
            <input
                placeholder={placeholder}
                onChange={e => setSearch(e.target.value)}
                className="w-full max-w-[800px] text-tealtext block px-3 py-2 border-[1px] border-teal bg-tealbox text-3xl mt-7 rounded-md placeholder:opacity-50 placeholder:text-tealtext"
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        router.push(`/search?q=${encodeURIComponent(search)}`);
                    }
                }}
            />
        </div>
    );
}
