import React from 'react';
import { PageState } from '../models/page';

export interface IPageStateContext {
	pageState: PageState,
	setPageState: (newPage: PageState) => void
}

export const PageStateContext = React.createContext<IPageStateContext>({
	pageState: PageState.login,
	setPageState: () => {}
});