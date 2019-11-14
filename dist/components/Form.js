var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import { isControlledComponent, isControlledInput } from "../helpers/inputs";
import { getValidation } from "../helpers/validators";
import * as Mask from "../helpers/mask";

export default class Form extends Component {
  constructor(props) {
    super(props);
    let validations = Object.entries(this.props.formControl).flatMap(element => {
      if (element[1] && element[1].validation) return { [element[1].validation.output]: '' };
    }).filter(x => x);
    this.state = {
      form: this.props.formControl,
      validations: validations
    };
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(event) {
    var value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    var form = this.state.form;
    var element = form[event.target.name];
    if (element.mask && Mask[element.mask]) value = Mask[element.mask](value);
    form = _extends({}, form, {
      [event.target.name]: _extends({}, form[event.target.name], {
        value: value
      })
    });
    this.setState({ form });
    if (this.props.onChangeForm) {
      this.props.onChangeForm(form);
    }
    if (this.props.onValid) {
      this.isFormValid(form).then(valid => this.props.onValid(valid));
    }
  }

  onBlur(e) {
    const {
      form
    } = this.state;
    let validations = this.state.validations;
    Object.entries(form).forEach(async element => {
      const item = element[1];
      if (element[0] === e.target.name && item && item.validation) {
        const [output, valid, value] = await getValidation(item.validation, item.value, this.getFormValues(form));
        if (!valid) validations[output] = value;else validations[output] = '';
      }
      this.setState(validations);
    });
  }

  getFormValues(form) {
    var values = {};
    Object.entries(form).forEach(element => {
      values[element[0]] = element[1].value;
    });
    return values;
  }

  async isFormValid(form) {
    var isValid = true;
    for (const element of Object.entries(form)) {
      const item = element[1];
      if (item && item.validation) {
        // eslint-disable-next-line
        const [output, valid, value] = await getValidation(item.validation, item.value, this.getFormValues(form));
        if (!valid) isValid = false;
      }
    }
    return isValid;
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
        const [output, valid, value] = await getValidation(item.validation, item.value, this.getFormValues(form));
        if (!valid) {
          validations[output] = value;
          errors.push(value);
          isValid = false;
        } else validations[output] = '';
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

  processElement(element) {
    const {
      validations
    } = this.state;
    if (element.props) {
      if (element.type && isControlledComponent(element.type) && (element.type !== 'input' || isControlledInput(element.props.type)) && this.state.form[element.props.name]) {
        const formItem = this.state.form[element.props.name];
        var value = formItem.value;
        if (formItem.mask && Mask[formItem.mask]) value = Mask[formItem.mask](value);
        switch (element.props.type) {
          case 'radio':
            return _extends({}, element, { props: _extends({ checked: value === element.props.value }, element.props, { onChange: this.onChange, onBlur: this.onBlur }) });
          case 'checkbox':
            return _extends({}, element, { props: _extends({ checked: value }, element.props, { onChange: this.onChange, onBlur: this.onBlur }) });
          default:
            return _extends({}, element, { props: _extends({ value: value }, element.props, { onChange: this.onChange, onBlur: this.onBlur }) });
        }
      }
      if (element.props.id && validations[element.props.id]) {
        return _extends({}, element, { props: _extends({}, element.props, { children: validations[element.props.id] }) });
      }
      if (element.props.children) {
        return _extends({}, element, { props: _extends({}, element.props, { children: this.processControlledChildren(element.props.children) }) });
      }
    }
    return element;
  }

  render() {
    const _onSubmit = async event => {
      event.preventDefault();
      if (this.props.onSubmit) this.props.onSubmit(this.getFormValues(this.state.form), (await this.isValid()));else console.log(this.state.form);
    };

    const _props = this.props,
          {
      children,
      formControl,
      onChangeForm,
      onValid
    } = _props,
          props = _objectWithoutProperties(_props, ["children", "formControl", "onChangeForm", "onValid"]);

    const childrenProcessed = this.processControlledChildren(children);

    return React.createElement(
      "form",
      _extends({}, props, { onSubmit: _onSubmit }),
      childrenProcessed
    );
  }
}
Form.defaultProps = {
  formControl: {}
};