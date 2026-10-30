import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { twMerge } from "tailwind-merge";
import type { ChangeEvent } from "react";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOtter } from "@fortawesome/free-solid-svg-icons";
import type { Todo } from "./types";
import SetTodo from "./setTodo";

const localStorageKey = "TodoApp";
const localStorageUserKey = "userName";

const loadTodo = (): Todo[] => {
  const localTodos = localStorage.getItem(localStorageKey);
  if (localTodos) {
    return JSON.parse(localTodos);
  }
  return [];
}
const loadUser = (): string | null => {
  const name = localStorage.getItem(localStorageUserKey);
  if (name === null || name.trim() === "") {
    window.location.replace("/user");
  }
  return name;
}

const App = () => {
  //const todos = loadTodo();
  const userName = loadUser();
  const todos: Todo[] = [
    {
      id: "11",
      folder: "仕事",
      name: "会議資料作成",
      isDone: false,
      priority: 1,
      deadline: dayjs("2024-06-30").toDate()
    },
    {
      id: "22",
      folder: null,
      name: "歩く",
      isDone: false,
      priority: 3,
      deadline: dayjs("2024-06-30").toDate()
    }
  ]
  return (
    <div>
      <h1 className="flex justify-center text-4xl font-bold my-4">Fishing Todo<FontAwesomeIcon icon={faOtter} className="ml-2" /></h1>
      <h2 className="flex justify-center text-2xl font-semibold my-6">Hello, {userName}! Let's fishing Todo!</h2>
      <SetTodo todos={todos} />
    </div>
  );
}
export default App;