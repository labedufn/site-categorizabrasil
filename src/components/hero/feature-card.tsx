"use client";

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  theme: {
    background: string;
    icon: string;
    title: string;
    text: string;
  };
}

export function FeatureCard({ icon, title, description, theme }: FeatureCardProps) {
  return (
    <div className={`p-6 flex items-center ${theme.background}`}>
      <div className={`mr-6 ${theme.icon}`}>{icon}</div>
      <div className="flex-1">
        <p className={`font-bold tracking-wide mb-2 ${theme.title}`}>{title}</p>
        <p className={theme.text}>{description}</p>
      </div>
    </div>
  );
}
