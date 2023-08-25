import React from "react";
import Navbar from "./components/Navbar/Navbar";

export default function MenuLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <Navbar />

            {children}
        </section>
    )
}