import { cn } from "@/lib/utils";
import { BadgeCheck, ChartColumn, NotepadText, SlidersHorizontal } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Avaliações Simplificadas",
      description:
        " Realize avaliações completas de estabelecimentos através de um formulário intuitivo que automaticamente calcula pontuações e classifica os locais com base nos critérios da vigilância sanitária.",
      icon: <BadgeCheck />,
    },
    {
      title: "Relatórios Detalhados",
      description:
        "Acesse relatórios completos com todas as respostas do formulário, pontuações por área, resultado total e classificação final do estabelecimento, permitindo análise aprofundada das avaliações.",
      icon: <NotepadText />,
    },
    {
      title: "Controle Total",
      description:
        "Gerencie usuários e estabelecimentos em uma única plataforma, mantendo todos os dados organizados e acessíveis quando você precisar.",
      icon: <SlidersHorizontal />,
    },
    {
      title: "Relatórios Completos",
      description:
        "Visualize relatórios detalhados com todas as respostas, pontuações por área e classificação final do estabelecimento, permitindo uma análise precisa das avaliações.",
      icon: <ChartColumn />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 relative z-10">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature",
        (index === 0 || index === 2) && "lg:border-l",
        index < 2 && "lg:border-b",
      )}
    >
      {index < 2 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-gray-100 to-transparent pointer-events-none" />
      )}
      {index >= 2 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-gray-100 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-secondary">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-300 group-hover/feature:bg-secondary-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-primary">
          {title}
        </span>
      </div>
      <p className="text-sm text-gray-600 relative z-10 px-10">{description}</p>
    </div>
  );
};
