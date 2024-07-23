"use client";

import { Editor } from "@monaco-editor/react";
import { useState } from "react";

export default function EditorWrapper({ defaultValue }: { defaultValue: string }) {
    const [value, setValue] = useState(defaultValue);

    return (
        <div className="editor-wrapper">
            <Editor
                value={value}
                theme="vs-dark"
                onChange={e => {
                    if (e) setValue(e);
                }}
            />
        </div>
    );
}
