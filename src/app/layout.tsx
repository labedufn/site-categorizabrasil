import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import { CookieConsent } from "@/components/cookie-consent";
import NextTopLoader from "nextjs-toploader";
import "../styles/globals.css";
import "react-photo-view/dist/react-photo-view.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { RecaptchaProvider } from "@/components/recaptcha/recaptcha-provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Categoriza Brasil - Categorização dos Serviços de Alimentação",
  description: "Site categorização dos serviços de alimentação no Brasil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <html lang="pt-BR">
      <body className={`${montserrat.className} bg-white`}>
        {recaptchaSiteKey ? (
          <Script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`} strategy="lazyOnload" />
        ) : null}
        <RecaptchaProvider siteKey={recaptchaSiteKey}>
          <NextTopLoader color="#003963" height={4} showSpinner={false} easing="ease" speed={500} />
          {children}
          <CookieConsent />
          <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        </RecaptchaProvider>
      </body>
    </html>
  );
}
