import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import "../styles/globals.css";
import { CookieConsent } from "@/components/cookie-consent";
import { Navbar } from "@/components/navigation/navbar";
import { getHomePageAction } from "./(main)/actions";
import { Footer } from "@/components/footer/footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Categoriza Brasil - Categorização dos Serviços de Alimentação",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const homePageData = await getHomePageAction();
  return (
    <html lang="pt-BR">
      <body className={montserrat.className}>
        <Navbar
          instagram={homePageData.instagram}
          whatsapp={homePageData.whatsapp}
          youtubeChannel={homePageData.youtubeChannel}
        />
        {children}
        <Footer
          instagram={homePageData.instagram}
          whatsapp={homePageData.whatsapp}
          youtubeChannel={homePageData.youtubeChannel}
        />
      </body>
      <CookieConsent />
    </html>
  );
}
