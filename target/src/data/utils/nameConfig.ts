//RETORNA A INICIAL DO PRIMEIRO E DO ULTIMO NOME
export const getNameInitials = (fullName: string = "sem nome") => {
  if (!fullName) {
    return "N";
  }
  const name = fullName.split(" ");
  const firstName = name[0];
  const lastName = name[name.length - 1];
  if (name.length > 1) {
    return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
  } else {
    return `${firstName[0].toUpperCase()}`;
  }
};

//FUNÇÃO ALTERA O NOME PARA LOWERCASE E A PRIMEIRA LETRA DE CADA NOME PARA UPPERCASE SE N FOR  DE DA DO DAS DOS
export const getNameUpperCase = (fullName: string = "sem nome") => {
  if (!fullName) {
    return "Não informado";
  }
  let editName = "";
  fullName.split(" ").map((name) => {
    if (
      name !== "de" &&
      name !== "da" &&
      name !== "do" &&
      name !== "das" &&
      name !== "dos"
    ) {
      name = name[0].toUpperCase() + name.slice(1).toLowerCase();
      editName += name + " ";
    } else {
      editName += name + " ";
    }
  });
  return editName;
};
