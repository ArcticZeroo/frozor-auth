import Router from '@koa/router';
import { RouteBuilder } from '../../models/route-builder.js';
import { attachRouter } from '../../util/koa.js';

export const registerApiRoutes: RouteBuilder = app => {
    const router = new Router({
        prefix: '/api'
    });

    router.get('/', (ctx) => {
        ctx.body = 'Pong!';
    });

    attachRouter(app, router);
};