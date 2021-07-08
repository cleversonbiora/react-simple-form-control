import { IFormControl, IValidation } from "../types";
import { isVariable, getVariableString, getVariables } from "./values";

export function getFormValues(form: any) {
    let values: { [key: string]: any } = {};
    Object.entries(form).forEach((element: any) => {
        values[element[0]] = element[1].value;
    });
    return values;
}

export async function isFormValid(form: IFormControl) {
    for (const element of Object.entries(form)) {
        const item = element[1];
        if (item && item.validation) {
            // eslint-disable-next-line
            const { valid } = await getValidation(item.validation, item.value, getFormValues(form));
            if (!valid)
                return false;
        }
    }
    return true;
}

export async function isStepValid(form: IFormControl, param: string | string[]) {
    if (Array.isArray(param)) {
        for (const element of Object.entries(form).filter(x => param.includes(x[0]))) {
            const item = element[1];
            if (item && item.validation) {
                // eslint-disable-next-line
                const { valid } = await getValidation(item.validation, item.value, getFormValues(form));
                if (!valid)
                    return false;
            }
        }
    } else {
        for (const element of Object.entries(form).filter(x => x[1] && x[1].step && x[1].step === param)) {
            const item = element[1];
            if (item && item.validation) {
                // eslint-disable-next-line
                const { valid } = await getValidation(item.validation, item.value, getFormValues(form));
                if (!valid)
                    return false;
            }
        }
    }

    return true;
}

export async function getValidation(validation: IValidation, value: string | number, values: any = {}) {
    let valid = true;
    let errorMessage = "";
    let output = validation.output;
    for (const element of validation.validators) {
        if (!Validators[element.type])
            continue;
        if (element.type === 'async') {
            const result = await Validators[element.type](element, values);
            if (!result) {
                valid = false;
                errorMessage = element.message;
            }
        } else if (element.type === 'custom') {
            if (element.params) {
                let params = element.params.map(val => isVariable(val) ? values[getVariableString(val)] : val);
                if (!Validators[element.type](element, [value, ...params])) {
                    valid = false;
                    errorMessage = element.message;
                }
            }
            else {
                if (!Validators[element.type](element, [value])) {
                    valid = false;
                    errorMessage = element.message;
                }
            }
        } else if (element.params) {
            let params = element.params.map(val => isVariable(val) ? values[getVariableString(val)] : val);
            const call = Validators[element.type] as any;
            if (!call(value, ...params)) {
                valid = false;
                errorMessage = element.message;
            }
        } else {
            const call = Validators[element.type] as any;
            if (!call(value)) {
                valid = false;
                errorMessage = element.message;
            }
        }
        if (!valid)
            break;
    }
    return { output, valid, errorMessage };
}

export class Validators {

    static required(value: string | number) {
        if (!value) {
            return false;
        }
        return true;
    }

    static nullValidator(value: string | number) {
        if (value == null) {
            return false;
        }
        return true;
    }

    static min(value: string | number, arg: number) {
        var val = Number(value);
        if (val < arg) {
            return false;
        }
        return true;
    }

    static max(value: string | number, arg: number) {
        var val = Number(value);
        if (val > arg) {
            return false;
        }
        return true;
    }

    static minLength(value: string | number, arg: number) {
        var val = `${value}`;
        if (val.length < arg) {
            return false;
        }
        return true;
    }

    static maxLength(value: string | number, arg: number) {
        var val = `${value}`;
        if (val.length > arg) {
            return false;
        }
        return true;
    }

    static email(value: string) {
        return Validators.pattern(value, "^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");
    }

    static pattern(value: any, arg: any) {
        const val = `${value}`;
        const re = new RegExp(arg);
        return re.test(String(val));
    }

    static custom(rule: any, args: any) {
        if (rule.function && rule.function instanceof Function)
            return rule.function(...args);
        else {
            // eslint-disable-next-line
            let jsonFunc: Function;
            if (rule.args) {
                // eslint-disable-next-line
                jsonFunc = new Function("value", ...rule.args, rule.body);
            } else {
                // eslint-disable-next-line
                jsonFunc = new Function("value", rule.body);
            }
            return jsonFunc(...args)
        }

    }

    static async async(rule: any, values: any) {
        const { apiUrl, method, headers, valueField, root, body } = rule;
        var apiUrlVariabel = `${apiUrl}`;
        var variables = getVariables(apiUrl);
        variables.forEach(match => {
            if (values[match])
                apiUrlVariabel = apiUrlVariabel.replace('{' + match + '}', values[match]);
            else
                apiUrlVariabel = apiUrlVariabel.replace('{' + match + '}', "");
        });

        let bodyVariable: string | null | undefined = null;
        if (body) {
            bodyVariable = `${body}`;
            var vars = getVariables(body);
            vars.forEach(match => {
                if (values[match])
                    bodyVariable = bodyVariable?.replace('{' + match + '}', values[match]);
                else
                    bodyVariable = bodyVariable?.replace('{' + match + '}', "");
            });
        }

        const result = await fetch(apiUrlVariabel, { method: method || 'GET', headers: headers, body: bodyVariable })
            .then(response => response.json())
            .then(data => {
                if (!data)
                    return false;
                return root ? data[root][valueField] : data[valueField];
            });
        return result;
    }

}