export function formatCep(cep) {
  if (cep) {
    cep = cep.toString();
    cep = cep.replace(/\D/g, ""); // Remove tudo o que não é dígito
    cep = cep.replace(/(\d)(\d{3})$/, "$1-$2"); // Coloca hífen separando os 2 grupos de dígitos
  }
  return cep;
}
