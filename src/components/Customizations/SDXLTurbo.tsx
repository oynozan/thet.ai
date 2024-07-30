export default function SDXLTurboCustomization({
    customization,
    setCustomization,
}: {
    customization: any;
    setCustomization: any;
}) {
    return (
        <>
            <p>
                Strength: <span>{customization["Stable Diffusion XL Turbo"][0]}</span>
            </p>
            <input
                type="range"
                id="range_id_0"
                min="0"
                max="1"
                step="0.001"
                aria-label="range slider for Strength"
                value={customization["Stable Diffusion XL Turbo"][0]}
                onChange={e => {
                    const c: any = { ...customization };
                    c["Stable Diffusion XL Turbo"][0] = parseFloat(e.target.value);
                    setCustomization(c);
                }}
            />

            <p>
                Guidance: <span>{customization["Stable Diffusion XL Turbo"][1]}</span>
            </p>
            <input
                type="range"
                id="range_id_1"
                min="0"
                max="2"
                step="0.001"
                aria-label="range slider for Guidance"
                value={customization["Stable Diffusion XL Turbo"][1]}
                onChange={e => {
                    const c: any = { ...customization };
                    c["Stable Diffusion XL Turbo"][1] = parseFloat(e.target.value);
                    setCustomization(c);
                }}
            />

            <p>
                Steps: <span>{customization["Stable Diffusion XL Turbo"][2]}</span>
            </p>
            <input
                type="range"
                id="range_id_2"
                min="1"
                max="40"
                step="1"
                aria-label="range slider for Steps"
                value={customization["Stable Diffusion XL Turbo"][2]}
                onChange={e => {
                    const c: any = { ...customization };
                    c["Stable Diffusion XL Turbo"][2] = parseFloat(e.target.value);
                    setCustomization(c);
                }}
            />

            <p>
                Seed: <span>{customization["Stable Diffusion XL Turbo"][3]}</span>
            </p>
            <input
                type="range"
                id="range_id_3"
                min="0"
                max="12013012031030"
                step="1"
                aria-label="range slider for Seed"
                value={customization["Stable Diffusion XL Turbo"][3]}
                onChange={e => {
                    const c: any = { ...customization };
                    c["Stable Diffusion XL Turbo"][3] = parseFloat(e.target.value);
                    setCustomization(c);
                }}
            />
        </>
    );
}
