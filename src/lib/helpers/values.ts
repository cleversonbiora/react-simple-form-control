export function getVariables(value: any) {
    let variables = [],
        regex = /{([\w-_]{1,})}/g,
        val = `${value}`,
        match;

    while ((match = regex.exec(val))) {
        variables.push(match[1]);
    }
    return variables;
}

export function isVariable(value: any) {
    let val = `${value}`;
    if (val.startsWith('{') && val.endsWith('}'))
        return true;
    return false;
}

export function getVariableString(value: string) {
    let val = `${value}`;
    return val.substring(1, val.length - 1);
}

export function getFormValue(formId: string, id: string, values: any) {
    let val = "";
    if (values[formId])
        if (values[formId][id])
            val = values[formId][id];
    return val;
}

export function mergeValues(values: any) {
    let forms = Object.keys(values).map(function (e) { return values[e] });
    // eslint-disable-next-line
    let mergedValues = {};
    if (forms.length > 0)
        mergedValues = Object.assign({ ...forms });
    return mergedValues;
}

export function isUpperCase(str: string) {
    let regexp = /^[A-Z]/;
    if (regexp.test(str))
        return true;
    else
        return false;
}