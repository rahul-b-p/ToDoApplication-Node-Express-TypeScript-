import { Request } from 'express';

export interface customRequest<
    P = {},
    resBody = {},
    reqBody = {},
    reqQuery = qs.ParsedQs,
    Local extends Record<string, any> = Record<string, any>
> extends Request<P, reqBody, resBody, reqQuery, Local> {
    payload?: {
        id: string;
    };
}