export const BackgroundImage = () => (
  <>
    <div className="absolute inset-0 w-full h-full bg-[url('/background_hero.png')] bg-cover bg-center bg-fixed -z-10" />
    <div
      className="absolute inset-x-0 bottom-0 h-60"
      style={{
        boxShadow: "inset 0 -76px white",
      }}
    />
    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/40 to-white/50 -z-10" />
  </>
);
