import React from "react";
import { TitleContainer, TitleStyle, SubtitleStyle } from "./Title.style";

interface TitleProps {
  title: string;
  subtitle: string | JSX.Element;
}

const Title: React.FC<TitleProps> = (props) => {
  return (
    <TitleContainer>
      <TitleStyle>{props.title}</TitleStyle>
      <SubtitleStyle>{props.subtitle}</SubtitleStyle>
    </TitleContainer>
  );
};

export default Title;
