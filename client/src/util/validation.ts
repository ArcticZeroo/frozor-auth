import { maximumPasswordLength, minimumPasswordLength } from '../../../src/constants/passwords';

export const validatePassword = (password: string): string | undefined => {
	if (password.length < minimumPasswordLength) {
		return `Too short! Must be at least ${minimumPasswordLength} characters.`;
	}

	if (password.length > maximumPasswordLength) {
		return `Too long! Must be at most ${maximumPasswordLength} characters.`;
	}
};
