import { Middleware } from 'koa';
import { ApplicationRepository } from '../api/repository/app';
import { ServiceContext, IKoaState } from '../models/koa.js';
import { isRedirectUriAllowed, isValidHttpsUrl, validateRequestValue } from '../util/validation';

interface IHeaderToValidate {
    key: string;
    name: string;
    validator: (value: string[] | string) => boolean;
}

export const validateHeaders = (headers: IHeaderToValidate[]): Middleware<IKoaState> => {
    return () => {

    };
};
