import React from "react";
import { TitleContainer, TitleStyled, SubtitleStyled } from "./Title.style";

interface TitleProps {
  title: string;
  subtitle?: string | JSX.Element;
}

const Title: React.FC<TitleProps> = (props) => {
  return (
    <TitleContainer>
      <TitleStyled>{props.title}</TitleStyled>
      <SubtitleStyled>{props.subtitle}</SubtitleStyled>
    </TitleContainer>
  );
};

export default Title;
