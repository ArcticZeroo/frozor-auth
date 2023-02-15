import { Middleware } from 'koa';
import { SessionRepository } from '../api/repository/session.js';
import { cookieNames } from '../constants/cookies.js';
import { ServiceContext } from '../models/koa';

export const retrieveUserFromContext = async (ctx: ServiceContext) => {
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