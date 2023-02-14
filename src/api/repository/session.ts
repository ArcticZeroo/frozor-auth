import { User } from '@prisma/client';

export abstract class SessionRepository {
	public static async createSession(user: User, isTemporaryNonce: boolean) {
	}
}