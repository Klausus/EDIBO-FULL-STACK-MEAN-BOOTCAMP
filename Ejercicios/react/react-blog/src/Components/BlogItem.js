import React from 'react'
import Axios from 'axios';
import Header from './Header';


class BlogItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            item: {}
        };
    }

    componentDidMount(){
        console.log("mi match" + this.props.match);
        Axios.get(`http://localhost:3001/posts/${this.props.match.params.id}`).then(
            (res) => {
                this.setState({
                    item: res.data
                });
            }
        ).catch((error) => {
            console.log("ha fallado");
            this.setState({error:error});
        })
    }

    render(){
        return(
            <div className="blog-item">
                <Header component="BlogList"></Header>
                <div className="ui raised centered card">
                    <div className="content">
                            <div className="header">{this.state.item.title}</div>
                            <div className="description">
                                <p className="category"> {this.state.item.content} </p>
                                <img className="ui image" src={this.state.item.image} alt="avatar"></img>
                            </div>
                    </div>
                    <div className="extra content">
                        <div className="right floated author">
                            {this.state.item.author}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlogItem;
