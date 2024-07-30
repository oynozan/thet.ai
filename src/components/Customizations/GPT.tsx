export default function GPTCustomization({
    customization,
    setCustomization,
}: {
    customization: any;
    setCustomization: any;
}) {
    return (
        <>
            <p>
                Max Tokens: <span>{customization["GPT"][0]}</span>
            </p>
            <input
                type="range"
                id="gpt_range_id_0"
                min="1"
                max="4000"
                step="1"
                aria-label="range slider for Max Tokens"
                value={customization["GPT"][0]}
                onChange={e => {
                    const c: any = { ...customization };
                    c["GPT"][0] = parseFloat(e.target.value);
                    setCustomization(c);
                }}
            />

            <p>
                Temperature: <span>{customization["GPT"][1]}</span>
            </p>
            <input
                type="range"
                id="gpt_range_id_1"
                min="0"
                max="1"
                step="0.001"
                aria-label="range slider for Temperature"
                value={customization["GPT"][1]}
                onChange={e => {
                    const c: any = { ...customization };
                    c["GPT"][1] = parseFloat(e.target.value);
                    setCustomization(c);
                }}
            />

            <p>
                Top P: <span>{customization["GPT"][2]}</span>
            </p>
            <input
                type="range"
                id="gpt_range_id_2"
                min="0"
                max="1"
                step="0.001"
                aria-label="range slider for Top P"
                value={customization["GPT"][2]}
                onChange={e => {
                    const c: any = { ...customization };
                    c["GPT"][2] = parseFloat(e.target.value);
                    setCustomization(c);
                }}
            />

            <p>
                Frequency Penalty: <span>{customization["GPT"][3]}</span>
            </p>
            <input
                type="range"
                id="gpt_range_id_3"
                min="-2"
                max="2"
                step="0.01"
                aria-label="range slider for Frequency Penalty"
                value={customization["GPT"][3]}
                onChange={e => {
                    const c: any = { ...customization };
                    c["GPT"][3] = parseFloat(e.target.value);
                    setCustomization(c);
                }}
            />

            <p>
                Presence Penalty: <span>{customization["GPT"][4]}</span>
            </p>
            <input
                type="range"
                id="gpt_range_id_4"
                min="-2"
                max="2"
                step="0.01"
                aria-label="range slider for Presence Penalty"
                value={customization["GPT"][4]}
                onChange={e => {
                    const c: any = { ...customization };
                    c["GPT"][4] = parseFloat(e.target.value);
                    setCustomization(c);
                }}
            />
        </>
    );
}
