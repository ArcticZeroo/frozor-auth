import Duration from '@arcticzeroo/duration';
import { Session, User } from '@prisma/client';
import { generateSessionId } from '../crypto/keygen';
import { prisma } from './client';

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
}