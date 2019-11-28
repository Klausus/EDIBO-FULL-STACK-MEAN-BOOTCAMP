import React from 'react';
import Image from './Image';
import {ACCESS_KEY, SECRET_KEY} from '../settings';
import axios from 'axios';

class ImageList extends React.Component {

    previousQuery = '';

    constructor(props){
        super(props);
        this.state = {
            image: []
        }
    }

    componentDidMount(){
        this.getData();
    }

    componentDidUpdate(){
        console.log("prueba");
        if(this.props.query != this.previousquery)
        {
            this.getData();
            this.previousquery = this.props.query;
        }
    }

    getData = () => {
        axios.get(`https://api.unsplash.com/search/photos?page=1&per_page=24&query=${this.props.query}&client_id=${ACCESS_KEY}&client_secret=${SECRET_KEY}`).then( 
            (res)=> {
                this.setState ( { image: res.data.results } );
                console.log( res );
                console.log( this.state);
            }
        )
    }

    render() {
        return (
            <div className="ui small images">
                {
                    this.state.image.map( (value) => {
                        return <Image key={value.id} id={value.id} imageSrc={value.urls.small.toString()}></Image>;
                    })
                }
            </div>  
        );
    }

}

export default ImageList;