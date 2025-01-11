interface StoryCardProps {
  src: string;
  title: string;
  date: string;
}

export function StoryCard({ src, title, date }: StoryCardProps) {
  return (
    <div className="shadow-md">
      <div className="relative">
        <img src={src} alt={title} className="object-cover rounded-t-3xl w-full h-96" />
      </div>
      <div className="p-8 bg-white rounded-b-3xl">
        <p className="text-gray-500 mb-2 text-lg">{date}</p>
        <h3 className="text-4xl font-bold text-primary">{title}</h3>
      </div>
    </div>
  );
}
