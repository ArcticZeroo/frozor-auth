import Router from '@koa/router';
import Koa from 'koa';
import { IKoaState } from '../models/koa.js';
import { registerApiRoutes } from './api/index.js';
import { registerAuthRoutes } from './auth/index.js';

export const registerRoutes = (app: Koa<IKoaState>) => {
    const router = new Router();

    registerApiRoutes(router);
    registerAuthRoutes(router);

    app.use(router.middleware())
        .use(router.allowedMethods());
};