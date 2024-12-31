import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import "../styles/globals.css";
import { CookieConsent } from "@/components/cookie-consent";
import Head from "next/head";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Categoriza Brasil - Categorização dos Serviços de Alimentação",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <Head>
        <link rel="preconnect" href="https://painel.categorizabrasil.com.br" crossOrigin="anonymous" />
      </Head>

      <body className={montserrat.className}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
