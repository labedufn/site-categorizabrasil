import Image from "next/image";

export const BackgroundImage = () => (
  <>
    <div className="absolute inset-0 w-full h-full -z-10">
      <Image src="/background_hero.png" alt="Background Hero" className="object-cover object-center" fill priority />
    </div>
    <div
      className="absolute inset-x-0 bottom-0 h-60"
      style={{
        boxShadow: "inset 0 -76px white",
      }}
    />
    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/40 to-white/50 -z-10" />
  </>
);
