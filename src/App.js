import React,{Component} from 'react';
import './App.css';
import { 
  Simple,
  Validation
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
      default:
        break;
    }
    return (
      <div className="App">
        <button onClick={() => this._changeIndex(0)}>Home</button>
        <button onClick={() => this._changeIndex(1)}>Simple</button>
        <button onClick={() => this._changeIndex(2)}>Validation</button><br/>
        {exenple}
      </div>
    );
  }
}

