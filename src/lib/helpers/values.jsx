export function getVariables(value) {
    let variables = [],
        regex = /{([\w-_]{1,})}/g,
        val = `${value}`,
        match;

    while ((match = regex.exec(val))) {
        variables.push(match[1]);
    }
    return variables;
}

export function isVariable(value) {
    let val = `${value}`;
    if (val.startsWith('{') && val.endsWith('}'))
        return true;
    return false;
}

export function getVariableString(value) {
    let val = `${value}`;
    return val.substring(1, val.length - 1);
}

export function getFormValue(formId, id, values) {
    let val = "";
    if (values[formId])
        if (values[formId][id])
            val = values[formId][id];
    return val;
}

export function mergeValues(values) {
    let forms = Object.keys(values).map(function (e) { return values[e] });
    // eslint-disable-next-line
    let mergedValues = {};
    if (forms.length > 0)
        mergedValues = Object.assign(...forms);
    return mergedValues;
}

export function isUpperCase(str) {
    let regexp = /^[A-Z]/;
    if (regexp.test(str))
        return true;
    else
        return false;
}