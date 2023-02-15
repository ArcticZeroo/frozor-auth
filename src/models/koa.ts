import { User } from '@prisma/client';
import { Context } from 'koa';
import { IParsedForm } from './form.js';

export interface IKoaState {
    form?: IParsedForm;
    user?: User;
}

export type ServiceContext = Context & IKoaState;