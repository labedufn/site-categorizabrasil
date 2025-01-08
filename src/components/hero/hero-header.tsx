import { DecorativePattern } from "../ui/decorative-pattern";

export const HeroHeader = () => (
  <div className="max-w-xl mb-10 md:mx-auto md:text-center md:mb-12">
    <h2 className="max-w-lg mb-6 font-bold text-2xl tracking-tight text-secondary-500 sm:text-4xl md:mx-auto">
      <span className="relative inline-block">
        <DecorativePattern />
        <span className="relative">Categorização dos</span>
      </span>{" "}
      <span className="text-primary-500 whitespace-nowrap">Serviços de Alimentação</span>
    </h2>
    <p className="text-base text-gray-600 md:text-lg md:max-w-screen-sm">
      Elevando o padrão dos serviços alimentares através da inovação, pesquisa e compromisso com a excelência em
      qualidade.
    </p>
  </div>
);
