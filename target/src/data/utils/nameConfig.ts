import React from "react";

export const getNameInitials = (fullName: string) => {
  const name = fullName.split(" ");
  const firstName = name[0];
  const lastName = name[name.length - 1];
  if(name.length > 1){
    return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
  }else{
    return `${firstName[0].toUpperCase()}`;
  }
};

export const getNameUpperCase = (fullName: string) => {
  let editName = '';
  fullName
    .split(' ')
    .map((word) => {
      if(word !== 'de' && word !== 'da' && word !== 'do' &&  word !== 'das' && word !== 'dos'){
        word = word[0].toUpperCase() + word.slice(1).toLowerCase();
        editName += word + ' '
      }else{
        editName += word + ' '
      }
    })    
  return editName
}

