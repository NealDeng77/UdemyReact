import React, {PureComponent} from 'react';
import Person from './Person/Person.js';

class Persons extends PureComponent {
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] getDerivedStateFromProps');
    //     return state;
    // }

    // componentWillReceiveProps(props) {
    //     console.log('[Persons.js] componentWillReceiveProps', props);
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[Persons.js] shouldComponentUpdate');
    //     //if the persons prop doesn't change, no need to re-render it
    //     if(
    //         nextProps.persons !== this.props.persons ||
    //         nextProps.clicked !==this.props.clicked ||
    //         nextProps.changed !==this.props.changed) {
    //         return true;
    //     }else {
    //         return false;
    //     }
    // }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return {message: 'snapshot!' };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapshot);
    }

    //cleanup
    //the code would run before the component is removed
    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    }
    
    render() {
        console.log('[Persons.js] render');  
        return (
            this.props.persons.map((person, index) => {
            
                return(
                        <Person
                            click={() => this.props.clicked(index)}
                            name={person.name}
                            age={person.age}
                            key={person.id} 
                            changed={(event) => this.props.changed(event, person.id)}
                        />
                ); 
            })
        )
    }

};
export default Persons;