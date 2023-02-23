import React, { useState } from 'react';
import styled from 'styled-components';
import { MainTabView } from './components/pages/tab-view';
import { EmailContext } from './context/auth';
import { PageStateContext } from './context/page';
import { PageState } from './models/page';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 1rem;
`;

function App() {
	const [pageState, setPageState] = useState(PageState.login);
	const [email, setEmail] = useState('');

	return (
		<PageStateContext.Provider value={{ pageState, setPageState }}>
			<EmailContext.Provider value={{ email, onEmailChanged: setEmail }}>
				<AppContainer>
					<MainTabView/>
				</AppContainer>
			</EmailContext.Provider>
		</PageStateContext.Provider>
	);
}

export default App;
