"use client";

import { useRef } from "react";

import { useOutsideClick } from "../../hooks/useOutsideClick";

import "./selection.scss";

function Item({
    item,
    set,
    click,
}: {
    item: string;
    set: React.Dispatch<React.SetStateAction<boolean>>;
    click: (e: any) => void;
}) {
    return (
        <div
            className="item"
            onClick={(e: any) => {
                click(e);
                set(false);
            }}
        >
            {item}
        </div>
    );
}

export default function Selection({
    items,
    click,
    visible,
    setVisible,
    customCSS = {},
    active,
    position = "right",
}: {
    items: Array<string>;
    click: (e: any) => void;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    customCSS?: any;
    active?: string;
    position?: "left" | "right";
}) {
    const wrapperRef = useRef(null);

    useOutsideClick(wrapperRef, () => setVisible(false));

    if (!visible) return <></>;
    return (
        <div className={"selection " + position} ref={wrapperRef} style={customCSS?.["main"]}>
            <div className="body" style={customCSS?.["body"]}>
                {items.map((item, i) => {
                    if (active && active === item) return <></>;
                    return <Item key={i} item={item} set={setVisible} click={click} />;
                })}

                {!items.length && <span id="empty">No data found</span>}
            </div>
        </div>
    );
}
