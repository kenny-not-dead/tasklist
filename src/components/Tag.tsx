import React from "react";
import classes from "./Tag.module.scss";

type PropsType = {
  randomTag: string;
  style: string;
};

export default function Tag(props: PropsType) {
  return (
    <div className={props.style === "purple" ? classes.purple : classes.grey}>
      <p>{props.randomTag}</p>
    </div>
  );
}
