import { Button } from "@/components/ui/button-custom";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Página não encontrada!</p>

        <p className="mt-4 text-gray-500">Está página pode não existir.</p>

        <Link href="/">
          <Button className="mt-8">Voltar para a página inicial</Button>
        </Link>
      </div>
    </div>
  );
}
