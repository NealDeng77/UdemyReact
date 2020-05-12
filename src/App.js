import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js';

class App extends Component {
  state = {
    persons :[
      {id:'asfgd', name: "max", age: "29"},
      {id:'fdhfdh', name: "manu", age: "28"},
      {id:'21412', name: "allen", age: "22"},
    ],
    showPersons: false
  }

  nameChangeHandler = (event, id) => {
    //find the person index with the id
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    //make a copy of that person
    const person = {
      ...this.state.persons[personIndex]
    };

    //change the name
    person.name = event.target.value;

    //update the list in immutable fashion
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  deletePersonHandler = (personIndex) => {
    //update state in an immutable fashion
    //copy the values and create a new array
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    let persons = null;

    if(this.state.showPersons) {
      persons = (
        <div >
          {this.state.persons.map((person, index) => {
            return <Person
                    click={() => this.deletePersonHandler(index)}
                    name={person.name}
                    age={person.age} 
                    key={person.id}
                    changed={(event) => this.nameChangeHandler(event, person.id)}/>
          })}
        {/* <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age}>I'm your father</Person>
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Helena')}
          changed={this.nameChangeHandler}>My hobby: soccer</Person> */}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>This is a React app</h1>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
      </div>
    );
  }
}

export default App;

