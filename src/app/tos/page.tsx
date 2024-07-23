import Link from "next/link";

import './tos.scss';

export default function ToS() {
    return (
        <div id="tos">
            <h1>Terms of Service</h1>
            <p>
                Effective Date: <b>21.07.2024</b>
            </p>

            <p>
                Welcome to <Link href="/">thet.ai</Link>, AI prompt market built on the THETA
                network. By accessing or using our website and services, you agree to be bound by
                these Terms of Service. Please read them carefully.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
                By accessing or using thet.ai, you agree to comply with and be bound by these Terms
                of Service and all applicable laws and regulations. If you do not agree to these
                terms, you should not use our services.
            </p>

            <h2>2. Eligibility</h2>
            <p>
                You must be at least 18 years old to use our services. By using thet.ai, you
                represent and warrant that you are at least 18 years old.
            </p>

            <h2>3. Account Registration</h2>
            <p>
                Users sign up by connecting their wallet address. No other personal information is
                required. You are responsible for maintaining the confidentiality of your wallet and
                any activity that occurs under your wallet address.
            </p>

            <h2>4. Fees and Payments</h2>
            <p>
                To post prompt selling posts, users are required to pay a small fee in TFUEL, the
                currency of the THETA network. All fees are non-refundable.
            </p>

            <h2>5. Use of Cookies</h2>
            <p>
                We only use necessary cookies to ensure the proper functioning of the site. We do
                not collect personal data through these cookies.
            </p>

            <h2>6. Prohibited Activities</h2>
            <p>
                You agree not to use thet.ai for any unlawful purpose or in any way that could harm,
                disable, overburden, or impair the site. Prohibited activities include, but are not
                limited to:
            </p>

            <ul>
                <li>
                    Posting or transmitting any content that is illegal, fraudulent, or violates the
                    rights of others.
                </li>
                <li>Using the site to distribute spam or other unsolicited messages.</li>
                <li>
                    Engaging in any activity that interferes with or disrupts the functioning of the
                    site.
                </li>
            </ul>
            <h2>7. Intellectual Property</h2>
            <p>
                All content on thet.ai, including text, graphics, logos, and software, is the
                property of thet.ai or its content suppliers and is protected by intellectual
                property laws. You may not use, reproduce, or distribute any content from our site
                without our express written permission.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
                thet.ai is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We
                make no warranties, express or implied, regarding the availability, reliability, or
                accuracy of the site. To the fullest extent permitted by law, we disclaim all
                warranties, express or implied, including but not limited to implied warranties of
                merchantability and fitness for a particular purpose.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
                We may modify these Terms of Service at any time. Any changes will be effective
                immediately upon posting the revised terms on our site. Your continued use of
                thet.ai after the posting of any changes constitutes your acceptance of those
                changes.
            </p>

            <h2>10. Contact Information</h2>
            <p>
                If you have any questions or concerns about these Terms of Service, please contact
                us at{" "}
                <a href="mailto:contact@thet.ai" className="mail">
                    contact@thet.ai
                </a>
                .
            </p>

            <p>
                By using thet.ai, you acknowledge that you have read, understood, and agree to be
                bound by these Terms of Service.
            </p>
        </div>
    );
}
