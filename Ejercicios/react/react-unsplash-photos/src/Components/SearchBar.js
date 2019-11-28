import React from 'react';

class SearchBar extends React.Component {

    constructor(props){
        super(props);
        this.state={
            query : ""
        }
    }

    render() {
        return(
            <div className="ui input">
                 <div className="ui icon input">
                    <input className="prompt" type="text" placeholder="Search..." value={this.state.query} onChange={this.handleSearchOnChange}></input>
                    <button className="ui primary button" onClick={(res)=>{ this.props.search(this.state.query.toString()) }}>
                        <i className="search icon"></i> Search 
                    </button>
                </div>
            </div>
        )
    }

    handleSearchOnChange = (res) => {
        this.setState({query:res.target.value});
    }
}

export default SearchBar;