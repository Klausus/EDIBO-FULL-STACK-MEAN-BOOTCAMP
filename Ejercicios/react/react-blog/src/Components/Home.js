import React, {Component} from 'react';
import Header from './Header';

class Home extends Component{
    render(){
        return (
            <div className="home">
                <Header component="Home"></Header>
                Home
            </div>
        );
    }
}

export default Home;