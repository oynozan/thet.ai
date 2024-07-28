"use server";

import { client } from "@gradio/client";

export default async function SDXLTurbo(prompt: string, customization: Array<number>) {
    const app = await client(process.env.SDXLTURBO_ENDPOINT!);
    const result: any = await app.predict("/predict", [prompt, ...customization]);

    console.log("Preview generated:", result.data);
    return process.env.SDXLTURBO_ENDPOINT + "file=" + result.data[0].path;
}
