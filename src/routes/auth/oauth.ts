import send from 'koa-send';
import { buildRedirectUri } from '../../api/auth/oauth.js';
import { SessionRepository } from '../../api/repository/session.js';
import { deserializeSession } from '../../middleware/session.js';
import { RouteBuilder } from '../../models/route-builder.js';
import { staticFolderPath } from '../../server/config.js';
import { validateClientId, validateOauthAppAndRedirect, validateRedirectUri } from '../../util/validation.js';

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

		await send(ctx, 'auth/login.html', { root: staticFolderPath });
	});
};