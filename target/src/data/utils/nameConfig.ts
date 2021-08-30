import React from "react";

export const getNameInitials = (fullName: string) => {
  const name = fullName.split(" ");
  const firstName = name[0];
  const lastName = name[name.length - 1];
  if (name.length > 1) {
    return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
  } else {
    return `${firstName[0].toUpperCase()}`;
  }
};

export const getNameUpperCase = (fullName: string) => {
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
