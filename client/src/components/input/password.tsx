import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import styled from 'styled-components';

const PasswordInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;

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
		<PasswordInputContainer>
			<TextField id="password" label="Password"
			           value={password}
			           onChange={event => onPasswordChanged(event.target.value)}
			           type={showPassword ? 'text' : 'password'}
			           error={errorText != null}
			           helperText={errorText}
			           fullWidth
			/>
			<IconButton
				aria-label={showPassword ? 'Click to hide password' : 'Click to show password'}
				onClick={onShowPasswordButtonClicked}
			>
				{
					showPassword && <Visibility/>
				}
				{
					!showPassword && <VisibilityOff/>
				}
			</IconButton>
		</PasswordInputContainer>
	);
};