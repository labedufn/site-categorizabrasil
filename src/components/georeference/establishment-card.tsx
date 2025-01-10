"use client";

import Image from "next/image";
import Link from "next/link";

interface EstablishmentCardProps {
  name: string;
  address: string;
  phone: string;
  website: string;
  imageUrl?: string;
  categoryIconUrl: string;
}

export function EstablishmentCard({
  name,
  address,
  phone,
  website,
  imageUrl,
  categoryIconUrl,
}: EstablishmentCardProps) {
  return (
    <div className="bg-white shadow-sm border rounded-2xl p-4 h-full">
      <div className="flex items-center gap-4 mb-4">
        {imageUrl && (
          <div className="w-20 h-20 relative rounded-xl overflow-hidden">
            <Image src={imageUrl} alt={`Imagem do estabelecimento ${name}`} fill className="object-cover" />
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold text-primary mb-1">{name}</h2>
          <p className="text-sm font-semibold text-gray-600 inline-flex items-center gap-1">
            Categoria
            <Image src={categoryIconUrl} alt={"Ícone da categoria"} width={20} height={20} />
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-4">
        <div>
          <p className="text-sm mb-1 text-gray-500">Endereço</p>
          <p className="text-sm font-semibold text-primary">{address}</p>
        </div>
        <div>
          <p className="text-sm mb-1 text-gray-500">Contato</p>
          <p className="text-sm font-semibold text-primary">{phone}</p>
        </div>
        <div>
          <p className="text-sm mb-1 text-gray-500">Site</p>
          <p className="text-sm font-semibold text-primary">
            <Link href={website} target="_blank" rel="noopener noreferrer">
              {website.replace(/^https?:\/\//, "")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
