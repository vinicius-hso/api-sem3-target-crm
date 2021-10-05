import { Container, Toolbar } from "@material-ui/core";
import { getNameInitials, getNameUpperCase } from "data/utils/nameConfig";
import React from "react";
import {
  UserPictureStyled,
  UserCardContainer,
  UserNameStyled,
  UserEmailStyled,
  UserRoleStyled,
} from "./UserCard.style";

//@deprecated
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
      <UserRoleStyled>{props.role}</UserRoleStyled>
      <UserEmailStyled>{props.email}</UserEmailStyled>
    </UserCardContainer>
  );
};
export default UserCard;