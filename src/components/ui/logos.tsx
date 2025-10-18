import Image from "next/image";
import { ComponentProps } from "react";

type LogoImageProps = Omit<ComponentProps<typeof Image>, "src" | "alt">;

const BASE_DIMENSIONS = {
  width: 3495,
  height: 2340,
};

export const Logo = {
  default: (props: LogoImageProps) => (
    <Image src="/images/logos/logo_categoriza.png" alt="Logo Categoriza Brasil" {...BASE_DIMENSIONS} {...props} />
  ),
  white: (props: LogoImageProps) => (
    <Image
      src="/images/logos/logo_categoriza_branco.png"
      alt="Logo Categoriza Brasil"
      {...BASE_DIMENSIONS}
      {...props}
    />
  ),
};
