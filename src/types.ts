export type Todo = {
    id: string;
    folder: string | null;
    name: string;
    isDone: boolean;
    priority: number;
    deadline: Date | null;
}