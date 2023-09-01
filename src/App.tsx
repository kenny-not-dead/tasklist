import React, { useEffect, useState } from "react";
import classes from "./App.module.scss";

import axios from "axios";
import { faker } from "@faker-js/faker";
import TodoList from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  endData: string;
  startData: string;
  randomTag1: string;
  randomTag2: string;
  userId: number;
};

function App() {
  const [appState, setAppState] = useState<Array<TodoListType>>([]);

  const [listLength, setListLength] = useState(0);

  useEffect(() => {
    const apiUrl = "https://jsonplaceholder.typicode.com/todos";

    axios.get(apiUrl).then((response) => {
      const todoList = response.data;
      const newData = todoList.map((i: any) => {
        const startData = faker.date.anytime();

        let options: any = {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        };

        const endData = faker.date.soon({ days: 30, refDate: startData });

        return {
          userId: i.userId,
          id: i.id,
          title: i.title,
          completed: i.completed,
          description: faker.commerce.productDescription(),
          startData: startData.toLocaleString("en-US", options),
          endData: endData.toLocaleString("en-US", options),
          randomTag1: faker.word.adjective(10),
          randomTag2: faker.word.adjective(10),
        };
      });
      setAppState(newData);
      setListLength(newData.filter((i: any) => i.completed === false).length);
    });
  }, [setAppState]);

  const changeStatus = (taskId: number, isDone: boolean) => {
    let task = appState.find((t) => t.id === taskId);
    if (task) {
      task.completed = isDone;
      setAppState([...appState]);
      setListLength(listLength - 1);
    }
  };

  return (
    <div className={classes.App}>
      <div className={classes.infowrapper}>
        <h2>TODAY</h2>
        <div className={classes.btnwrapper}>
          <button>+</button>
          <span>{listLength}</span>
        </div>
      </div>
      <div className={classes.wrapper}>
        {appState
          .filter((i) => i.completed === false)
          .map((el) => {
            return (
              <TodoList
                key={el.id}
                id={el.id}
                title={el.title}
                completed={el.completed}
                description={el.description}
                endData={el.endData}
                startData={el.startData}
                randomTag1={el.randomTag1}
                randomTag2={el.randomTag2}
                userId={el.userId}
                changeStatus={changeStatus}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
