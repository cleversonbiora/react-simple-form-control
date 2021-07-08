import React, { useState } from 'react';

import { isControlledComponent, isControlledInput } from '../helpers/inputs';
import { IControl, IForm, IFormControl } from '../types';
import * as Mask from "../helpers/mask";
import { getFormValues, getValidation, isFormValid } from '../helpers/validators';

type IValidation = {
    [key: string]: string
}

type IElement = {
    props: any;
    type: string;
}

type IProcessProps = {
    value: any;
    id: string;
    name: string;
    type: string;

    onBlur?: (e: any) => void;
    onChange?: (e: any) => void;
}

const Form = ({ formControl, children, change, valid, submit }: IForm, props: any) => {

    const [form, setForm] = useState(formControl);
    const [validations, setValidations] = useState<IValidation>(formatValidations(formControl));


    function formatValidations(_formControl: IFormControl) {
        const _validations = Object.entries(formControl)
            .filter(e => e[1] && e[1].validation)
            .flatMap<IValidation>((element: any) => {
                return { [element[1].validation.output]: '' };
            }).filter(x => x);
        return _validations as unknown as IValidation;
    }

    function processControlledChildren(parent: IElement[] | IElement) {
        let result: Array<any> = [];
        if (Array.isArray(parent)) {
            parent.forEach(element => {
                result.push(processElement(element));
            });
        } else {
            result.push(processElement(parent));
        }
        return result;
    }

    function processElement(element: IElement[] | IElement) {
        if (Array.isArray(element))
            return processControlledChildren(element);
        if (element && element?.props) {
            if (isElementControlled(element)) {
                const formItem = form[element.props.name];
                if (!formItem.ref)
                    formItem.ref = React.createRef();
                const value = applyMask(formItem);
                return { ...element, ref: formItem.ref, props: processProps(element.props, value) };
            }
            if (element.props.id && validations[element.props.id]) {
                return { ...element, props: { ...element.props, children: validations[element.props.id] } };
            }
            if (element.props.children) {
                return { ...element, props: { ...element.props, children: processControlledChildren(element.props.children) } };
            }
        }
        return element;
    }

    function isElementControlled(element: IElement) {
        const isController = element.props.formControlled ||
            (element.type && isControlledComponent(element.type) && (element.type !== 'input' || isControlledInput(element.props.type)));
        return isController && form[element.props.name];
    }

    function applyMask(formItem: IControl) {
        let value: string | number = formItem.value;
        if (formItem.mask) {
            if (typeof formItem.mask === "function")
                value = formItem.mask(value);
            else if (Mask[formItem.mask]) {
                const mask: (v: string | number) => string | number = Mask[formItem.mask];
                value = mask(value);
            }
            else
                value = Mask.maskFormat(`${value}`, formItem.mask);
        }
        return value;
    }

    function processProps(props: IProcessProps, value: string | number) {
        let _onBlur = elementBlur;
        if (typeof props.onBlur === "function") {
            const propBlur = props.onBlur;
            _onBlur = (e) => {
                elementBlur(e);
                propBlur(e);
            }
        }

        let _onChange = elementChange;
        if (typeof props.onChange === "function") {
            const propChange = props.onChange;
            _onChange = (e) => {
                elementChange(e);
                propChange(e);
            }
        }
        switch (props.type) {
            case 'radio':
                return { checked: (value === props.value), ...props, onChange: _onChange, onBlur: _onBlur };
            case 'checkbox':
                return { checked: value, ...props, onChange: _onChange, onBlur: _onBlur };
            default:
                return { ...props, value: value, onChange: _onChange, onBlur: _onBlur };
        }
    }

    function elementBlur(event: any) {
        let _validations = { ...validations };
        Object.entries(form).forEach(async element => {
            const item = element[1];
            if (element[0] === event.target.name && item && item.validation) {
                const { output, valid, errorMessage } = await getValidation(item.validation, item.value, getFormValues(form));
                if (!valid)
                    _validations[output] = errorMessage;
                else
                    _validations[output] = '';
            }
            setValidations(_validations);
        });
    }

    function elementChange(event: any) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        let _form = { ...form };

        _form = {
            ..._form,
            [event.target.name]: {
                ..._form[event.target.name],
                value: value
            }
        };
        setForm(_form);
        if (change) {
            change(_form);
        }
        if (valid) {
            isFormValid(_form).then(_valid => valid(_valid, getFormValues(_form)));
        }
    }

    async function isValid() {
        let isValid = true;
        let errors = [];
        let _validations = { ...validations };
        for (const element of Object.entries(form)) {
            const item = element[1];
            if (item && item.validation) {
                const { output, valid, errorMessage } = await getValidation(item.validation, item.value, getFormValues(form));
                if (!valid) {
                    _validations[output] = errorMessage;
                    errors.push({ field: element[0], value: errorMessage });
                    isValid = false;
                }
                else
                    _validations[output] = '';
            }
        }
        setValidations(_validations);
        return { valid: isValid, errors };
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (submit)
            submit(getFormValues(form), await isValid());
        else
            console.log(`React-Simple-Form-Control -> submit not set`);
    }

    const childrenProcessed = processControlledChildren(children);

    return (
        <form {...props} onSubmit={handleSubmit}>
            {childrenProcessed}
        </form>
    );
};

export default Form;