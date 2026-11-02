import type { Todo } from "./types";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFishFins, faPenToSquare, faBucket, faXmark, faTag, faFish, faShrimp, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type Props = {
    todos: Todo[];
    updateTodo: (todo: Todo) => void;
    setTodos: (todos: Todo[]) => void;
};

const TodoItem = ({ todo, updateTodo, props }: { todo: Todo; updateTodo: (todo: Todo) => void; props: Props }) => {
    const nowtime = new Date();
    const [nowFolder, setFolder] = useState(todo.folder || "");
    const [nowTodoName, setTodoName] = useState(todo.name);
    const [nowPriority, setPriority] = useState(todo.priority);
    const [nowDeadline, setDeadline] = useState<Date | null>(todo.deadline ? new Date(todo.deadline) : null);
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const priorityIcons = Array.from({ length: nowPriority }).map((_, i) => (
        <FontAwesomeIcon key={i} icon={faFishFins} style={{ color: "lightblue" }} float className="m-1" />
    ));
    const changeWindow = () => setIsWindowOpen(!isWindowOpen);
    const changeTodo = () => {
        updateTodo({
        ...todo,
        folder: nowFolder,
        name: nowTodoName,
        priority: nowPriority,
        deadline: nowDeadline,
        });
        setIsWindowOpen(false);
    };
    const deleteTodo = (selectTodo: Todo) => {
        const beforeTodos = props.todos;
        const afterTodos = beforeTodos.filter((t) => t.id !== selectTodo.id);
        localStorage.setItem("TodoApp", JSON.stringify(afterTodos));
        props.setTodos(afterTodos);
    };
    return (
    <div>
    {isWindowOpen && (
        <div className="fixed inset-20 m-4 p-6 bg-white bg-opacity-50 z-50 border-4 rounded-xl border-gray-300">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={changeWindow}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <FontAwesomeIcon icon={faTag} />種類名
            <input type="text" value={nowFolder} onChange={(e) => setFolder(e.target.value)} className="border border-gray-300 rounded-md p-2 m-1 w-full"/>
            <FontAwesomeIcon icon={faFish} />タスク名
            <input type="text" value={nowTodoName} onChange={(e) => setTodoName(e.target.value)} className="border border-gray-300 rounded-md p-2 m-1 w-full"/>
            <FontAwesomeIcon icon={faShrimp} />レア度
            <input type="number" value={nowPriority} onChange={(e) => setPriority(parseInt(e.target.value))} className="border border-gray-300 rounded-md p-2 m-1 w-full"/>
            <FontAwesomeIcon icon={faCalendarDays} />期限日
            <input 
                type="date" 
                value={nowDeadline ? dayjs(nowDeadline).format("YYYY-MM-DD") : ""} 
                onChange={(e) => setDeadline(e.target.value ? new Date(e.target.value) : null)} 
                className="border border-gray-300 rounded-md p-2 m-1 w-full"
            />
            <button 
                className="bg-blue-500 text-white rounded-md p-2 m-1 w-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600" 
                disabled={nowPriority > 3 || nowPriority < 1 || !nowTodoName.trim() || !nowPriority} 
                onClick={changeTodo}
            >
                変更
            </button>
            {(nowPriority > 3 || nowPriority < 1 || !nowPriority) && (
                <div className="text-red-500 font-bold m-2">レア度は1〜3にしてください</div>
            )}
            </div>
        )}
        <div className="flex justify-between border-4 border-blue-300 rounded-lg py-2 text-sm md:text-base m-4">
            <div className="m-2 text-xl">{nowFolder || "種類不明"}</div>
            <div className="m-2 text-xl">{nowTodoName}</div>
            <div className="m-2 text-xl">{priorityIcons}</div>
            <div className="m-2 text-xl">{todo.isDone ? "完了" : "未完了"}</div>
            <div className="m-2 text-xl">{nowDeadline ? dayjs(nowDeadline).format("YYYY-MM-DD") : "期限なし"}</div>
            {nowDeadline && nowDeadline < nowtime && (
                <div className="text-red-500 font-bold m-2 text-xl">期限超過</div>
            )}
            <button className="cursor-pointer m-2 text-xl hover:bg-gray-300 rounded-md" onClick={changeWindow}>
                <FontAwesomeIcon icon={faPenToSquare} size="lg"/>
            </button>
            <button className="cursor-pointer m-2 bg-red-500 text-white rounded-sm py-0.5 px-1 text-xl hover:bg-red-600" onClick={() => deleteTodo(todo)}>
                逃がす<FontAwesomeIcon icon={faBucket} size="lg"/>
            </button>
        </div>
    </div>
    );
};

const SetTodo = (props: Props) => {
    if (props.todos.length === 0) {
    return (
        <div className="flex justify-center text-blue-500 font-bold m-2">
            タスクが登録されていません。
        </div>
        );
    }
    return (
    <div className="h-80 overflow-y-scroll">
        {props.todos.sort((a, b) => a.priority - b.priority).map((todo) => (
            <TodoItem key={todo.id} todo={todo} updateTodo={props.updateTodo} props={props} />
        ))}
    </div>
    );
};

export default SetTodo;