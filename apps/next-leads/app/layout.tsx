import "./globals.css";

import React from "react";

import { Footer } from "@/components/Footer";
import SiteHeader from "@/components/header/SiteHeader";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Désamiantage – Devis & Intervention certifiée",
  description: "Comparez 3 devis d’entreprises certifiées Qualibat 1552.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SiteHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
