import "./profile.scss";

export default function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div id="profile">{children}</div>;
}
