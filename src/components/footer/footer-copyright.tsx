import Link from "next/link";
import Image from "next/image";

interface FooterCopyrightProps {
  companyName: string;
}

export const FooterCopyright = ({ companyName }: FooterCopyrightProps) => (
  <div className="flex justify-normal flex-col items-start md:items-center gap-4 md:justify-between md:flex-row">
    <p className="text-xs text-white">
      &copy; {new Date().getFullYear()} <span className="font-bold">{companyName}</span>
    </p>
    <Link href="https://www.labed.com.br" passHref target="blank">
      <Image
        src="/logo_labed.svg"
        alt="Logo LABED"
        width={80}
        height={40}
        className="self-center"
        unoptimized
        priority
      />
    </Link>
  </div>
);
