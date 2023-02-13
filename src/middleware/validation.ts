import { Middleware } from 'koa';
import { IKoaState } from '../models/koa.js';

interface IHeaderToValidate {
    key: string;
    name: string;
    validator: (value: string[] | string) => boolean;
}

export const validateHeaders = (headers: IHeaderToValidate[]): Middleware<IKoaState> => {
    return () => {

    };
};