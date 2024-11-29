export interface userSchema {
    id: string,
    username: string,
    email: string,
    password: string
}

export interface todoSchema {
    id: string,
    userId: string,
    description: string,
    completed: boolean,
    timestamp: number
}

export interface JsonDataBase {
    users: userSchema[] | [],
    todos: todoSchema[] | []
}