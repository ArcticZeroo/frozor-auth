import { useContext, useState } from 'react';
import { EmailContext } from '../../context/auth';
import { ErrorContext } from '../../context/error';
import { EmailInput } from '../input/email';
import { PasswordInput } from '../input/password';

export const LoginForm: React.FC = () => {
	const [email, setEmail] = useState('');
	const [confirmEmail, setConfirmEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
			<EmailInput email={email} onEmailChanged={setEmail}
			            id="email" label="Email"/>
			<EmailInput email={confirmEmail} onEmailChanged={setConfirmEmail}
			            id="confirm-email" label="Confirm Email"/>
			<PasswordInput password={password} onPasswordChanged={setPassword}
			               showPassword={showPassword} onShowPasswordChanged={setShowPassword}/>
		</>
	);
};