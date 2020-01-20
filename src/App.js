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


class AppForm extends Component {
  constructor(props){
    super(props);
    this.state ={
        valid: false,
        error:'',
        form:{
          firstname:{
            value:'',
            validation:{
                output:"firstname2Error",
                validators:[{
                    type:"required",
                    msg:"Campo obrigatório."
                }]
            }
          },
          lastname:{
            value:'Amendoim'
          }
        }
    }
    this._onChangeForm = this._onChangeForm.bind(this);
    this._onValid = this._onValid.bind(this);

  }

  async alerta(){
    console.log(this.state.form);
  } 

  _onSubmit = async (values,valid) => {
    debugger
      console.log(values,valid);
  }

  _onChangeForm(form){
    debugger
    this.setState({form})
  }

  _onValid(valid){
    this.setState({valid})
  }

  render(){
    const {form, valid, error} = this.state;
    const sexos = ['M','F'];
    return (
      <div>
        <Form onSubmit={this._onSubmit} formControl={form} onChangeForm={this._onChangeForm} onValid={this._onValid}>
          First name:<br/>
          <div>
            <input type="text" id="firstname" name="firstname"/>
            <br/>
            <span id="firstname2Error"></span>
          </div>
          <br/>
          Last name:<br/>
          <input type="text" id="lastname" name="lastname"/>
          <br/>
          <br/><br/>
          <input type="submit" value="Submit" />
        </Form> 
      </div>
    );
  }
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.state ={
        valid: false,
        error:'',
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
                    type:"custom",
                    args:["lastname"],
                    params:["{lastname}"],
                    function:(value,lastname) => {
                        if(value === lastname)
                          return true;
                        return false;
                    },
                    msg:"Teste inválido"
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
            value:false,
            validation:{
                output:"doitError",
                validators:[{
                    type:"required",
                    msg:"Campo obrigatório."
                }]
              }
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

  async alerta(){
    console.log(this.state.form);
  } 

  _onSubmit = async (values,valid) => {
    debugger
      console.log(values,valid);
  }

  _onChangeForm(form){
    debugger
    this.setState({form})
  }

  _onValid(valid){
    this.setState({valid})
  }

  render(){
    const {form, valid, error} = this.state;
    const sexos = ['M','F'];
    return (
      <div className="App">
        <Form onSubmit={this._onSubmit} formControl={form} onChangeForm={this._onChangeForm} onValid={this._onValid}>
          Sexo:{this.state.form.sexo.value}<br/>
          {sexos.map(s => <input key={s} type="radio" id={`sexo${s}`} value={s} name="sexo"/>)}
          <br/>
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
            <span id="doitError"></span>
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
          {error && <span>Teste IF</span>}
          <br/><br/>
          <input type="button" value="Logging" onClick={() => this.alerta()}/>
          <input type="submit" value="Submit" />

          <AppForm/>



        </Form> 
        <hr/>
      </div>
    );
  }
}

