import { Middleware } from 'koa';
import { SessionRepository } from '../api/repository/session';
import { cookieNames } from '../constants/cookies';

export const deserializeSession = (): Middleware => async (ctx) => {
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

	ctx.user = session.user;
};