import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons.js';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass.js';
import Aux from '../hoc/Auxiliary.js';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons :[
      {id:'asfgd', name: 'max', age: 29},
      {id:'fdhfdh', name: 'manu', age: 28},
      {id:'21412', name: 'allen', age: 22},
    ],
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
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

    this.setState((prevState, props) => { 
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1 
      };
    });
  };

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

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    let persons = null;
    console.log('[App.js] render');

    
    if(this.state.showPersons) {
      persons = (
        <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler} 
          isAuthenticated={this.state.authenticated}   
        />
      );
    }

    return (
        <Aux>
          <button onClick={() => {
            this.setState({showCockpit: false});
            }}>
              Remove Cockpit
          </button>
          <AuthContext.Provider 
            value={{
              authenticated: this.state.authenticated, 
              login: this.loginHandler
            }}
          >
            {this.state.showCockpit ? (
            <Cockpit 
              showPersons={this.state.showPersons}
              personsLength={this.state.personsLength} 
              clicked={this.togglePersonsHandler} 
            />
            ) : null}
            {persons}
          </AuthContext.Provider>
        </Aux>
    );
  }
}

export default withClass(App, classes.App);

