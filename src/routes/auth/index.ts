import Router from '@koa/router';
import serve from 'koa-static';
import path from 'path';
import { RouteBuilder } from '../../models/route-builder';
import { publicFolderPath } from '../../server/config';
import { formRoutes } from './form';
import { oauthRoutes } from './oauth';

export const registerAuthRoutes: RouteBuilder = (app) => {
	const router = new Router();

	oauthRoutes(router);
	formRoutes(router);

	app.use('/auth', router.routes(), router.allowedMethods());
};