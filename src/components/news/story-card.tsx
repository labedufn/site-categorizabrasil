import Image from "next/image";

interface StoryCardProps {
  src: string;
  title: string;
  date: string;
}

export function StoryCard({ src, title, date }: StoryCardProps) {
  return (
    <div className="shadow-md">
      <div className="relative w-full h-80">
        <Image src={src} alt={title} fill className="object-cover rounded-t-3xl" priority />
      </div>
      <div className="p-8 bg-white rounded-b-3xl">
        <p className="text-gray-500 mb-2">{date}</p>
        <h3 className="text-3xl font-bold text-primary">{title}</h3>
      </div>
    </div>
  );
}
