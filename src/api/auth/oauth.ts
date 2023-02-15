import { Application, User } from '@prisma/client';
import { cookieNames } from '../../constants/cookies.js';
import { StatefulContext } from '../../models/koa.js';
import { setCookie } from '../../util/cookie.js';
import { SessionRepository } from '../repository/session.js';

interface IHandleOauthConsentParams {
	ctx: StatefulContext,
	user: User,
	application: Application,
	scopes: string[]
}

export const handleSignInSuccess = async ({ ctx, user, application, scopes }: IHandleOauthConsentParams) => {
	ctx.state.user = user;

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
};

interface IBuildRedirectUriParams {
	baseUri: string,
	token: string,
	userEmail: string
}

export const buildRedirectUri = ({ baseUri, token, userEmail }: IBuildRedirectUriParams): string => {
	const redirectUri = new URL(baseUri);
	redirectUri.searchParams.set('token', token);
	redirectUri.searchParams.set('userEmail', userEmail);
	return redirectUri.toString();
};