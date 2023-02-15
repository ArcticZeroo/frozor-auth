import { Fields } from 'formidable';

export type FormFieldValue = Fields[keyof Fields] | undefined;

export interface IParsedForm {
    fields: Fields;
}