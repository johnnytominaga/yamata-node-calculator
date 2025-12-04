import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Yamata Node Calculator",
    description: "Calculate projected rewards from Yamata Node validators",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
            <body className="antialiased bg-[#2E2C2C] text-[#EFEFEF] font-sans">
                {children}
            </body>
        </html>
    );
}
