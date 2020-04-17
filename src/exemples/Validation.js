import React, { Component} from 'react'
import {Form, isFormValid, isStepValid} from '../lib'
export default class Validation extends Component {
  constructor(props){
    super(props);
    this.state = {
        form:{
          firstname:{
            value:'',
            step:'step1',
            validation:{
                output:"firstnameError",
                validators:[{
                    type:"required",
                    msg:"Required Field."
                },{
                    type:"minLength",
                    params:[5],
                    msg:"Min Length 5."
                }]
            }
          },
          lastname:{
            value:'',
            step:'step1',
            validation:{
                output:"lastnameError",
                validators:[{
                    type:"required",
                    msg:"Required Field."
                },
                {
                    type:"custom",
                    args:["firstname"],
                    params:["{firstname}"],
                    function:(value,firstname) => {
                        if(value !== firstname)
                          return true;
                        return false;
                    },
                    msg:"Last Name must be diffente from First Name"
                }]
            }
          },
          email:{
            value:'',
            validation:{
                output:"emailError",
                validators:[{
                    type:"required",
                    msg:"Required Field."
                },{
                    type:"email",
                    msg:"Invalid Email."
                },
                {
                    type:"async",
                    msg:"Email ja cadastrado.",
                    apiUrl:"http://www.mocky.io/v2/5e988f593500002e00c483c2",
                    method:"GET",
                    headers:{
                            "Content-Type":"application/json",
                            "Authorization": "Bearer xxxxx"
                    },
                    valueField:"success"
                }]
            }
          },
          cpf:{
            validation:{
                output:"cpfError",
                validators:[{
                    type:"required",
                    msg:"Required Field."
                },{
                    type:"pattern",
                    params:['\\d{3}\\.\\d{3}\\.\\d{3}\\-\\d{2}'],
                    msg:"Invalid CPF."
                }]
            }
          },
          age:{
            value:'20',
            validation:{
                output:"ageError",
                validators:[{
                    type:"required",
                    msg:"Required Field."
                },{
                    type:"min",
                    params:[18],
                    msg:"Min Age 18."
                }]
            }
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

  _validStep = () => {
    const {form} = this.state;
    console.log(isStepValid(form,'step1')); //validate by step atribute
    console.log(isStepValid(form,['cpf', 'age'])); //validate by array fields
  }

  _validForm = () => {
    const {form} = this.state;
    console.log(isFormValid(form));
  }

  render(){
    const {form} = this.state;
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
            Email:<br/>
            <input type="text" id="email" name="email"/>
            <br/>
            <span id="emailError"></span>
          </div>  
          <div>
            CPF:<br/>
            <input type="text" id="cpf" name="cpf"/>
            <br/>
            <span id="cpfError"></span>
          </div>           
          <div>
            Age:<br/>
            <input type="text" id="age" name="age"/>
            <br/>
            <span id="ageError"></span>
          </div>
          <div>
            <input type="submit" value="Submit" />
            <input type="button" onClick={this._validForm} value="Form Valid" />
            <input type="button" onClick={this._validStep} value="Step Valid" />
          </div>
        </Form> 
      </div>
    );
  }
}
