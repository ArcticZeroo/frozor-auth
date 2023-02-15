import Router from '@koa/router';
import Koa from 'koa';
import { IKoaState } from '../models/koa.js';
import { registerApiRoutes } from './api/routes.js';
import { registerAuthRoutes } from './auth/routes.js';

export const registerRoutes = (app: Koa<IKoaState>) => {
    const router = new Router();

    registerApiRoutes(router);
    registerAuthRoutes(router);

    app.use(router.routes())
        .use(router.allowedMethods());
};