import { Application } from '@prisma/client';
import { prisma } from './client';

export abstract class ApplicationRepository {
	public static retrieveApplicationByClientId(clientId: string): Promise<Application | null> {
		return prisma.application.findFirst({
			where: {
				clientId
			}
		});
	}
}