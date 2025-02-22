import { getHomePageAction } from "@/app/(main)/actions";
import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navigation/navbar";

interface LayoutGeneralProps {
  children: React.ReactNode;
  className?: string;
}

export async function LayoutGeneral({ children, className = "" }: LayoutGeneralProps) {
  const homePageData = await getHomePageAction();
  return (
    <>
      <Navbar
        instagram={homePageData.instagram}
        whatsapp={homePageData.whatsapp}
        youtubeChannel={homePageData.youtubeChannel}
      />
      <div className={className}>{children}</div>
      <Footer
        instagram={homePageData.instagram}
        whatsapp={homePageData.whatsapp}
        youtubeChannel={homePageData.youtubeChannel}
      />
    </>
  );
}
