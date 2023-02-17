import { useContext, useState } from 'react';
import { PageStateContext } from '../../context/page';
import { PageState } from '../../models/page';
import { LoginForm } from './login';
import { Card, CardHeader, CardContent } from '@mui/material';

const titleByPageState = {
	[PageState.login]: 'Login',
	[PageState.signup]: 'Sign Up',
	[PageState.oauthConsent]: 'Confirm Permissions',
	[PageState.forgotPassword]: 'Forgot Password'
} as const;

export const MainCarousel: React.FC = () => {
	const [error, setError] = useState('');
	const { pageState } = useContext(PageStateContext);

	const title = titleByPageState[pageState];

	return (
		<Card>
			<CardHeader>
				{title}
			</CardHeader>
			<CardContent>
				{pageState === PageState.login && <LoginForm/>}
				{pageState === PageState.signup && <LoginForm/>}
				{ error && <div>{error}</div> }
			</CardContent>
		</Card>
	);
};