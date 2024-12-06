export interface userSignupBody {
    username: string,
    email: string,
    password: string
}

export interface userLoginBody {
    email: string,
    password: string
}
export interface todoReqBody{
    description:string,
    completed:boolean
}

export interface updateTodoReqBody{
    id:string,
    todo:{
        description: string,
        completed: boolean,
    }
}