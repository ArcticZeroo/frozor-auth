import Router from '@koa/router';
import { RouteBuilder } from '../../models/route-builder.js';
import { formRoutes } from './form.js';
import { oauthRoutes } from './oauth.js';

export const registerAuthRoutes: RouteBuilder = (app) => {
	const router = new Router();

	oauthRoutes(router);
	formRoutes(router);

	app.use('/auth', router.routes(), router.allowedMethods());
};