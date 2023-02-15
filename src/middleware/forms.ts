import formidable from 'formidable';
import { IncomingMessage } from 'http';
import { Middleware } from 'koa';
import { httpContentType } from '../constants/content-type.js';
import { IParsedForm } from '../models/form.js';
import { IKoaState } from '../models/koa.js';
import { suppressPromiseError } from '../util/async.js';

const allowedContentTypes = [httpContentType.formMultipart, httpContentType.formMultipart];

const parseForm = async (request: IncomingMessage, options?: formidable.Options): Promise<IParsedForm> => {
    const form = formidable(options);

    return new Promise((resolve, reject) => {
        form.parse(request, (err, fields, /*files*/) => {
            if (err) {
                return reject(err);
            }

            resolve({
                fields
            });
        });
    });
};

export const formParser = (): Middleware<IKoaState> => {
    return async (ctx, next) => {
        ctx.state.form = await suppressPromiseError(parseForm(ctx.req));
        return next();
    };
};