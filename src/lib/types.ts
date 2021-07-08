import { Validators } from "./helpers/validators"

export type IErro = {
    field: any;
    value: any;
}

export type ISubmitValidation  = {
    valid: boolean;
    errors: IErro[];
}

export type IValidator = {
    type: keyof typeof Validators;
    message: string;
    params?: string[];
    args?: string[];
    function?: (...args: any[]) => boolean;
}

export type IValidation = {
    output: string;
    validators: IValidator[];
}

export type IControl = {
    value: string | number;
    validation: IValidation;
    ref?: React.RefObject<any>;
    step?: string;

    mask?: (value: string | number) => string | string;
}

export type IFormControl = {
    [key: string]: IControl
}

export type IForm = {
    formControl: IFormControl,
    children: any;

    change?: (form: IFormControl) => void;
    valid?: (valid: boolean, form: IFormControl) => void;
    submit?: (form: IFormControl, validation: ISubmitValidation) => void;
}