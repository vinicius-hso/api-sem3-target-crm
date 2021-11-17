import React from "react";
import LinkStatic from "next/link";
import { Link } from "@material-ui/core";

export interface LinkComponentProps {
  href?: string;
  text?: string;
  query?: {};
  textColor?: string;
}

const StaticLink: React.FC<LinkComponentProps> = ({
  href,
  query,
  ...props
}) => {
  return (
    <LinkStatic
      href={{
        pathname: href,
        query: query,
      }}
    >
      <Link className="linkMUI" {...props}></Link>
    </LinkStatic>
  );
};

export default StaticLink;
