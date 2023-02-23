import { Button } from '@mui/material';
import React, { useState } from 'react';
import { EmailInput } from '../input/email';
import { PasswordInput } from '../input/password';

interface ILoginFormProps {
	email: string,
	onEmailChanged(email: string): void
}

export const LoginForm: React.FC<ILoginFormProps> = ({ email, onEmailChanged }) => {
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
	};

	return (
		<>
			<EmailInput email={email} onEmailChanged={onEmailChanged}
			            id="email" label="Email"/>
			<PasswordInput password={password} onPasswordChanged={setPassword}
			               showPassword={showPassword} onShowPasswordChanged={setShowPassword}/>
			<Button variant="contained" onClick={onSubmit}>
				Log In
			</Button>
		</>
	);
};