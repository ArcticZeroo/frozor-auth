import { User } from '@prisma/client';
import { prisma } from './client';

export abstract class UserRepository {
	public static async retrieveUserByEmail(email: string): Promise<User | null> {
		return prisma.user.findUnique({
			where: {
				email
			}
		});
	}
}