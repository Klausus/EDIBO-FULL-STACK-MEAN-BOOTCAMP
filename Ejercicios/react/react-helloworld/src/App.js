import React from 'react';
import './App.css';
import Caja from './Caja';

const App = () => {

    const text = ["Mi texto 1","Mi texto 2","Mi texto 3","Mi texto 4"]

    return (
        <center>
            <h2 className="title" style={ {fontStyle: "italic"} } > 
                Hola Mundo {
                    (new Date()).toLocaleTimeString().toString()
                }
                {
                    text.map( (value,index) => { return <Caja texto={value}></Caja> } )
                }
                
            </h2>
        </center>
    );
}

export default App;