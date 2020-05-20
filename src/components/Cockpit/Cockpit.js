import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';
const cockpit = (props) => {
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);
    console.log(authContext.authenticated);

    //only runs when the props.persons change
    //if only use [], it runs the first time
    //runs after each render cycle
    useEffect(() => {
        console.log('[cockpit.js] useEffect');
        //Http request...
        // const timer = setTimeout(() => {
        //     alert('Saved data to cloud!');
        // }, 1000);

        toggleBtnRef.current.click();
        return () => {
            console.log('[cockpit.js] cleanup work in useEffect');
        }
    }, []);

    //run every update cycle, because we haven't passed any [] 
    useEffect(() => {
        console.log('[cockpit.js] 2nd useEffect');
        return () => {
            console.log('[cockpit.js] cleanup work in 2nd useEffect');
        };
    });


    //"red bold"
    const assignedClasses = [];
    let btnClass = '';
    if(props.showPersons) {
        btnClass = classes.Red;
    }
    

    if(props.personsLength <= 2) {
      assignedClasses.push(classes.red);  //classes = ['red']  
    }
    if(props.personsLength <= 1) {
      assignedClasses.push(classes.bold);  //classes = ['red', 'bold']  
    }

    return(
        <div className={classes.Cockpit}>
            <h1>This is a React app</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button ref={toggleBtnRef} className={btnClass}
            onClick={props.clicked}>
            Toggle Persons
            </button>
            <button onClick={authContext.login}>Log in</button>
        </div>
    );
};

export default React.memo(cockpit);