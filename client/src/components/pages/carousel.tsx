import { useContext, useState } from 'react';
import { PageStateContext } from '../../context/page';
import { PageState } from '../../models/page';
import { LoginForm } from './login';
import { Card, CardHeader, CardContent } from '@mui/material';
import styled from 'styled-components';

const titleByPageState = {
	[PageState.login]: 'Login',
	[PageState.signup]: 'Sign Up',
	[PageState.oauthConsent]: 'Confirm Permissions',
	[PageState.forgotPassword]: 'Forgot Password'
} as const;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

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
				<FormContainer>
					{pageState === PageState.login && <LoginForm/>}
					{pageState === PageState.signup && <LoginForm/>}
				</FormContainer>
				{ error && <div>{error}</div> }
			</CardContent>
		</Card>
	);
};