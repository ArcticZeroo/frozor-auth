import Router from '@koa/router';
import { registerApiRoutes } from './api';
export const registerMiddlewares = (app) => {
    const router = new Router();
    registerApiRoutes(router);
    app.use(router.middleware())
        .use(router.allowedMethods());
};
//# sourceMappingURL=index.js.map