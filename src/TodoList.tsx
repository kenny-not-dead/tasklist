import React, { ChangeEvent, useState } from "react";
import classes from "./TodoList.module.scss";
import Tag from "./components/Tag";
import ava from "./static/ava.svg";

type PropsType = {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  endData: string;
  startData: string;
  randomTag1: string;
  randomTag2: string;
  userId: number;
  changeStatus: (taskId: number, isDone: boolean) => void;
};

export default function TodoList(props: PropsType) {
  const [number, setNumber] = useState(35);
  const [numberTitle, setNumberTitle] = useState(90);

  const setAll = (number: Number) => {
    if (number === 35) {
      setNumber(Infinity);
    } else {
      setNumber(35);
    }
  };

  const setAllTitle = (number: Number) => {
    if (number === 90) {
      setNumberTitle(Infinity);
    } else {
      setNumberTitle(90);
    }
  };

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeStatus(props.id, e.currentTarget.checked);
  };

  return (
    <li className={classes.bgwrapper}>
      <div className={classes.wrapper}>
        <div className={classes.titlewrapper}>
          <input
            type="checkbox"
            onChange={onChangeStatusHandler}
            checked={props.completed}
          />
          <label onClick={() => setAllTitle(numberTitle)}>
            {props.title.slice(0, numberTitle)}
            {numberTitle !== 90 || props.title.length < numberTitle
              ? ""
              : "..."}
          </label>
        </div>
        <div className={classes.datawrapper}>
          <p>{props.startData}</p>
          <p>{props.endData}</p>
        </div>
        <div className={classes.descriptionall}>
          <p onClick={() => setAll(number)}>
            {props.description.slice(0, number)}
            {number === 35 ? "..." : ""}
          </p>
        </div>

        <div className={classes.tagwrapper}>
          <div>
            <Tag randomTag={props.randomTag1} style="purple" />
            <Tag randomTag={props.randomTag2} style="grey" />
          </div>
          <img src={ava} alt="Photo" />
        </div>
      </div>
    </li>
  );
}
