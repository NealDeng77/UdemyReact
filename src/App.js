import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js';

class App extends Component {
  state = {
    persons :[
      {name: "max", age: "29"},
      {name: "manu", age: "28"},
      {name: "allen", age: "22"},
    ]
  }

  switchNameHandler = () => {
    // console.log('Was clicked!');
    //Don't do this: this.state.persons[0].name = "Joe";
    this.setState({
      persons:[
        {name: "max", age: "19"},
        {name: "manu", age: "28"},
        {name: "allen", age: "12"},
      ]
    })
  }

  render() {
    return (
      <div className="App">
        <h1>This is a React app</h1>
        <button onClick={this.switchNameHandler}>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}>I'm your father</Person>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>My hobby: soccer</Person>
        
        
      </div>
    );
  }
}

export default App;
