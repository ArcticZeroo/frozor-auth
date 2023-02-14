import { generateSessionId } from '../../api/crypto/keygen';
import { doPasswordsMatch } from '../../api/crypto/passwords';
import { ApplicationRepository } from '../../api/repository/app';
import { SessionRepository } from '../../api/repository/session';
import { UserRepository } from '../../api/repository/user';
import { cookieNames } from '../../constants/cookies';
import { formParser } from '../../middleware/forms.js';
import { RouteBuilder } from '../../models/route-builder.js';
import { setCookie } from '../../util/cookie';
import {
    isRedirectUriAllowed,
    isValidEmail,
    isValidHttpsUrl,
    isValidPassword,
    validateRequestValue
} from '../../util/validation.js';

export const formRoutes: RouteBuilder = app => {
    app.post('/login', formParser(), async ctx => {
        const formFields = ctx.state.form?.fields;

        if (!formFields) {
            ctx.throw(400, 'Bad Request: Invalid form data');
            return;
        }

        const email = validateRequestValue(ctx, formFields['email'], 'Email', isValidEmail /*validator*/);
        const password = validateRequestValue(ctx, formFields['password'], 'Password', isValidPassword /*validator*/);
        const clientId = validateRequestValue(ctx, formFields['client-id'], 'Client ID', clientId => Boolean(clientId.length) /*validator*/);
        const redirectUri = validateRequestValue(ctx, formFields['redirect-uri'], 'Redirect URI', isValidHttpsUrl /*validator*/);

        const application = await ApplicationRepository.retrieveApplicationByClientId(clientId);
        if (!application) {
            ctx.throw(403, 'Forbidden: Invalid client id');
            return;
        }

        if (!isRedirectUriAllowed(redirectUri, application.allowedRedirectUris)) {
            ctx.throw(403, 'Forbidden: Disallowed redirect URI')
        }

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