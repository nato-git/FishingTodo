import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import type { ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOtter, faXmark, faTag, faFish, faShrimp, faCalendarDays, faFlag } from "@fortawesome/free-solid-svg-icons";
import type { Todo } from "./types";
import SetTodo from "./setTodo";
import ChallengeList from "./setchallege";
import type { challenge } from "./challenge";

const localStorageKey = "TodoApp";
const localStorageUserKey = "userName";
const localStorageChallengeKey = "challengeList";
const localStorageChallengeProgressKey = "challengeProgress";

const loadTodo = (): Todo[] => {
  const localTodos = localStorage.getItem(localStorageKey);
  if (localTodos) {
    return JSON.parse(localTodos);
  }
  return [];
};
const loadUser = (): string | null => {
  const name = localStorage.getItem(localStorageUserKey);
  if (name === null || name.trim() === "") {
    window.location.replace(`${import.meta.env.BASE_URL}user.html`);
  }
  return name;
};
const loadChallengeProgress = () => {
  const localChallengeProgress = localStorage.getItem(localStorageChallengeProgressKey);
  if (localChallengeProgress) {
    return JSON.parse(localChallengeProgress);
  }
  return {
    createTodoCount: 0,
    deleteTodoCount: 0,
    completeTodoCount: 0,
    editTodoCount: 0
  };
};
const loadChallengeList = (): challenge[] => {
  const challengeProgress = loadChallengeProgress();
  const challengeList: challenge[] = [
    {id: 1, title: "タスクを作成する", description: "タスクを1つ作成する", progress: challengeProgress.createTodoCount, progressComplete: 1, isCompleted: challengeProgress.createTodoCount >= 1},
    {id: 2, title: "タスクを削除する", description: "タスクを1つ削除する", progress: challengeProgress.deleteTodoCount, progressComplete: 1, isCompleted: challengeProgress.deleteTodoCount >= 1},
    {id: 3, title: "タスクの完了状態を変更する", description: "タスクの完了状態を1つ変更する", progress: challengeProgress.completeTodoCount, progressComplete:1, isCompleted: challengeProgress.completeTodoCount >= 1},
    {id: 4, title: "タスクを編集する", description: "タスクを1つ編集する", progress: challengeProgress.editTodoCount, progressComplete: 1, isCompleted: challengeProgress.editTodoCount >= 1},
    {id: 5, title: "チュートリアル", description: "チュートリアルをクリアする", progress: challengeProgress.createTodoCount + challengeProgress.deleteTodoCount + challengeProgress.completeTodoCount + challengeProgress.editTodoCount, progressComplete: 4, isCompleted: challengeProgress.createTodoCount >= 1 && challengeProgress.deleteTodoCount >= 1 && challengeProgress.completeTodoCount >= 1 && challengeProgress.editTodoCount >= 1},
    {id: 6, title: "タスクをもっと作成する", description: "タスクを5つ作成する", progress: challengeProgress.createTodoCount, progressComplete: 5, isCompleted: challengeProgress.createTodoCount >= 5},
    {id: 7, title: "タスクをもっと削除する", description: "タスクを5つ削除する", progress: challengeProgress.deleteTodoCount, progressComplete: 5, isCompleted: challengeProgress.deleteTodoCount >= 5},
    {id: 8, title: "もっとタスクの完了状態を変更する", description: "タスクの完了状態を5つ変更する", progress: challengeProgress.completeTodoCount, progressComplete: 5, isCompleted: challengeProgress.completeTodoCount >= 5},
    {id: 9, title: "タスクをもっと編集する", description: "タスクを5つ編集する", progress: challengeProgress.editTodoCount, progressComplete: 5, isCompleted: challengeProgress.editTodoCount >= 5},
    {id: 10, title: "フィッシング初心者", description: "フィッシング初心者をクリアする。", progress: challengeProgress.createTodoCount + challengeProgress.deleteTodoCount + challengeProgress.completeTodoCount + challengeProgress.editTodoCount, progressComplete: 20, isCompleted: challengeProgress.createTodoCount >= 5 && challengeProgress.deleteTodoCount >= 5 && challengeProgress.completeTodoCount >= 5 && challengeProgress.editTodoCount >= 5},
    {id: 11, title: "タスクをさらに作成する", description: "タスクを10つ作成する", progress: challengeProgress.createTodoCount, progressComplete: 10, isCompleted: challengeProgress.createTodoCount >= 10},
    {id: 12, title: "タスクをさらに削除する", description: "タスクを10つ削除する", progress: challengeProgress.deleteTodoCount, progressComplete: 10, isCompleted: challengeProgress.deleteTodoCount >= 10},
    {id: 13, title: "さらにタスクの完了状態を変更する", description: "タスクの完了状態を10つ変更する", progress: challengeProgress.completeTodoCount, progressComplete: 10, isCompleted: challengeProgress.completeTodoCount >= 10},
    {id: 14, title: "タスクをさらに編集する", description: "タスクを10つ編集する", progress: challengeProgress.editTodoCount, progressComplete: 10, isCompleted: challengeProgress.editTodoCount >= 10},
    {id: 15, title: "フィッシング中級者", description: "フィッシング中級者をクリアする。", progress: challengeProgress.createTodoCount + challengeProgress.deleteTodoCount + challengeProgress.completeTodoCount + challengeProgress.editTodoCount, progressComplete: 50, isCompleted: challengeProgress.createTodoCount >= 10 && challengeProgress.deleteTodoCount >= 10 && challengeProgress.completeTodoCount >= 10 && challengeProgress.editTodoCount >= 10},
    {id: 16, title: "まだまだタスクを作成する", description: "タスクを20つ作成する", progress: challengeProgress.createTodoCount, progressComplete: 20, isCompleted: challengeProgress.createTodoCount >= 20},
    {id: 17, title: "まだまだタスクを削除する", description: "タスクを20つ削除する", progress: challengeProgress.deleteTodoCount, progressComplete: 20, isCompleted: challengeProgress.deleteTodoCount >= 20},
    {id: 18, title: "まだまだタスクの完了状態を変更する", description: "タスクの完了状態を20つ変更する", progress: challengeProgress.completeTodoCount, progressComplete: 20, isCompleted: challengeProgress.completeTodoCount >= 20},
    {id: 19, title: "まだまだタスクを編集する", description: "タスクを20つ編集する", progress: challengeProgress.editTodoCount, progressComplete: 20, isCompleted: challengeProgress.editTodoCount >= 20},
    {id: 20, title: "フィッシング上級者", description: "フィッシング上級者をクリアする。", progress: challengeProgress.createTodoCount + challengeProgress.deleteTodoCount + challengeProgress.completeTodoCount + challengeProgress.editTodoCount, progressComplete: 50, isCompleted: challengeProgress.createTodoCount >= 20 && challengeProgress.deleteTodoCount >= 20 && challengeProgress.completeTodoCount >= 20 && challengeProgress.editTodoCount >= 20},
    {id: 21, title: "嫌になるほどタスクを作成する", description: "タスクを50つ作成する", progress: challengeProgress.createTodoCount, progressComplete: 50, isCompleted: challengeProgress.createTodoCount >= 50},
    {id: 22, title: "嫌になるほどタスクを削除する", description: "タスクを50つ削除する", progress: challengeProgress.deleteTodoCount, progressComplete: 50, isCompleted: challengeProgress.deleteTodoCount >= 50},
    {id: 23, title: "嫌になるほどタスクの完了状態を変更する", description: "タスクの完了状態を50つ変更する", progress: challengeProgress.completeTodoCount, progressComplete: 50, isCompleted: challengeProgress.completeTodoCount >= 50},
    {id: 24, title: "嫌になるほどタスクを編集する", description: "タスクを50つ編集する", progress: challengeProgress.editTodoCount, progressComplete: 50, isCompleted: challengeProgress.editTodoCount >= 50},
    {id: 25, title: "フィッシングプロ", description: "フィッシングプロをクリアする。", progress: challengeProgress.createTodoCount + challengeProgress.deleteTodoCount + challengeProgress.completeTodoCount + challengeProgress.editTodoCount, progressComplete: 50, isCompleted: challengeProgress.createTodoCount >= 50 && challengeProgress.deleteTodoCount >= 50 && challengeProgress.completeTodoCount >= 50 && challengeProgress.editTodoCount >= 50},
    {id: 26, title: "限界を超えてタスクを作成する", description: "タスクを100つ作成する", progress: challengeProgress.createTodoCount, progressComplete: 100, isCompleted: challengeProgress.createTodoCount >= 100},
    {id: 27, title: "限界を超えてタスクを削除する", description: "タスクを100つ削除する", progress: challengeProgress.deleteTodoCount, progressComplete: 100, isCompleted: challengeProgress.deleteTodoCount >= 100},
    {id: 28, title: "限界を超えてタスクの完了状態を変更する", description: "タスクの完了状態を100つ変更する", progress: challengeProgress.completeTodoCount, progressComplete: 100, isCompleted: challengeProgress.completeTodoCount >= 100},
    {id: 29, title: "限界を超えてタスクを編集する", description: "タスクを100つ編集する", progress: challengeProgress.editTodoCount, progressComplete: 100, isCompleted: challengeProgress.editTodoCount >= 100},
    {id: 30, title: "フィッシング王", description: "フィッシング王をクリアする。", progress: challengeProgress.createTodoCount + challengeProgress.deleteTodoCount + challengeProgress.completeTodoCount + challengeProgress.editTodoCount, progressComplete: 100, isCompleted: challengeProgress.createTodoCount >= 100 && challengeProgress.deleteTodoCount >= 100 && challengeProgress.completeTodoCount >= 100 && challengeProgress.editTodoCount >= 100},
  ]
  return challengeList;
};

const App = () => {
  const todos = loadTodo();
  const userName = loadUser();
  const [nowTodos, setTodos] = useState(todos);
  const [nowWindowOpen, setWindowOpen] = useState(false);
  const [newFolder, setFolder] = useState<string | null>(null);
  const [newTodoName, setTodoName] = useState("");
  const [newPriority, setPriority] = useState(1);
  const [newDeadline, setDeadline] = useState<Date | null>(null);
  const [nowSelect, setSelect] = useState<string>("0");
  const [nowChallengeWindowOpen, setChallengeWindowOpen] = useState(false);
  const [nowChallengeList, setChallengeList] = useState<challenge[]>(loadChallengeList());
  const [nowChallengeProgress, setChallengeProgress] = useState(loadChallengeProgress());
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
  const saveChallengeProgress = () => {
    localStorage.setItem(localStorageChallengeProgressKey, JSON.stringify(nowChallengeProgress));
  };
  const saveChallengeList = () => {
    localStorage.setItem(localStorageChallengeKey, JSON.stringify(nowChallengeList));
  };
  const createTodo = (newFolder:string | null, newTodoName:string, newPriority:number, newDeadline:Date | null) => {
    const newTodo: Todo = {id: uuid(), folder:newFolder, name:newTodoName, isDone:false, priority:newPriority, deadline:newDeadline};
    setChallengeProgress({
      ...nowChallengeProgress,
      createTodoCount: nowChallengeProgress.createTodoCount + 1
    });
    saveChallengeProgress();
    setChallengeList(loadChallengeList());
    console.log(loadChallengeProgress());
    console.log(loadChallengeList());
    console.log(nowChallengeList);
    saveChallengeList();
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
  const challengeWindowChange = () => {
    setChallengeProgress(loadChallengeProgress());
    setChallengeList(loadChallengeList());
    saveChallengeProgress();
    saveChallengeList();
    setChallengeWindowOpen(!nowChallengeWindowOpen);
  };
  const changeUserName = () => {
    localStorage.removeItem(localStorageUserKey);
    window.location.replace(`${import.meta.env.BASE_URL}user.html`);
  };
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(nowTodos)), localStorage.setItem(localStorageChallengeProgressKey, JSON.stringify(nowChallengeProgress)), localStorage.setItem(localStorageChallengeKey, JSON.stringify(nowChallengeList));
  }, [nowTodos, nowChallengeProgress, nowChallengeList]);
  return (
    <div>
      <h1 className="flex justify-center text-4xl font-bold my-4">Fishing Todo
        <button className="cursor-pointer text-orange-300 hover:text-orange-500" onClick={changeUserName}>
          <FontAwesomeIcon icon={faOtter} className="ml-2" />
        </button>
      </h1>
      <h2 className="flex justify-center text-2xl font-semibold mt-4 mb-10">Hello, {userName}! Let's fishing Todo!</h2>
      <div>
        <button className="text-blue-300 hover:text-blue-500 cursor-pointer absolute top-5 right-5" onClick={challengeWindowChange}>
          <FontAwesomeIcon icon={faFlag} size="2xl"/>
        </button>
        {nowChallengeWindowOpen && (
          <div className="fixed inset-20 p-6 bg-white bg-opacity-50 z-50 border-4 rounded-xl border-gray-300 overflow-y-scroll h-4/5">
            <h2 className="text-xl font-bold mb-4">チャレンジ一覧</h2>
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={challengeWindowChange}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="p-4">
              <ChallengeList challengeList={nowChallengeList}/>
            </div>
          </div>
        )}
      </div>
      <div className="m-4">
        <button className="m-4 border-2 border-blue-400 bg-blue-300 py-2 px-4 rounded-md font-bold hover:bg-blue-500 hover:text-white" onClick={windowChange}>
          タスク追加
        </button>
        <select className="border-2 border-gray-300 rounded-md p-2 m-1 cursor-pointer" value={nowSelect} onChange={(e: ChangeEvent<HTMLSelectElement>) => {
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
        <SetTodo todos={selectTodos()} updateTodo={updateTodo} setTodos={setTodos} challengeProgress={nowChallengeProgress} setChallengeProgress={setChallengeProgress} />
      </div>
    </div>
  );
}
export default App;