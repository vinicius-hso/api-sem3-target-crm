export async function getCepService(cep: string) {
  const formatCep = cep.replace(/[^0-9]/g, "");
  let address = {};
  const options: any = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };
  await fetch(`https://viacep.com.br/ws/${formatCep}/json/`, options)
    .then((response) => response.json().then((data) => (address = data)))
    .catch((err) => (address = err.message));
  return address;
}
