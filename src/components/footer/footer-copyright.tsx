"use client";

interface FooterCopyrightProps {
  companyName: string;
}

export const FooterCopyright = ({ companyName }: FooterCopyrightProps) => (
  <div className="flex justify-normal flex-col gap-4 md:justify-between md:flex-row">
    <p className="text-xs text-white">
      &copy; {new Date().getFullYear()} <span className="font-bold">{companyName}</span>
    </p>
  </div>
);
