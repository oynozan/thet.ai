"use client";

import { Editor } from "@monaco-editor/react";
import { useState } from "react";

export const MonacoOptions = {
    wordWrap: "on",
    wrappingStrategy: "advanced",
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    padding: {
        top: 16,
        bottom: 16,
    },
} as const;

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
                options={MonacoOptions}
            />
        </div>
    );
}
