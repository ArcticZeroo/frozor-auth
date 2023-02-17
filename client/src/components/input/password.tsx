import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';

interface IPasswordInputProps {
	password: string,
	showPassword: boolean,
	errorText?: string,

	onPasswordChanged(password: string): void,

	onShowPasswordChanged(showPassword: boolean): void
}

export const PasswordInput: React.FC<IPasswordInputProps> = ({
	                                                             password,
	                                                             showPassword,
	                                                             onPasswordChanged,
	                                                             onShowPasswordChanged,
	                                                             errorText
                                                             }) => {
	const onShowPasswordButtonClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		onShowPasswordChanged(!showPassword);
	};

	return (
		<div>
			<TextField id="password" label="Password"
			           value={password}
			           onChange={event => onPasswordChanged(event.target.value)}
			           type={showPassword ? 'text' : 'password'}
			           error={errorText != null}
			           helperText={errorText}
			/>
			<IconButton aria-label="password-visibility" onClick={onShowPasswordButtonClicked}>
				{
					showPassword && <Visibility/>
				}
				{
					!showPassword && <VisibilityOff/>
				}
			</IconButton>
		</div>
	);
};