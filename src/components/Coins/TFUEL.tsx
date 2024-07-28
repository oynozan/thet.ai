import Image from "next/image";

export default function TFUEL({ size = 20 }: { size?: number }) {
    return <Image src="/tfuel.svg" alt="TFUEL" height={size} width={size} />;
}
