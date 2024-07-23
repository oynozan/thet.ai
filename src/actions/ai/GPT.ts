"use server";

import { openai } from "@/lib/openai";
import type { GPTModels } from "@/data/PromptTypes";

export default async function GPT(
    prompt: string,
    model: typeof GPTModels[number],
    customization: {
        max_tokens: number;
        temperature: number;
        top_p: number;
        frequency_penalty: number;
        presence_penalty: number;
    },
) {
    // TODO: zod implementation
    try {
        const res = await openai.chat.completions.create({
            model,
            messages: JSON.parse(prompt),
            max_tokens: customization.max_tokens,
            temperature: customization.temperature,
            top_p: customization.top_p,
            frequency_penalty: customization.frequency_penalty,
            presence_penalty: customization.presence_penalty,
        });

        console.log("Preview generated:", res.choices[0].message);
        return res.choices[0].message;
    } catch (e) {
        console.error(e);
        return null
    }
}
