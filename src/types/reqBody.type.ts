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

export interface updateUserBody{
    currentPassword:string,
    updatePassword?:string,
    updateEmail?:string,
    updateUsername?:string
}

