import { Container, Toolbar, Typography } from "@material-ui/core";
import { getNameInitials, getNameUpperCase } from "data/utils/nameConfig";
import moment from "moment";
import React, { useMemo } from "react";
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
  const iconTag = useMemo(() => {
    if (props.tag === "HOT") {
      return { icon: "fire", color: "#e63706", name: "Quente" };
    } else if (props.tag === "COLD") {
      return { icon: "snowflake-o", color: "#3eccf0", name: "Fria" };
    } else if (props.tag === "WARM") {
      return { icon: "bolt", color: "#effa5c", name: "Morna" };
    }
  }, [props.tag]);

  return (
    <ActivityContainer>
      <Typography color="primary" variant="subtitle1">
        {props.title}
      </Typography>
      <ActivityTimeContainer>
        <Typography variant="caption" sx={{ mr: 2 }}>
          <i className="fa fa-calendar" style={{ marginRight: "2px" }}></i>
          {moment(props.createdAt).format(" DD/MM/YYYY")}
        </Typography>
        <Typography variant="caption" sx={{ mr: 2 }}>
          <i className="fa fa-clock-o" style={{ marginRight: "2px" }}></i>
          {moment(props.createdAt).format("HH:mm")}
        </Typography>
        <Typography variant="caption">
          <i
            className={`fa fa-${iconTag.icon}`}
            style={{ marginRight: "2px", color: `${iconTag.color}` }}
          ></i>
          {iconTag.name}
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
