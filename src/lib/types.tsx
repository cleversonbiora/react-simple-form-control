import { Validators } from "./helpers/validators"

type IErro = {
    field: any;
    value: any;
}

type ISubmitValid = {
    valid: boolean;
    errors: IErro[];
}

type IValidator = {
    type: keyof typeof Validators;
    message: string;
    params?: string[];
    args?: string[];
    function?: (...args: any[]) => boolean;
}

type IValidation = {
    output: string;
    validators: IValidator[];
}

type IControl = {
    value: string | number;
    validation: IValidation;
    ref?: React.RefObject<any>;
    step?: string;

    mask?: (value: string | number) => string | string;
}

type IFormControl = {
    [key: string]: IControl
}

type IForm = {
    formControl: IFormControl,
    children: any;

    change?: (form: IFormControl) => void;
    valid?: (valid: boolean, form: IFormControl) => void;
    submit?: (form: IFormControl, valid: ISubmitValid) => void;
}

export type {
    IForm,
    IFormControl,
    IControl,
    IValidation,
    IValidator,
    ISubmitValid,
    IErro
}