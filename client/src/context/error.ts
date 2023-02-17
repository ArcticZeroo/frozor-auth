import React from 'react';

interface IErrorContext {
	error: string,
	setError: (newError: string) => void
}

export const ErrorContext = React.createContext<IErrorContext>({
	error:    '',
	setError: () => {
	}
});