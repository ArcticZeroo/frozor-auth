import Duration from '@arcticzeroo/duration';
import { Session, User } from '@prisma/client';
import { generateSessionId } from '../crypto/keygen.js';
import { prisma } from './client.js';

const expirationTimeByType = {
	temporary: new Duration({ minutes: 10 }),
	session: new Duration({ hours: 2 })
}

export abstract class SessionRepository {
	public static async createSession(user: User, isTemporaryNonce: boolean): Promise<Session> {
		const expirationTime = isTemporaryNonce ? expirationTimeByType.temporary : expirationTimeByType.session;

		return prisma.session.create({
			data: {
				createdAt: new Date(),
				expiresAt: new Date(Date.now() + expirationTime.inMilliseconds),
				userEmail: user.email,
				token: generateSessionId(),
				isTemporaryNonce
			}
		});
	}

	public static async getSessionByIdAsync(sessionId: string): Promise<Session & { user: User } | null> {
		return prisma.session.findUnique({
			where: {
				token: sessionId
			},
			include: {
				user: true
			}
		});
	}
}