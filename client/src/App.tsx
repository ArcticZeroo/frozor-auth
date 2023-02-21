import React, { useState } from 'react';
import { MainTabView } from './components/pages/tab-view';
import { EmailContext } from './context/auth';
import { PageStateContext } from './context/page';
import { PageState } from './models/page';

function App() {
	const [pageState, setPageState] = useState(PageState.login);
	const [email, setEmail] = useState('');

	return (
		<PageStateContext.Provider value={{ pageState, setPageState }}>
			<EmailContext.Provider value={{ email, onEmailChanged: setEmail }}>
				<MainTabView/>
			</EmailContext.Provider>
		</PageStateContext.Provider>
	);
}

export default App;
