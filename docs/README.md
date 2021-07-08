
# Getting Started

📝 The Form control lib for React. Easy and power way to manipulate simple and advanced forms.


React Simple Form Control is funded by [CleversonBiora](https://github.com/cleversonbiora) and updated by [MatheusBrito](https://github.com/BritoMatheus).


## Features

* [Basic Form Validation](/react-simple-form-control/BasicValidation)
* [Async And Custom Form Validation](/react-simple-form-control/CustomValidation)
* [Mask](/react-simple-form-control/Mask)
* [More](/react-simple-form-control/More)

## Installing

Run the following command:

`npm i react-simple-form-control`

or

`yarn i react-simple-form-control`

## Basic Example

In this exemple, we’ll build a simple form with validation.

`Simple.js`

```jsx
import React, { Component } from 'react';

import { Form } from '../lib'

export default class Simple extends Component {
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
        maritialState: {
          value: "1"
        },
        gender: {
          value: 'M'
        }
      }
    }
    this._onChangeForm = this._onChangeForm.bind(this);

  }

  _onSubmit = async (values, validation) => {
    if (validation.valid) {
      console.log(values, validation);
    }
  }

  _onChangeForm(form) {
    this.setState({ form });
  }

  render() {
    const { form } = this.state;
    const genders = ['M', 'F'];
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
            Gender:<br />
            {genders.map(s =>
              <>
                <label htmlFor={`gender_${s}`}>{s}</label>
                <input key={s} type="radio" id={`gender_${s}`} value={s} name="sexo" />
              </>)}
          </div>
          <div>
            Estado Civil:<br />
            <select id="estadoCivil" name="estadoCivil">
              <option value="0">Selecione</option>
              <option value="1">Casado</option>
              <option value="2">Solteiro</option>
            </select>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </Form>
      </div>
    );
  }
}

```

## Built With

* [React](https://reactjs.org/) - The web library used
* [Typescript](https://www.typescriptlang.org/) - Code easier to read and understand

## Contributing

Coming soon I wiil open for submitting pull requests to us.

## Authors

* **Cleverson Biora** - [CleversonBiora](https://github.com/cleversonbiora)
* **Matheus Brito** - [MatheusBrito](https://github.com/BritoMatheus)

## License

This project is licensed under the MIT License.
