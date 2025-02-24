import { ImageHeader } from "@/components/ui/image-header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { DocumentsSection } from "@/components/documents/documents-section";
import { getDocumentsPageAction } from "./actions";
import { LayoutGeneral } from "@/components/layouts/layout-general";
import { LayoutInterno } from "@/components/layouts/layout-interno";

export const revalidate = 20;

export const metadata: Metadata = {
  title: "Categoriza Brasil - Documentos Úteis",
  description: "Documentos úteis para aprimorar o conhecimento sobre a categorização.",
};

export default async function Documentos() {
  const documentsPageData = await getDocumentsPageAction();
  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Publicações", href: "#" },
    { label: "Documentos Úteis" },
  ];

  const documentsItems = documentsPageData.map((documents) => ({
    title: documents.title,
    url: documents.url,
    date: documents.date,
  }));
  return (
    <>
      <LayoutGeneral>
        <LayoutInterno>
          <ImageHeader
            src="/background_documents.webp"
            title="Documentos Úteis"
            subtitle="Documentos úteis para aprimorar o conhecimento sobre a categorização."
          />
          <DocumentsSection breadcrumbItems={breadcrumbItems} initialDocumentsItems={documentsItems} />
        </LayoutInterno>
      </LayoutGeneral>
    </>
  );
}
