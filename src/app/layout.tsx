import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import "../styles/globals.css";
import { CookieConsent } from "@/components/cookie-consent";
import { QueryProvider } from "@/providers/query-provider";

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
      <body className={montserrat.className}>
        <QueryProvider>{children}</QueryProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
