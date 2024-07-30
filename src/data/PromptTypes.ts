interface IPrompts {
    types: {
        [value: string]: string;
    };
}

export const GPTModels = ["gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo-0125"] as const;

const prompts: IPrompts = {
    types: {
        "Stable Diffusion XL Turbo": "Text to image",
        // "Stable Diffusion Video": "Text to video",
    },
};

for (let model of GPTModels) {
    prompts["types"][model] = "Chat Completion";
}

type GPTModelType = (typeof GPTModels)[number];
type PromptsKeysType = keyof typeof prompts.types;

export const PromptTypes = prompts;
export type TPromptType = GPTModelType | PromptsKeysType;
