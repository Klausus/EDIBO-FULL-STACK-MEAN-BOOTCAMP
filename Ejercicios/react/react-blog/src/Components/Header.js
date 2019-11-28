import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Header extends Component{
    render(){
        return (
        <div className="ui four item menu">
            <Link to = "/home" className={this.props.component==="Home"?"active item":"item"}> 
               <i className="home icon"></i> Home 
            </Link>
            
            <Link to = "/blog" className={this.props.component==="BlogList"?"active item":"item"}> 
                <i className="bars icon"></i> Blog 
            </Link>
            
            <Link to = "/blog/create" className={this.props.component==="BlogCreate"?"active item":"item"}> 
                <i className="edit icon"></i> Create
            </Link>

            <Link to = "#" className={this.props.component==="aaaa"?"active item":"item"}> 
                <i className="question icon"></i>
            </Link>
        </div>
        );
    }
}

export default Header;



