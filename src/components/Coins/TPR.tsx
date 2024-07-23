import Image from 'next/image';

export default function TPR({
    size = 20
} : {
    size?: number
}) {
    return (
        <Image
            src="/tpr.png"
            alt="TPR"
            height={size}
            width={size}
            quality={100}
        />
    )
}