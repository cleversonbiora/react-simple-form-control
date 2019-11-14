import React,{Component, useState} from 'react';
import './App.css';
import {Form} from './lib'

function Main(props){
  const [msg,setMsg] = useState('Amendoim');
  return(<div>{msg}<Child change={setMsg}/></div>);
}

function MiddleName(props) {
  return(
    <div>
      <input type="text" id="middlename" name="middlename"/>
    </div>
  );
}

function Child(props){
  return <input type="button" value="Change" onClick={() => props.change('Hipopotamo')}/>
}


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
                },
                {
                    type:"minLength",
                    params:[8],
                    msg:"Menor que 8."
                },
                {
                    type:"maxLength",
                    params:[20],
                    msg:"Maior que 20."
                },
                {
                    type:"custom",
                    args:["lastname"],
                    params:["{lastname}"],
                    body:"return lastname !== value;",
                    msg:"Nome Igual Sobrenome"
                }]
            }
          },
          lastname:{
            value:'Biora'
          },
          middlename:{
            value:'Martins'
          },
          cpf:{
            value:'22233366638',
            mask:'cpf',
          },
          estadoCivil:{
            value:"1"
          },
          doIt:{
            value:true
          },
          sexo:{
            value:'M'
          },
          descricao:{
            value:"Teste"
          }
        }
    }
    this._onChangeForm = this._onChangeForm.bind(this);
    this._onValid = this._onValid.bind(this);

  }

  alerta(){
    console.log(this.state.form);
  } 

  _onSubmit = async (values,valid) => {
      console.log(values,valid);
  }

  _onChangeForm(form){
    this.setState({form})
  }

  _onValid(valid){
    debugger
    this.setState({valid})
  }

  render(){
    const {form, valid} = this.state;
    debugger
    return (
      <div className="App">
        <Form onSubmit={this._onSubmit} formControl={form} onChangeForm={this._onChangeForm} onValid={this._onValid}>
          <MiddleName/>
          <Main/>
          First name:<br/>
          <div>
            <input type="text" id="firstname" name="firstname"/>
            <br/>
            <span id="firstnameError"></span>
          </div>
          <br/>
          Last name:<br/>
          <input type="text" id="lastname" name="lastname"/>
          <br/>
          Cpf:<br/>
          <input type="text" id="cpf" name="cpf"/>
          <br/>
          Do you do?:<br/>
          <input type="checkbox" id="doIt" name="doIt"/>
          <br/>
          Sexo:<br/>
          <input type="radio" id="sexoM" value="M" name="sexo"/>
          <input type="radio" id="sexoF" value="F" name="sexo"/>
          <br/>
          Estado Civil:<br/>
          <select id="estadoCivil" name="estadoCivil">
            <option value="0">Selecione</option>
            <option value="1">Casado</option>
            <option value="2">Solteiro</option>
          </select>
          <br/>
          Descrição
          <br/>
          <textarea id="descricao" name="descricao"></textarea>

          <br/><br/>
          <input type="button" value="Logging" onClick={() => this.alerta()}/>
          <input type="submit" value="Submit" disabled={!valid}/>
        </Form> 
      </div>
    );
  }
}

