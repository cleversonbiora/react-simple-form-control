
# Getting Started

## Features

<!-- * [Redering HTML from JSON](/react-json-page/RenderingHtml)
* [Dynamic Forms](/react-json-page/DynamicForms)
* [Basic Form Validation](/react-json-page/BasicValidation)
* [Async And Custom Form Validation](/react-json-page/CustomValidation)
* [Logical Input Hiddden](/react-json-page/InputHidden)
* [Async Form Post](/react-json-page/AsyncPost)
* [Async Load](/react-json-page/AsyncLoad)
* [Inject External Components and Functions](/react-json-page/InjectedComponents) -->

## Basic Example

In this exemple, we’ll build a simple form with validation.

`App.js`

```jsx
//ADD IMPORT
import React, { Component} from 'react'
import {Form} from 'react-sample-form';

//ADD COMPONENT
export default class App extends Component {
  constructor(props){
    super(props);
    this.state ={
        valid: false,
        form:{
          firstname:{
            value:'',
            validation:{
                output:"firstnameError",
                validators:[{
                    type:"required",
                    msg:"Campo obrigatório."
                }
            }
          },
          lastname:{
            value:'',
            validation:{
                output:"lastnameError",
                validators:[{
                    type:"required",
                    msg:"Campo obrigatório."
                }
            }
          },
          maritialState:{
            value:"1"
          },
          gender:{
            value:'M'
          }
        }
    }
    this._onChangeForm = this._onChangeForm.bind(this);

  }

  _onSubmit = async (values,valid) => {
    if (valid[0]) {
        console.log(values,valid);
    }
  }

  _onChangeForm(form){
    this.setState({form})
  }

  render(){
    const {form, valid} = this.state;
    const gender = ['M','F'];
    return (
      <div className="App">
        <Form onSubmit={this._onSubmit} formControl={form} onChangeForm={this._onChangeForm}>
          <div>
            First name:<br/>
            <input type="text" id="firstname" name="firstname"/>
            <br/>
            <span id="firstnameError"></span>
          </div>        
          <div>
            Last name:<br/>
            <input type="text" id="lastname" name="lastname"/>
            <br/>
            <span id="lastnameError"></span>
          </div>
          <div>
            Gender:<br/>
            {sexos.map(s => <input key={s} type="radio" id={`sexo${s}`} value={s} name="sexo"/>)}
          </div>
          <div>
            Estado Civil:<br/>
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

## Installing

Run the following command:

`npm i react-simple-form-control`


## Built With

* [React](https://reactjs.org/) - The web library used

## Contributing

Coming soon I wiil open for submitting pull requests to us.

## Authors

* **Cleverson Biora** - [CleversonBiora](https://github.com/cleversonbiora)

## License

This project is licensed under the MIT License.
