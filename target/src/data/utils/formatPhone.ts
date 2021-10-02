export function formatPhone(phone) {
  if (phone) {
    phone = phone.toString();
    phone = phone.replace(/[^*\d]/g, ""); // Remove tudo o que não é dígito exceto o asterisco
    phone = phone.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses em volta dos dois primeiros dígitos
    phone = phone.replace(/(\d)(\d{4})$/, "$1-$2"); // Coloca hífen entre o quarto e o quinto dígitos
  }
  return phone;
}
