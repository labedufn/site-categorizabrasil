interface HeaderTitleProps {
  topText?: string;
  mainTitle?: string;
  topTextColor?: string;
  mainTitleColor?: string;
  className?: string;
}

export function HeaderTitle({
  topText = "Título da",
  mainTitle = "Página",
  topTextColor = "text-gray-600",
  mainTitleColor = "text-primary",
  className = "",
}: HeaderTitleProps) {
  return (
    <div className={`text-center ${className}`}>
      <p className={`text-sm md:text-base mb-1 ${topTextColor}`}>{topText}</p>
      <h1 className={`text-3xl md:text-4xl font-bold ${mainTitleColor}`}>{mainTitle}</h1>
    </div>
  );
}
