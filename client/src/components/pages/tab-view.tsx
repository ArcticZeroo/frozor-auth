import React, { useContext, useState } from 'react';
import { PageStateContext } from '../../context/page';
import { PageState } from '../../models/page';
import { LoginForm } from './login';
import { Card, CardHeader, CardContent, Box, Tab, Tabs } from '@mui/material';
import styled from 'styled-components';
import { SignupForm } from './signup';

const titleByPageState = {
	[PageState.login]: 'Login',
	[PageState.signup]: 'Sign Up',
	[PageState.oauthConsent]: 'Confirm Permissions',
	[PageState.forgotPassword]: 'Forgot Password'
} as const;

const FormContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MainTabView: React.FC = () => {
	const [error, setError] = useState('');
	const { pageState } = useContext(PageStateContext);
	const [tabIndex, setTabIndex] = useState(0);

	const onTabChanged = (event: React.SyntheticEvent, newTabIndex: number) => {
		setTabIndex(newTabIndex);
	};

	return (
		<Card>
			<CardContent>
				<Tabs
					value={tabIndex}
					onChange={onTabChanged}
					indicatorColor="secondary"
					textColor="inherit"
					variant="fullWidth"
				>
					<Tab label="Log In"/>
					<Tab label="Sign Up"/>
					<Tab label="Forgot Password"/>
				</Tabs>
				<FormContainer>
					{tabIndex === 0 && <LoginForm/>}
					{tabIndex === 1 && <SignupForm/>}
				</FormContainer>
				{ error && <div>{error}</div> }
			</CardContent>
		</Card>
	);
};