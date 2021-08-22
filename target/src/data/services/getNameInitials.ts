import React from "react";

export const getNameInitials = (fullName) => {
  const name = fullName.split(" ");
  const firstName = name[0];
  const lastName = name[name.length - 1];

  return `${firstName[0]}${lastName[0]}`;
};
