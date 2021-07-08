import React, { Component } from 'react'
import { Form } from '../lib'
export default class Mask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstname: {
          value: '',
          validation: {
            output: "firstnameError",
            validators: [{
              type: "required",
              message: "Required Field."
            }]
          }
        },
        lastname: {
          value: '',
          validation: {
            output: "lastnameError",
            validators: [{
              type: "required",
              message: "Required Field."
            }]
          }
        },
        cpf: {
          value: '',
          mask: '999.999.999-99',
          validation: {
            output: "cpfError",
            validators: [{
              type: "required",
              message: "Required Field."
            }]
          }
        },
        phone: {
          value: '',
          mask: 'telUsa',
          validation: {
            output: "phoneError",
            validators: [{
              type: "required",
              message: "Required Field."
            }]
          }
        }
      }
    }
    this._onChangeForm = this._onChangeForm.bind(this);

  }

  _onSubmit = async (values, valid) => {
    if (valid.valid) {
      console.log(values, valid);
    }
  }

  _onChangeForm(form) {
    this.setState({ form })
  }

  render() {
    const { form } = this.state;
    return (
      <div className="App">
        <Form submit={this._onSubmit} formControl={form} change={this._onChangeForm}>
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
            CPF:<br />
            <input type="text" id="cpf" name="cpf" />
            <br />
            <span id="cpfError"></span>
          </div>
          <div>
            Phone:<br />
            <input type="text" id="phone" name="phone" />
            <br />
            <span id="phoneError"></span>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </Form>
      </div>
    );
  }
}
