import { Container, Toolbar, Typography } from "@material-ui/core";
import { getNameInitials, getNameUpperCase } from "data/utils/nameConfig";
import React from "react";
import Title from "../Title/Title";
import { ActivityContainer, ActivityTimeContainer } from "./Activity.style";

//@deprecated
interface ActivityProps {
  title: string;
  tag: string;
  createdAt: string;
  createdBy: string;
  description: string;
}

const Activity: React.FC<ActivityProps> = (props) => {
  return (
    <ActivityContainer>
      <Typography color="primary" variant="subtitle1">
        Coxinha
      </Typography>
      <ActivityTimeContainer>
        <Typography variant="caption" sx={{ mr: 2 }}>
          <i className="fa fa-calendar" style={{ marginRight: "2px" }}></i>
          {props.createdAt}
        </Typography>
        <Typography variant="caption" sx={{ mr: 2 }}>
          <i className="fa fa-calendar" style={{ marginRight: "2px" }}></i>
          {props.createdAt}
        </Typography>
        <Typography variant="caption">
          <i className="fa fa-calendar" style={{ marginRight: "2px" }}></i>
          {props.createdAt}
        </Typography>
      </ActivityTimeContainer>
      <hr style={{ width: "100%" }} />

      <div>
        <Typography variant="body2">{props.description}</Typography>
      </div>
      <Typography sx={{ textAlign: "right" }} variant="overline">
        {props.createdBy}
      </Typography>
    </ActivityContainer>
  );
};
export default Activity;
