import React from 'react';
import ImageList from './Components/ImageList';
import SearchBar from './Components/SearchBar';

class App extends React.Component {

    changuesCount = 0;

    constructor(props){
        super(props);
        this.state = {
            query: 'office'
        }
    }

    changeQuery = (query) => {
        console.log(query);
        this.setState({
            query: query
        });
        this.changuesCount++;
    }

    render(){
        return (
            <div className="app">
                <h1> Unsplash Photos </h1>
                <SearchBar search={this.changeQuery}></SearchBar>
                Cantidad Busquedas: { this.changuesCount }
                <ImageList query={this.state.query.toString()}></ImageList>
            </div>
        );
    }
}

export default App;