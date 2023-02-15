import { handleSignInSuccess } from '../../../api/auth/oauth.js';
import { doPasswordsMatch } from '../../../api/crypto/passwords.js';
import { UserRepository } from '../../../api/repository/user.js';
import { formParser } from '../../../middleware/forms.js';
import { deserializeSession, forbidIfUserIsSignedIn } from '../../../middleware/session.js';
import { RouteBuilder } from '../../../models/route-builder.js';
import { validateAuthForm, validateOauthAppAndRedirect } from '../../../util/validation.js';

export const loginRoutes: RouteBuilder = app => {
    app.post('/login', deserializeSession(), forbidIfUserIsSignedIn(), formParser(), async ctx => {
        const { email, password, clientId, redirectUri, scopes } = validateAuthForm(ctx);

        const application = await validateOauthAppAndRedirect({ ctx, clientId, redirectUri });

        const user = await UserRepository.retrieveUserByEmail(email);
        if (!user) {
            return ctx.throw(403, 'Forbidden: Invalid Credentials');
        }

        const isPasswordValid = await doPasswordsMatch({
            hashedPassword: user.passwordHash,
            plaintextPassword: password
        });

        if (!isPasswordValid) {
            return ctx.throw(403, 'Forbidden: Invalid Credentials');
        }

        await handleSignInSuccess({ ctx, user, application, scopes });
    });
};