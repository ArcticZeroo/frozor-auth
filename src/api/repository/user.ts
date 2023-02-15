import { User } from '@prisma/client';
import { prisma } from './client.js';

type UserCreateArgs = Pick<User, 'email' | 'passwordHash'>;

export abstract class UserRepository {
	public static async retrieveUserByEmail(email: string): Promise<User | null> {
		return prisma.user.findUnique({
			where: {
				email
			}
		});
	}

	public static async createUser(user: UserCreateArgs): Promise<User> {
		return prisma.user.create({
			data: user
		});
	}
}