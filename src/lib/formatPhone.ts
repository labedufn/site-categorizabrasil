export function formatPhone(numero: string): string {
  const onlyNumbers = numero.replace(/\D/g, "");
  const formatedPhone = onlyNumbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

  return formatedPhone;
}
