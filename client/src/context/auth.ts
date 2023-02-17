import React from 'react';

interface IEmailContext {
	email: string,

	onEmailChanged(email: string): void
}

export const EmailContext = React.createContext<IEmailContext>({
	email:          '',
	onEmailChanged: () => {
	}
});