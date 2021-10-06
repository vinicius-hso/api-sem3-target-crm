import React from "react";
import Link from "next/link";
import { Typography } from "@material-ui/core";

export interface LinkComponentProps {
  href: string;
  text?: string;
  query?: {};
  textColor?: string;
}

const CustomLink: React.FC<LinkComponentProps> = (props) => {
  return (
    <a href="" style={{ textDecoration: "none" }}>
      <Link
        href={{
          pathname: props.href,
          query: props.query,
        }}
      >
        <Typography
          variant="body2"
          sx={{ my: 2 }}
          color={props.textColor || "GrayText"}
        >
          {props.text}
        </Typography>
      </Link>
    </a>
  );
};

export default CustomLink;
