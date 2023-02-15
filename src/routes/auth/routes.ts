import Router from '@koa/router';
import { RouteBuilder } from '../../models/route-builder.js';
import { attachRouter } from '../../util/koa.js';
import { formRoutes } from './form/routes.js';
import { oauthRoutes } from './oauth.js';

export const registerAuthRoutes: RouteBuilder = (app) => {
	const router = new Router({
		prefix: '/auth'
	});

	oauthRoutes(router);
	formRoutes(router);

	attachRouter(app, router);
};