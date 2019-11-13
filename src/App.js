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

  render(){
    return (
      <div className="App">
        <Form onSubmit={this._onSubmit} formControl={this.state.form} onChangeForm={this._onChangeForm}>
        <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 uninter-topo-entrada-aluno">
                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-2 uninter-topo-entrada-aluno-logouninter">
                            <div className="uninter-topo-entrada-aluno-logouninter-interno-vertical">
                                <a href="https://www.uninter.com/americas/?_ga=2.62917228.2100222510.1564141545-303568941.1562094032" target="_blank" rel="noopener noreferrer">
                                   
                                </a>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 uninter-box uninter-box-entrada-aluno-curso uninter-topo" tabIndex="0">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 uninter-texto-inicio-entrada-aluno">
                                <span>Faça agora sua Inscrição de forma simples e rápida.</span>
                                    <label>Aproveite já todas as vantagens de ser Aluno UNINTER!</label>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-2 uninter-topo-entrada-aluno-notamec">
                            <div className="uninter-topo-entrada-aluno-notamec-fundo">
                                <div className="uninter-topo-entrada-aluno-notamec-interno"><br/>A EAD Nota Máxima no MEC
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 ">
                        <h3>Curso Escolhido</h3>
                        <div className="uninter-box uninter-box-entrada-aluno-curso">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div className="uninter-titulo-curso-entrada col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <label id="nome" style={{fontWeight: "bold"}}>
                                        </label><br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="uninter-passo-geral col-11 offset-1 col-xs-10 offset-xs-2 col-sm-10 offset-sm-1 col-md-9 offset-md-2 col-lg-9 offset-lg-2">
                        {/* círculo "Suas Informações" */}
                        <ul id="accordion" className="uninter-entrada-aluno uninter-passo">
                            <li>
                                <div id="headingOne" className="uninter-entrada-aluno-header" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" tabIndex="1">
                                    <div className="uninter-passo-circulo passo-ok">
                                        {/* círculo "Check" */}
                                        <div className="circulo-check">
                                            <div className="entrada-aluno-icons">
                                                <i className="fa fa-check-circle"></i>
                                            </div>
                                        </div>
                                        <div className="entrada-aluno-icon-line ">
                                            <i className="fa fa-tag"></i>
                                        </div>
                                    </div>
                                    <h3>Suas Informações</h3>
                                </div>
                                {/*----------------------- módulo início -----------------------*/}
                                <div className="uninter-entrada-aluno-body collapse show" id="collapseOne" aria-labelledby="headingOne" data-parent="#accordion">
                                    <ul className="uninter-entrada-aluno uninter-passo-interno">
                                        <li className="uninter-dados-text-obs">
                                            <p>
                                                Preencha todos os campos básicos abaixo com seus dados.
                                            </p>
                                        </li>
                                        <li>
                                            <div className="form-group col-xs-12 col-sm-8 col-md-4 col-lg-4 uninter-campos">
                                                <label htmlFor="cpf">CPF</label>
                                                <input className="form-control is-invalid" type="text" id="cpf" name="cpf" autoComplete="new-password"/>
                                                {/*<small id="passwordHelp" className="text-danger">
                                                    Campo obrigatório.
                                                </small>*/}  
                                            </div>
                                            <div className="form-group col-xs-12 col-sm-12 col-md-8 col-lg-8 uninter-campos">
                                                <label htmlFor="Nome">Nome Completo</label>
                                                <input className="form-control" type="text" id="nome" name="nome" autoComplete="new-password"/>
                                                {/*<small id="passwordHelp" className="text-danger">
                                                    Campo obrigatório.
                                                </small>*/}  
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="form-group col-xs-12 col-sm-10 col-md-8 col-lg-8 uninter-campos">
                                                <label htmlFor="Email">Email</label>
                                                <input className="form-control" type="email" id="email" name="email" autoComplete="new-password" />
                                                {/*<small id="passwordHelp" className="text-danger">
                                                    Campo obrigatório.
                                                </small>*/}  
                                            </div>
                                            <div className="form-group col-xs-12 col-sm-8 col-md-4 col-lg-4 uninter-campos">
                                                <label htmlFor="Telefone">Celular</label>
                                                <input className="form-control" type="text" id="celular" name="celular" placeholder="+1 (___) ___-____" autoComplete="new-password"  />
                                                {/*<small id="passwordHelp" className="text-danger">
                                                    Campo obrigatório.
                                                </small>*/}  
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                {/*----------------------- módulo fim -----------------------*/}
                            </li>
                        </ul>
                        {/* círculo "Escolha onde Estudar" */}
                        <ul className="uninter-entrada-aluno-final uninter-passo">
                            <li>
                                <div id="headingTwo" className="uninter-entrada-aluno-header collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" tabIndex="2">
                                    <div className="uninter-passo-circulo next-passo">
                                        {/* círculo "Check" */}
                                        <div className="circulo-check">
                                            <div className="entrada-aluno-icons">
                                                <i className="fa fa-check-circle"></i>
                                            </div>
                                        </div>
                                        <div className="entrada-aluno-icon-line">
                                            <i className="fa fa-book"></i>
                                        </div>
                                        
                                    </div>
                                    <h3>Escolha onde Estudar</h3>
                                </div>
                                {/*----------------------- módulo início -----------------------*/}
                                <div id="collapseTwo" className="collapse uninter-entrada-aluno-body" aria-labelledby="headingTwo" data-parent="#accordion">
                                    <ul className="uninter-entrada-aluno uninter-passo-interno">
                                        <li className="uninter-dados-text-obs">
                                            <p>
                                                Selecione abaixo o melhor local para você estudar.
                                            </p>
                                        </li>
                                        <li>
                                            <div className="select-wrapper initialized col-xs-12 col-sm-12 col-md-12 col-lg-12 uninter-campos">
                                                <label htmlFor="localId" style={{fontSize:20}} className="dropDownLabel">Polo</label>
                                                <select id="localId" className="" name="localId" >
                                                    <option value="">Selecione</option>
                                                </select>
                                                {/*<small id="passwordHelp" className="text-danger">
                                                    Campo obrigatório.
                                                </small>*/}  
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                {/*----------------------- módulo fim -----------------------*/}
                            </li>
                        </ul>
                        <ul className="uninter-declaro-entrada-aluno">
                            <li className="form-check">
                                <div className="uninter-declaro-entrada-aluno-interno">
                                    <input type="checkbox" className="form-check-input" id="aceite"/>
                                    <label className="form-check-label" htmlFor="exampleCheck1">Declaro ter lido os <span>avisos</span> referentes à minha inscrição.</label>
                                </div>
                            </li>
                            <li>
                                <p className="uninter-passo-interno-btn">
                                    <input type="submit" name="btnFinalizarInscricao" value="Finalizar Inscrição" className="btn"/>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
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
          <input type="submit" value="Submit"/>
        </Form> 
      </div>
    );
  }
}

