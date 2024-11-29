import bcrypt from 'bcrypt'
import { loggers } from '../utils/winston.util';

export const getEncryptedPassword =async(password:string)=>{
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword:string = await bcrypt.hash(password,salt);
    return encryptedPassword;
}

export const verifyPassword = async(password:string, hashPass:string)=>{
    const isCorrectPassword = await bcrypt.compare(password,hashPass);
    return isCorrectPassword;
}

