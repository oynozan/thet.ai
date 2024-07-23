import Image from "next/image";

export default function Loader() {
    return <Image src="/logo-dark.png" alt="thet.ai Logo" height={100} width={100} className="loader" />;
}
