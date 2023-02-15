import { handleSignInSuccess } from '../../../api/auth/oauth.js';
import { hashPassword } from '../../../api/crypto/passwords.js';
import { UserRepository } from '../../../api/repository/user.js';
import { formParser } from '../../../middleware/forms.js';
import { deserializeSession, forbidIfUserIsSignedIn } from '../../../middleware/session.js';
import { RouteBuilder } from '../../../models/route-builder.js';
import { validateAuthForm, validateOauthAppAndRedirect } from '../../../util/validation.js';

export const signupRoutes: RouteBuilder = app => {
	app.post('/signup', deserializeSession(), forbidIfUserIsSignedIn(), formParser(), async ctx => {
		const { email, password, clientId, redirectUri, scopes } = validateAuthForm(ctx);

		const application = await validateOauthAppAndRedirect({ ctx, clientId, redirectUri });

		const existingUser = await UserRepository.retrieveUserByEmail(email);
		if (existingUser) {
			return ctx.throw(403, 'Forbidden: User already exists');
		}

		const user = await UserRepository.createUser({
			email,
			passwordHash: await hashPassword(password)
		});

		await handleSignInSuccess({ ctx, user, application, scopes });
	});
};