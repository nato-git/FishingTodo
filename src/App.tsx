import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { twMerge } from "tailwind-merge";
import type { ChangeEvent } from "react";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOtter, faXmark, faTag, faFish, faShrimp, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import type { Todo } from "./types";
import SetTodo from "./setTodo";

const localStorageKey = "TodoApp";
const localStorageUserKey = "userName";

const loadTodo = (): Todo[] => {
  const localTodos = localStorage.getItem(localStorageKey);
  if (localTodos) {
    return JSON.parse(localTodos);
  }
  return [{
    id: uuid(),
    folder: null,
    name: "サンプルタスク",
    isDone: false,
    priority: 1,
    deadline: null
  }];
}
const loadUser = (): string | null => {
  const name = localStorage.getItem(localStorageUserKey);
  if (name === null || name.trim() === "") {
    window.location.replace(`${import.meta.env.BASE_URL}user.html`);
  }
  return name;
}

const App = () => {
  const todos = loadTodo();
  const userName = loadUser();
  /*
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
      deadline: null
    }
  ]
  */
  const [nowTodos, setTodos] = useState(todos);
  const [nowWindowOpen, setWindowOpen] = useState(false);
  const [newFolder, setFolder] = useState<string | null>(null);
  const [newTodoName, setTodoName] = useState("");
  const [newPriority, setPriority] = useState(1);
  const [newDeadline, setDeadline] = useState<Date | null>(null);
  const [nowSelect, setSelect] = useState<string>("0");
  const updateTodo = (newTodo:Todo) => {
    setTodos(nowTodos.map((todo) => todo.id === newTodo.id ? newTodo:todo));
  };
  const windowChange = () => {
    setFolder(null);
    setTodoName("");
    setPriority(1);
    setDeadline(null);
    setWindowOpen(!nowWindowOpen);
  };
  const saveTodos = () => {
    localStorage.setItem(localStorageKey, JSON.stringify(nowTodos));
  };
  const createTodo = (newFolder:string | null, newTodoName:string, newPriority:number, newDeadline:Date | null) => {
    const newTodo: Todo = {id: uuid(), folder:newFolder, name:newTodoName, isDone:false, priority:newPriority, deadline:newDeadline};
    setFolder(null);
    setTodoName("");
    setPriority(1);
    setDeadline(null);
    setWindowOpen(false);
    setTodos([...nowTodos, newTodo]);
    saveTodos();
  };
  const selectTodos = () => {
    if(nowSelect === "0"){
      return nowTodos;
    }
    return nowTodos.filter((todo) => todo.folder === nowSelect);
  };
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(nowTodos));
  }, [nowTodos]);
  return (
    <div>
      <h1 className="flex justify-center text-4xl font-bold my-4">Fishing Todo<FontAwesomeIcon icon={faOtter} className="ml-2" /></h1>
      <h2 className="flex justify-center text-2xl font-semibold my-6">Hello, {userName}! Let's fishing Todo!</h2>
      <div className="m-4">
        <button className="m-4 border-2 border-blue-400 bg-blue-300 py-2 px-4 rounded-md font-bold hover:bg-blue-500 hover:text-white" onClick={windowChange}>
          タスク追加
        </button>
        <select className="border-2 border-gray-300 rounded-md p-2 m-1" value={nowSelect} onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          setSelect(e.target.value);
          selectTodos();
        }}>
          <option value="0">種類選択なし</option>
          {Array.from(new Set(nowTodos.filter((todo) => todo.folder).map((todo) => todo.folder))).map((folder) => (
            <option key={folder} value={folder || ""}>
              {folder}
            </option>
          ))}
        </select>
        {nowWindowOpen && (
          <div className="fixed inset-20 m-4 p-6 bg-white bg-opacity-50 z-50 border-4 rounded-xl border-gray-300">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={windowChange}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <FontAwesomeIcon icon={faTag} />種類名
            <input type="text" onChange={(e) => setFolder(e.target.value)} className="border border-gray-300 rounded-md p-2 m-1 w-full"/>
            <FontAwesomeIcon icon={faFish} />タスク名
            <input type="text" onChange={(e) => setTodoName(e.target.value)} className="border border-gray-300 rounded-md p-2 m-1 w-full"/>
            <FontAwesomeIcon icon={faShrimp} />レア度
            <input type="number" value={newPriority} onChange={(e) => setPriority(parseInt(e.target.value))} className="border border-gray-300 rounded-md p-2 m-1 w-full"/>
            <FontAwesomeIcon icon={faCalendarDays} />期限日
            <input type="date" onChange={(e) => setDeadline(new Date(e.target.value))} className="border border-gray-300 rounded-md p-2 m-1 w-full"/>
            <button className="bg-blue-500 text-white rounded-md p-2 m-1 w-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600" disabled={newPriority > 3 || newPriority < 1 || !newTodoName.trim() || !newPriority} onClick={() => createTodo(newFolder, newTodoName, newPriority, newDeadline)}>変更</button>
            {(newPriority > 3 || newPriority < 1 || !newPriority) && (
              <div className="text-red-500 font-bold m-2">レア度は1〜3にしてください</div>
            )}
            </div>
        )}
      </div>
      <div className="m-4 justify-content border-2 border-gray-300 rounded-md p-4">
        <SetTodo todos={selectTodos()} updateTodo={updateTodo} setTodos={setTodos} />
      </div>
    </div>
  );
}
export default App;