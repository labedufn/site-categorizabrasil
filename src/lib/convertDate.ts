export function convertData(data: string): string {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(data)) {
    throw new Error("A data deve estar no formato AAAA-DD-MM.");
  }

  const [ano, dia, mes] = data.split("-");

  return `${dia}/${mes}/${ano}`;
}
