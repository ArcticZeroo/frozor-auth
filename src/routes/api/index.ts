import Router from '@koa/router';
import { RouteBuilder } from '../../models/route-builder.js';

export const registerApiRoutes: RouteBuilder = app => {
    const router = new Router();


    app.use('/api', router.routes(), router.allowedMethods());
};