import send from 'koa-send';
import serve from 'koa-static';
import path from 'path';
import { buildRedirectUri } from '../../api/auth/oauth';
import { SessionRepository } from '../../api/repository/session';
import { deserializeSession } from '../../middleware/session';
import { RouteBuilder } from '../../models/route-builder';
import { publicFolderPath } from '../../server/config';
import { validateClientId, validateOauthAppAndRedirect, validateRedirectUri } from '../../util/validation';

export const oauthRoutes: RouteBuilder = (app) => {
	app.get('/oauth', deserializeSession(), async (ctx) => {
		const clientId = validateClientId(ctx, ctx.query.clientId);
		const redirectUri = validateRedirectUri(ctx, ctx.query.redirectUri);

		const application = await validateOauthAppAndRedirect({ ctx, clientId, redirectUri });

		if (ctx.user) {
			// todo
			const isConsentRequired = false;

			if (!isConsentRequired) {
				const temporaryNonceSession = await SessionRepository.createSession(ctx.user, true /*isTemporaryNonce*/);

				ctx.redirect(buildRedirectUri({
					baseUri: redirectUri,
					userEmail: ctx.user.email,
					token: temporaryNonceSession.token
				}));
			} else {
				// todo: show consent screen
			}

			return;
		}

		await send(ctx, path.join(publicFolderPath, 'auth/login.html'));
	});

	app.use(serve(path.join(publicFolderPath, 'auth')));
};