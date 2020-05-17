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
        </div>
      );

    }

    //"red bold"
    const classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red');  //classes = ['red']  
    }
    if(this.state.persons.length <= 1) {
      classes.push('bold');  //classes = ['red', 'bold']  
    }

    return (
      // <StyleRoot>
        <div className="App">
          <h1>This is a React app</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button className="button" 
            onClick={this.togglePersonsHandler}>
            Toggle Persons
          </button>
            {persons}
        </div>
      // </StyleRoot>
    );
  }
}

export default App;

