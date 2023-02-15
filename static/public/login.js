const form = document.querySelector('form');

const emailElement = document.querySelector('#email');
const passwordElement = document.querySelector('#password');
const errorElement = document.querySelector('#error');

const queryParams = new URLSearchParams(document.location.search);
const clientId = queryParams.get('clientId');
const redirectUri = queryParams.get('redirectUri');

const minimumPasswordLength = 6;
const maximumPasswordLength = 72;

const buildRedirectUri = ({ baseUri, token, email }) => {
	const uri = new URL(baseUri);
	uri.searchParams.set('token', token);
	uri.searchParams.set('userEmail', email);
	return uri.toString();
};

const showError = error => errorElement.innerText = error;

const onSignInRequestSucceeded = email => async response => {
	if (!response.ok) {
		const bodyText = await response.text();
		showError(bodyText);
		return;
	}

	const bodyJson = await response.json();

	if (!bodyJson.isConsentRequired) {
		if (bodyJson.nonce) {
			document.location.assign(buildRedirectUri({
				baseUri: redirectUri,
				token: bodyJson.nonce,
				email
			}));
		} else {
			// we've logged in since response is ok... but no nonce is here.
			// so we should just reload and let the server generate a new redirect
			document.location.reload();
		}
	} else {
		// todo: switch to consent screen
	}
};

const onSignInRequestFailed = response => {

};

const validateSignInRequestComplete = (currentSymbol, callback) => {
	return res => {
		if (currentSymbol !== signInSymbol) {
			return;
		}

		return callback(res);
	};
};

/**
 * @type {Symbol | undefined}
 */
let signInSymbol = undefined;
const performSignIn = ({ email, password }) => {
	const formData = new FormData();

	formData.append('email', email);
	formData.append('password', password);
	formData.append('client-id', clientId);
	formData.append('redirect-uri', redirectUri);

	const currentSymbol = Symbol();
	signInSymbol = currentSymbol;
	fetch('/auth/login', {
		method: 'post',
		credentials: 'include',
		body: formData
	})
		.then(validateSignInRequestComplete(currentSymbol, onSignInRequestSucceeded(email)))
		.catch(validateSignInRequestComplete(currentSymbol, onSignInRequestFailed));
};

form.addEventListener('submit', event => {
	event.preventDefault();

	const email = emailElement.value;
	const password = passwordElement.value;

	console.log(password.length);

	if (password.length < minimumPasswordLength) {
		showError(`Password is too short! Minimum length: ${minimumPasswordLength} characters`);
		return;
	}

	if (password.length > maximumPasswordLength) {
		showError(`Password is too long! Maximum length: ${maximumPasswordLength} characters`);
		return;
	}

	showError('');

	performSignIn({ email, password });
});