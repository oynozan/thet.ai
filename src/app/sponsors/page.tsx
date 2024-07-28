import Image from "next/image";

import "./sponsors.scss";
import Link from "next/link";

export default function Sponsors() {
    return (
        <div id="sponsors">
            <h1>Sponsors</h1>
            <p>
                We thank to our sponsors that helped <Link href="/">thet.ai</Link> reach important goals and
                make great progress on Web3 and AI.
            </p>

            <div className="list">
                <div className="sponsor">
                    <div className="logo">
                        <Image src="/logos/edgecloud.svg" alt="Theta Edgecloud" height={20} width={220} />
                    </div>
                    <div className="text">
                        <p>
                            <b>Theta EdgeCloud</b> is a Cloud-Edge Computing Platform for AI, Video,
                            Rendering, Gaming and more.
                        </p>
                        <p>They issued a coupon for thet.ai to help us and try out their Cloud service.</p>
                        <p>Our users can test their prompt outputs thanks to EdgeCloud</p>
                    </div>
                </div>

                <div className="sponsor">
                    <div className="logo">
                        <Image src="/logos/webest.svg" alt="webest" height={70} width={175} />
                    </div>
                    <div className="text">
                        <p>
                            <b>webest</b> is an AI project that generates custom or Wordpress-based autoblogs.
                        </p>
                        <p>They want to publish our project at their blog when it&apos;s out</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
