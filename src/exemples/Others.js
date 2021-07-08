import React, { Component } from 'react'
import { Form, getFormValues, mapValues, isFormValid } from '../lib'
export default class Others extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      error: '',
      form: {
        firstname: {
          value: ''
        },
        lastname: {
          value: ''
        },
        email: {
          value: ''
        }
      }
    }
    this._onChangeForm = this._onChangeForm.bind(this);
    this._onValid = this._onValid.bind(this);
  }

  componentDidMount() {
    const { form } = this.state;
    form.email.ref.current.focus(); //Set focus

    let user = {
      firstname: 'Jonh',
      lastname: 'Chosen',
      email: 'jonh@chosen.com'
    }

    let formNew = mapValues(form, user); //auto map values to form
    let valid = isFormValid(formNew);
    this.setState({ form: formNew, valid });

  }

  _getValues = () => {
    const { form } = this.state;
    let values = getFormValues(form); //auto map values from form
    console.log(values);
  }

  _onSubmit = async (values, validation) => {

    if (validation.valid) {
      console.log(values, validation);
    } else {
      const { form } = this.state;
      window.scrollTo(0, form[validation.errors[0].field].ref.current.offsetTop); //Scroll to first error field
    }
  }

  _onChangeForm(form) {
    this.setState({ form })
  }

  _onValid(valid) {
    this.setState({ valid }); //validate form on changes
  }

  render() {
    const { form, valid } = this.state;
    return (
      <div className="App">
        <Form submit={this._onSubmit} formControl={form} change={this._onChangeForm} valid={this._onValid}>
          <div>
            First name:<br />
            <input type="text" id="firstname" name="firstname" />
            <br />
            <span id="firstnameError"></span>
          </div>
          <div>
            Last name:<br />
            <input type="text" id="lastname" name="lastname" />
            <br />
            <span id="lastnameError"></span>
          </div>
          <div>
            Email:<br />
            <input type="text" id="email" name="email" />
            <br />
            <span id="emailError"></span>
          </div>
          <div>
            <input type="submit" value="Submit" disabled={!valid} />
            <input type="button" onClick={this._getValues} value="Get Values" />
          </div>
        </Form>
      </div>
    );
  }
}
