import { Context } from 'koa';

export const setCookie = (ctx: Context, name: string, value: string) => {
	ctx.headers['access-control-allow-credentials'] = 'true';
	ctx.headers['access-control-allow-origin'] = 'too: the origin here';
	ctx.cookies.set(name, value);
}