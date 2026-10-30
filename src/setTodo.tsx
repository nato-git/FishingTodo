import type { Todo } from "./types";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFishFins, faPenToSquare, faBucket, faXmark, faTag, faFish, faShrimp, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import type { ChangeEvent } from "react";

type Props = {
    todos: Todo[];
    updateTodo: (todo: Todo) => void;
}

const SetTodo = (props: Props) => {
    const todos = props.todos;
    if (todos.length === 0) {
        return (
        <div className="flex justify-center text-blue-500 font-bold mt-4">
            タスクが登録されていません。
        </div>)
    }
    const todoList = todos.map((todo) => {
        const nowtime = new Date();
        const [nowFolder, setFolder] = useState(todo.folder || "");
        const [nowTodoName, setTodoName] = useState(todo.name);
        const [nowPriority, setPriority] = useState(todo.priority);
        const [nowDone, setDone] = useState(todo.isDone);
        const [nowDeadline, setDeadline] = useState(todo.deadline ? new Date(todo.deadline) : null);
        const [isWindowOpen, setIsWindowOpen] = useState(false);
        const priorityIcons = [];
        for(let i=0; i<nowPriority; i++){
            priorityIcons.push(<FontAwesomeIcon icon={faFishFins} style={{ color : "lightblue" }} float className="m-1"/>)
        }
        const changeWindow = () => {
            setIsWindowOpen(!isWindowOpen);
        };
        const changeTodo = (todo:Todo, nowFolder:string | null, nowName:string, nowPriority:number, nowLine:Date | null) => {
            const newTodo = {...todo, folder:nowFolder, name:nowName, priority:nowPriority, deadline:nowDeadline};
            props.updateTodo(newTodo);
            setIsWindowOpen(false);
        };
        return(
            <div>
                {isWindowOpen && (
                    <div className="fixed inset-20 m-4 p-6 bg-white bg-opacity-50 z-50 border-4 rounded-xl border-gray-300">
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={changeWindow}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <FontAwesomeIcon icon={faTag} />種類名
                        <input type="text" defaultValue={nowFolder || ""} onChange={(e) => setFolder(e.target.value)} className="border border-gray-300 rounded-md p-2 m-1 w-full"/>
                        <FontAwesomeIcon icon={faFish} />タスク名
                        <input type="text" defaultValue={nowTodoName} onChange={(e) => setTodoName(e.target.value)} className="border border-gray-300 rounded-md p-2 m-1 w-full"/>
                        <FontAwesomeIcon icon={faShrimp} />レア度
                        <input type="number" defaultValue={nowPriority} onChange={(e) => setPriority(parseInt(e.target.value))} className="border border-gray-300 rounded-md p-2 m-1 w-full"/>
                        <FontAwesomeIcon icon={faCalendarDays} />期限日
                        <input type="date" defaultValue={nowDeadline ? dayjs(nowDeadline).format("YYYY-MM-DD") : ""} onChange={(e) => setDeadline(new Date(e.target.value))} className="border border-gray-300 rounded-md p-2 m-1 w-full"/>
                        <button className="bg-blue-500 text-white rounded-md p-2 m-1 w-full disabled:opacity-50 disabled:cursor-not-allowed" disabled={nowPriority > 3 || nowPriority < 1} onClick={() => changeTodo(todo, nowFolder, nowTodoName, nowPriority, nowDeadline)}>変更</button>
                        {(nowPriority > 3 || nowPriority < 1) && (
                            <div className="text-red-500 font-bold m-2">レア度は1〜3にしてください</div>
                        )}
                    </div>
                )}
                <div
                    key={todo.id}
                    className="flex justify-between border-4 border-blue-300 rounded-lg py-2 text-sm md:text-base m-4"
                >
                    <div className="m-2 text-xl">{nowFolder || "種類不明"}</div>
                    <div className="m-2 text-xl">{nowTodoName}</div>
                    <div className="m-2 text-xl">{priorityIcons}</div>
                    <div className="m-2 text-xl">{nowDone ? "完了" : "未完了"}</div>
                    <div className="m-2 text-xl">{nowDeadline ? dayjs(nowDeadline).format("YYYY-MM-DD") : "期限なし"}</div>
                    {nowDeadline && nowDeadline < nowtime && (
                        <div className="text-red-500 font-bold m-2 text-xl">期限超過</div>
                    )}
                    <button className="cursor-pointer m-2 text-xl" onClick={changeWindow}>
                        <FontAwesomeIcon icon={faPenToSquare} size="lg"/>
                    </button>
                    <button className="cursor-pointer m-2 bg-red-500 text-white rounded-sm py-0.5 px-1 text-xl">逃がす<FontAwesomeIcon icon={faBucket} size="lg"/></button>
                </div>
            </div>
            )
        })
    return <div>{todoList}</div>;
}
export default SetTodo;