export interface userSchema {
    id: string,
    username: string,
    email: string,
    hashPassword: string
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