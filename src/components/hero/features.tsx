import { LayoutDefault } from "@/layouts/layout-default";
import { Icon } from "../ui/icons";
import { FeatureCard, FeatureCardProps } from "./feature-card";

export const Features = () => {
  const features: FeatureCardProps[] = [
    {
      icon: <Icon.explicacao size={42} />,
      title: "O que é a categorização?",
      description: "É uma proposta que visa classificar os serviços de alimentação com base na legislação sanitária.",
      theme: {
        background: "bg-white",
        icon: "text-primary-500",
        title: "text-primary-500",
        text: "text-primary-500",
      },
    },
    {
      icon: <Icon.objetivo size={42} />,
      title: "Qual o objetivo?",
      description: "Melhorar o perfil sanitário dos estabelecimentos comerciais.",
      theme: {
        background: "bg-secondary-500",
        icon: "text-secondary-900",
        title: "text-secondary-900",
        text: "text-secondary-900",
      },
    },
    {
      icon: <Icon.quemPode size={42} />,
      title: "Quem pode categorizar?",
      description: "Restaurantes; bares; lanchonetes e similares.",
      theme: {
        background: "bg-primary-500",
        icon: "text-white",
        title: "text-white",
        text: "text-white",
      },
    },
  ];

  return (
    <LayoutDefault className="mx-auto">
      <div className="grid overflow-hidden rounded-2xl shadow md:grid-cols-3 max-w-screen-xl h-auto">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </LayoutDefault>
  );
};
