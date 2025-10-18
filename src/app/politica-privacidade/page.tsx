import { ImageHeader } from "@/components/ui/image-header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { LayoutDefault } from "@/components/layouts/layout-default";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { LayoutGeneral } from "@/components/layouts/layout-general";
import { LayoutInterno } from "@/components/layouts/layout-interno";

export const metadata: Metadata = {
  title: "Categoriza Brasil - Política de Privacidade",
  description: "Política de Privacidade e informações aos usuários.",
};

export default async function PoliticaPrivacidade() {
  return (
    <>
      <LayoutGeneral>
        <LayoutInterno>
          <ImageHeader
            src="/images/backgrounds/privacity.webp"
            title="Política de Privacidade"
            subtitle="Política de Privacidade e informações aos usuários"
          />
          <LayoutDefault className="mx-auto mb-16 md:mb-24">
            <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Política de Privacidade" }]} />
            <div className="p-6 text-gray-600">
              <h1 className="text-3xl font-bold mb-6">
                Política de Privacidade da Categorização dos Serviços de Alimentação
              </h1>
              <p className="mb-4">
                Esta Política de Privacidade tem como objetivo demonstrar nosso compromisso com a proteção e a
                transparência no tratamento das informações coletadas dos usuários do site da Categorização dos Serviços
                de Alimentação. Ao acessar e utilizar este site, você concorda com as práticas aqui descritas.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Informações Coletadas</h2>
              <h3 className="text-xl font-medium mt-4 mb-2">Dados Fornecidos Voluntariamente:</h3>
              <p className="mb-4">
                Durante a navegação e utilização de nossos serviços, você poderá fornecer informações pessoais, tais
                como nome, endereço de e-mail, telefone e outros dados que julgar necessários para a prestação dos
                serviços oferecidos.
              </p>
              <h3 className="text-xl font-medium mt-4 mb-2">Dados Coletados Automaticamente:</h3>
              <p className="mb-4">
                Nosso site pode coletar, de forma automática, informações como endereço de IP, tipo de navegador,
                páginas visitadas, tempo de acesso e dados de cookies, entre outros, que nos auxiliam a melhorar a sua
                experiência de uso e a qualidade dos nossos serviços.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Uso das Informações</h2>
              <p className="mb-4">As informações coletadas são utilizadas para:</p>
              <ul className="list-disc ml-5 mb-4">
                <li className="mb-2">
                  <span className="font-bold">Personalização da Experiência:</span> Adequar o conteúdo e as
                  funcionalidades do site conforme o perfil e as preferências do usuário.
                </li>
                <li className="mb-2">
                  <span className="font-bold">Comunicação:</span> Entrar em contato com você para envio de informações,
                  novidades, atualizações e outras comunicações relacionadas aos nossos serviços, quando autorizado.
                </li>
                <li className="mb-2">
                  <span className="font-bold">Aprimoramento de Serviços:</span> Realizar análises internas para melhoria
                  contínua do site e dos serviços oferecidos.
                </li>
                <li className="mb-2">
                  <span className="font-bold">Cumprimento de Obrigações Legais:</span> Atender a requisitos legais e
                  regulatórios aplicáveis à nossa atividade.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Compartilhamento de Informações</h2>
              <p className="mb-4">
                Seus dados pessoais não serão compartilhados com terceiros sem o seu consentimento, exceto nos casos em
                que:
              </p>
              <ul className="list-disc ml-5 mb-4">
                <li className="mb-2">
                  <span className="font-bold">Obrigação Legal:</span> Haja exigência legal ou ordem judicial que
                  determine o compartilhamento das informações.
                </li>
                <li className="mb-2">
                  <span className="font-bold">Prestadores de Serviço:</span> Seja necessário repassar dados para
                  parceiros ou prestadores de serviços que atuem em nosso nome, garantindo que estes adotem medidas de
                  segurança compatíveis e se comprometam a manter o sigilo dos dados.
                </li>
                <li className="mb-2">
                  <span className="font-bold">Proteção de Direitos:</span> Seja indispensável para proteger direitos,
                  segurança ou propriedade do site, de nossos usuários ou de terceiros.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Segurança das Informações</h2>
              <p className="mb-4">
                Adotamos medidas técnicas e administrativas adequadas para proteger suas informações pessoais contra
                acesso não autorizado, alteração, divulgação ou destruição. Embora empreguemos os mais elevados padrões
                de segurança, ressaltamos que nenhum sistema é completamente infalível, e não podemos garantir a
                segurança absoluta dos dados transmitidos pela internet.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Cookies e Tecnologias Similares</h2>
              <p className="mb-4">Utilizamos cookies e outras tecnologias semelhantes para:</p>
              <ul className="list-disc ml-5 mb-4">
                <li className="mb-2">
                  <span className="font-bold">Melhorar a Navegação:</span> Registrar preferências e otimizar a
                  experiência do usuário.
                </li>
                <li className="mb-2">
                  <span className="font-bold">Análise e Desempenho:</span> Coletar dados sobre o uso do site, permitindo
                  a análise e o aprimoramento dos serviços prestados.
                </li>
              </ul>
              <p className="mb-4">
                Você pode, a qualquer momento, gerenciar ou desativar os cookies por meio das configurações do seu
                navegador, lembrando que essa ação poderá afetar a funcionalidade e a personalização dos nossos
                serviços.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Alterações nesta Política de Privacidade</h2>
              <p className="mb-4">
                Esta Política de Privacidade poderá ser atualizada periodicamente para refletir mudanças em nossas
                práticas ou em normas legais aplicáveis. Recomendamos a revisão regular deste documento. As alterações
                passarão a vigorar na data de sua publicação no site.
              </p>
            </div>
          </LayoutDefault>
        </LayoutInterno>
      </LayoutGeneral>
    </>
  );
}
