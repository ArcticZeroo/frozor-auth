import { Button } from '@mui/material';
import React, { useState } from 'react';
import { EmailInput } from '../input/email';
import { PasswordInput } from '../input/password';

export const SignupForm: React.FC = () => {
	const [email, setEmail] = useState('');
	const [confirmEmail, setConfirmEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
	};

	return (
		<>
			<EmailInput email={email} onEmailChanged={setEmail}
			            id="email" label="Email"/>
			<EmailInput email={confirmEmail} onEmailChanged={setConfirmEmail}
			            id="confirm-email" label="Confirm Email"/>
			<PasswordInput password={password} onPasswordChanged={setPassword}
			               showPassword={showPassword} onShowPasswordChanged={setShowPassword}/>
			<Button variant="contained" onClick={onSubmit}>
				Sign Up
			</Button>
		</>
	);
};
