import type { Todo } from "./types";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFishFins } from "@fortawesome/free-solid-svg-icons";

type Props = {
    todos: Todo[];
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
        const deadline = todo.deadline ? dayjs(todo.deadline).format("YYYY-MM-DD") : "期限なし";
        const nowtime = new Date();
        let priorityIcons = [];
        for (let i=0; i<todo.priority; i++) {
            priorityIcons.push(<FontAwesomeIcon icon={faFishFins} style={{ color: "lightblue" }} key={i} float/>);
        }
        return(
            <div
                key={todo.id}
                className="flex justify-center border border-gray-300 py-2 text-sm md:text-base"
            >
                <div className="mr-4">{todo.folder}</div>
                <div className="mr-4">{todo.name}</div>
                <div className="mr-4">{priorityIcons}</div>
                <div className="mr-4">{todo.isDone ? "完了" : "未完了"}</div>
                <div className="mr-4">{deadline}</div>
                {todo.deadline && todo.deadline < nowtime && (
                    <div className="text-red-500 font-bold">期限超過</div>
                )}
            </div>
        )
    })
    return <div>{todoList}</div>;
}
export default SetTodo;