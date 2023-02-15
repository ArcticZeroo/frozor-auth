import { Application, User } from '@prisma/client';
import { ServiceContext } from '../../models/koa';

interface IHandleOauthConsentParams {
	ctx: ServiceContext,
	user: User,
	application: Application
}

export const handleOauthConsent = ({ ctx, user, application }: IHandleOauthConsentParams) => {
	const isConsentRequired = false;
};

interface IBuildRedirectUriParams {
	baseUri: string,
	token: string,
	userEmail: string
}

export const buildRedirectUri = ({ baseUri, token, userEmail }: IBuildRedirectUriParams): string => {
	const redirectUri = new URL(baseUri);
	redirectUri.searchParams.set('token', token);
	redirectUri.searchParams.set('userEmail', userEmail);
	return redirectUri.toString();
};