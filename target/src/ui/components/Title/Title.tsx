import React from "react";
import { TitleContainer, TitleStyled, SubtitleStyled } from "./Title.style";

interface TitleProps {
  title: string;
  subtitle?: string | JSX.Element;
  style?: any;
}

const Title: React.FC<TitleProps> = (props) => {
  return (
    <TitleContainer style={props.style}>
      <TitleStyled>{props.title}</TitleStyled>
      <SubtitleStyled>{props.subtitle}</SubtitleStyled>
    </TitleContainer>
  );
};

export default Title;
