export const GPTModels = ["gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo-0125"] as const;

const prompts: any = {
    types: {
        "Stable Diffusion XL Turbo": "Text to image",
        // "Stable Diffusion Video": "Text to video",
    },
};

for (let model of GPTModels) {
    prompts["types"][model] = "Chat Completion";
}

export const PromptTypes = prompts;