import Router from '@koa/router';
export const registerApiRoutes = app => {
    const router = new Router();
    app.use('/api', router.routes(), router.allowedMethods());
};
//# sourceMappingURL=index.js.map