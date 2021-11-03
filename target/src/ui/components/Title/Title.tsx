import React from "react";
import { TitleContainer, TitleStyled, SubtitleStyled } from "./Title.style";

interface TitleProps {
  title: string;
  subtitle?: string | JSX.Element;
  style?: any;
  subtitleColor?: string;
}

const Title: React.FC<TitleProps> = (props) => {
  return (
    <TitleContainer>
      <TitleStyled style={props.style}>{props.title}</TitleStyled>
      <SubtitleStyled style={{ color: props.subtitleColor }}>
        {props.subtitle}
      </SubtitleStyled>
    </TitleContainer>
  );
};

export default Title;
