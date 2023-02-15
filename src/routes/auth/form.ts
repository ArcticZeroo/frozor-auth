import { doPasswordsMatch } from '../../api/crypto/passwords.js';
import { SessionRepository } from '../../api/repository/session.js';
import { UserRepository } from '../../api/repository/user.js';
import { cookieNames } from '../../constants/cookies.js';
import { formParser } from '../../middleware/forms.js';
import { deserializeSession } from '../../middleware/session.js';
import { RouteBuilder } from '../../models/route-builder.js';
import { setCookie } from '../../util/cookie.js';
import {
    isValidEmail,
    isValidPassword,
    validateClientId,
    validateOauthAppAndRedirect,
    validateRedirectUri,
    validateRequestValue
} from '../../util/validation.js';

export const formRoutes: RouteBuilder = app => {
    app.post('/login', deserializeSession(), formParser(), async ctx => {
        if (ctx.user) {
            ctx.throw(403, 'Forbidden: User is already authenticated');
            return;
        }

        const formFields = ctx.state.form?.fields;

        if (!formFields) {
            ctx.throw(400, 'Bad Request: Invalid form data');
            return;
        }

        const email = validateRequestValue(ctx, formFields['email'], 'Email', isValidEmail /*validator*/);
        const password = validateRequestValue(ctx, formFields['password'], 'Password', isValidPassword /*validator*/);
        const clientId = validateClientId(ctx, formFields['client-id']);
        const redirectUri = validateRedirectUri(ctx, formFields['redirect-uri']);

        const application = await validateOauthAppAndRedirect({ ctx, clientId, redirectUri });

        const user = await UserRepository.retrieveUserByEmail(email);
        if (!user) {
            ctx.throw(403, 'Forbidden: Invalid Credentials');
            return;
        }

        const isPasswordValid = await doPasswordsMatch({
            hashedPassword: user.passwordHash,
            plaintextPassword: password
        });

        if (!isPasswordValid) {
            ctx.throw(403, 'Forbidden: Invalid Credentials');
            return;
        }

        ctx.user = user;

        const session = await SessionRepository.createSession(user, false /*isTemporaryNonce*/);

        setCookie(ctx, cookieNames.sessionId, session.token);

        const isConsentRequired = false;

        if (isConsentRequired) {
            ctx.body = {
                isConsentRequired: true
            }
        } else {
            const temporaryNonceSession = await SessionRepository.createSession(user, true /*isTemporaryNonce*/);

            ctx.body = {
                isConsentRequired: false,
                nonce: temporaryNonceSession.token
            }
        }
    });
};