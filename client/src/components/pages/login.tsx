import { Button } from '@mui/material';
import { useState } from 'react';
import { EmailInput } from '../input/email';
import { PasswordInput } from '../input/password';

export const LoginForm: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
	};

	return (
		<>
			<EmailInput email={email} onEmailChanged={setEmail}
			            id="email" label="Email"/>
			<PasswordInput password={password} onPasswordChanged={setPassword}
			               showPassword={showPassword} onShowPasswordChanged={setShowPassword}/>
			<Button variant="contained" onClick={onSubmit}>
				Log In
			</Button>
		</>
	);
};