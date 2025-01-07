import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import { CookieConsent } from "@/components/cookie-consent";
import NextTopLoader from "nextjs-toploader";
import "../styles/globals.css";
import "react-photo-view/dist/react-photo-view.css";

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
        <NextTopLoader color="#003963" height={4} showSpinner={false} easing="ease" speed={500} />
        {children}
      </body>
      <CookieConsent />
    </html>
  );
}
