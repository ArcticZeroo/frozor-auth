import { TextField } from '@mui/material';

interface IEmailInputProps {
	email: string,
	id: string,
	label: string,
	errorText?: string,
	onEmailChanged(email: string): void
}

export const EmailInput: React.FC<IEmailInputProps> = ({ email, id, label, errorText, onEmailChanged }) => {
	return (
		<TextField id={id} label={label} variant="outlined"
		           value={email}
		           onChange={event => onEmailChanged(event.target.value)}
		           error={errorText != null}
		           helperText={errorText}
		/>
	);
};