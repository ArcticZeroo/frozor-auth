import { User } from '@prisma/client';
import { IParsedForm } from './form.js';

export interface IKoaState {
    form?: IParsedForm;
    user?: User;
}