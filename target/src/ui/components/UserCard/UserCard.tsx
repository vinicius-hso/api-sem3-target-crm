import React from "react";
import { getNameInitials, getNameUpperCase } from "data/utils/nameConfig";
import {
  UserPictureStyled,
  UserCardContainer,
  UserNameStyled,
  UserEmailStyled,
  UserRoleStyled,
} from "./UserCard.style";

interface UserCardProps {
  picture?: string;
  name?: string;
  role?: string;
  email?: string;
  onClick: any;
}

const UserCard: React.FC<UserCardProps> = (props) => {
  return (
    <UserCardContainer onClick={props.onClick}>
      <UserPictureStyled src={props.picture}>
        {getNameInitials(props.name)}
      </UserPictureStyled>
      <UserNameStyled>{getNameUpperCase(props.name)}</UserNameStyled>
      <UserRoleStyled>
        {props.role === "ADMIN" ? "Administrador" : "Vendedor"}
      </UserRoleStyled>
      <UserEmailStyled>{props.email}</UserEmailStyled>
    </UserCardContainer>
  );
};
export default UserCard;
