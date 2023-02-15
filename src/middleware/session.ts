import { Middleware } from 'koa';
import { SessionRepository } from '../api/repository/session.js';
import { cookieNames } from '../constants/cookies.js';
import { StatefulContext } from '../models/koa.js';

export const retrieveUserFromContext = async (ctx: StatefulContext) => {
	if (ctx.state.user) {
		return;
	}

	const sessionId = ctx.cookies.get(cookieNames.sessionId);

	if (!sessionId) {
		return;
	}

	const session = await SessionRepository.getSessionByIdAsync(sessionId);

	if (!session) {
		return;
	}

	if (Date.now() >= session.expiresAt.getTime()) {
		return;
	}

	return session.user;
}

export const deserializeSession = (): Middleware => async (ctx, next) => {
	const user = await retrieveUserFromContext(ctx);
	if (user) {
		ctx.state.user = user;
	}

	return next();
};

export const forbidIfUserIsSignedIn = (): Middleware => (ctx, next) => {
	if (ctx.state.user) {
		ctx.throw(403, 'Forbidden: User is already signed in');
		return;
	}

	return next();
};