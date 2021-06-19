import React,{Component} from 'react';
import './App.css';
import { 
  Simple,
  Validation,
  Mask,
  Others
} from './exemples'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      index:0
    }
  }

  _changeIndex = (index) =>{
    this.setState({index});
  }

  maskFormat(value,mask) {
    let chars = ['*','9','a'];
    let formatedValue = '';
    let j = 0;
    let scape = false;
    for(let i = 0; i < mask.length; i++){
      if(mask[i] === '\\'){
        scape = true;
        continue;
      }
      if(chars.indexOf(mask[i]) === -1 || scape){
        formatedValue += mask[i];
      }else{
        if(j < value.length){
          switch (mask[i]) {
            case '9':
              let number = value[j].replace(/\D/g, '');
              if(number)
                formatedValue += number;
              else
                i--;
              break;
            case 'a':
              let char = value[j].replace(/[^a-zA-Z]+/g, '');
              if(char)
                formatedValue += char;
              else
                i--;
              break;
            default:
              formatedValue += value[j];
              break;
          }
        }else{
          formatedValue += '_';
        }
        j++;
      }
      scape = false;
    }
    return formatedValue;
  }

  render(){
    const { index } = this.state;
    let exenple = <span>Select a exemple</span>;
    switch (index) {
      case 1:
        exenple = <Simple/>
        break;
      case 2:
        exenple = <Validation/>
        break;
      case 3:
        exenple = <Mask/>
        break;
      case 4:
        exenple = <Others/>
        break;
      default:
        break;
    }
    return (
      <div className="App">
        <div>{this.maskFormat('06266175967','999.999.999-99')}</div>
        <div>{this.maskFormat('41999484325','(\\99) 99999-9999')}</div>
        <div>{this.maskFormat('2145551234','+1 999 999-9999')}</div>
        <div>{this.maskFormat('clev_ersonbiora','aaa****aaa')}</div>
        <button onClick={() => this._changeIndex(0)}>Home</button>
        <button onClick={() => this._changeIndex(1)}>Simple</button>
        <button onClick={() => this._changeIndex(2)}>Validation</button>
        <button onClick={() => this._changeIndex(3)}>Mask</button>
        <button onClick={() => this._changeIndex(4)}>Others</button>
        <br/>
        {exenple}
      </div>
    );
  }
}

