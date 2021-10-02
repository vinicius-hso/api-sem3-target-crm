import React from "react";

export async function getCepService(cep: string) {
  /*   let teste = "12458,77";
  const t = teste.substring(0, teste.length - 3);
  console.log(t);
 */
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
