import React, { Component } from 'react';
import { isControlledComponent, isControlledInput } from "../helpers/inputs";
import { getValidation, isFormValid, getFormValues } from "../helpers/validators";
import * as Mask from "../helpers/mask";

export default class Form extends Component {
  constructor(props) {
    super(props);
    let validations = Object.entries(this.props.formControl).flatMap(element => {
      if (element[1] && element[1].validation)
        return { [element[1].validation.output]: '' };
    }).filter(x => x);
    this.state = {
      form: this.props.formControl,
      validations: validations
    }
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(event) {
    var value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    var form = this.state.form;

    form = {
      ...form,
      [event.target.name]: {
        ...form[event.target.name],
        value: value
      }
    };
    this.setState({ form });
    if (this.props.onChangeForm) {
      this.props.onChangeForm(form);
    }
    if (this.props.onValid) {
      isFormValid(form).then(valid => this.props.onValid(valid));
    }
  }

  onBlur(e) {
    const {
      form,
    } = this.state;
    let validations = this.state.validations;
    Object.entries(form).forEach(async element => {
      const item = element[1];
      if (element[0] === e.target.name && item && item.validation) {
        const [output, valid, value] = await getValidation(item.validation, item.value, getFormValues(form));
        if (!valid)
          validations[output] = value;
        else
          validations[output] = '';
      }
      this.setState(validations);
    });
  }

  async isValid() {
    var isValid = true;
    var errors = [];
    const {
      form
    } = this.state;
    let validations = this.state.validations;
    for (const element of Object.entries(form)) {
      const item = element[1];
      if (item && item.validation) {
        const [output, valid, value] = await getValidation(item.validation, item.value, getFormValues(form));
        if (!valid) {
          validations[output] = value;
          errors.push({ field: element[0], value: value });
          isValid = false;
        }
        else
          validations[output] = '';
      }
    }
    this.setState(validations);
    return [isValid, errors];
  }

  processControlledChildren(parent) {
    var result = [];
    if (Array.isArray(parent)) {
      parent.forEach(element => {
        result.push(this.processElement(element));
      });
    } else {
      result.push(this.processElement(parent));
    }
    return result;
  }

  processProps(props, value) {
    let _onBlur = this.onBlur;
    if (typeof props.onBlur === "function") {
      const propBlur = props.onBlur;
      _onBlur = (e) => {
        this.onBlur(e);
        propBlur(e);
      }
    }

    let _onChange = this.onChange;
    if (typeof props.onChange === "function") {
      const propChange = props.onChange;
      _onChange = (e) => {
        this.onChange(e);
        propChange(e);
      }
    }
    switch (props.type) {
      case 'radio':
        return { checked: (value === props.value), ...props, onChange: _onChange, onBlur: _onBlur };
      case 'checkbox':
        return { checked: value, ...props, onChange: _onChange, onBlur: _onBlur };
      default:
        return { value: value, ...props, onChange: _onChange, onBlur: _onBlur };
    }
  }

  processElement(element) {
    const {
      validations
    } = this.state;
    if (Array.isArray(element))
      return this.processControlledChildren(element);
    if (element && element.props) {
      if ((element.props.formControlled || (element.type && isControlledComponent(element.type) && (element.type !== 'input' || isControlledInput(element.props.type)))) && this.state.form[element.props.name]) {
        const formItem = this.state.form[element.props.name]
        if (!formItem.ref)
          formItem.ref = React.createRef();
        var value = formItem.value;
        if (formItem.mask) {
          if (typeof formItem.mask === "function")
            value = formItem.mask(value);
          else if (Mask[formItem.mask])
            value = Mask[formItem.mask](value);
          else
            value = Mask.maskFormat(value, formItem.mask);
        }
        return { ...element, ref: formItem.ref, props: this.processProps(element.props, value) };
      }
      if (element.props.id && validations[element.props.id]) {
        return { ...element, props: { ...element.props, children: validations[element.props.id] } };
      }
      if (element.props.children) {
        return { ...element, props: { ...element.props, children: this.processControlledChildren(element.props.children) } };
      }
    }
    return element;
  }

  render() {
    const _onSubmit = async (event) => {
      event.preventDefault();
      if (this.props.onSubmit)
        this.props.onSubmit(getFormValues(this.state.form), await this.isValid());
      else
        console.log(this.state.form);
    }

    const {
      children,
      formControl,
      onChangeForm,
      onValid,
      ...props
    } = this.props;

    const childrenProcessed = this.processControlledChildren(children);

    return (
      <form {...props} onSubmit={_onSubmit}>
        {childrenProcessed}
      </form>
    );
  }
}
Form.defaultProps = {
  formControl: {},
};