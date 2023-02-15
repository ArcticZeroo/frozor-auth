import Router from '@koa/router';
import { RouteBuilder } from '../../models/route-builder';
import { formRoutes } from './form';
import { oauthRoutes } from './oauth';

export const registerAuthRoutes: RouteBuilder = (app) => {
	const router = new Router();

	oauthRoutes(router);
	formRoutes(router);

	app.use('/auth', router.routes(), router.allowedMethods());
};