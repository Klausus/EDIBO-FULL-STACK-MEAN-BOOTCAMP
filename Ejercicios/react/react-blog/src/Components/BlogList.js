import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Header from './Header';

class BlogList extends React.Component {
    
    URL = 'http://localhost:3001';

    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            error: {
                title: '',
                message: ''
            }
        }
    }

    componentDidMount() {
        this.getData();        
    }

    getData() {
        Axios.get(`${this.URL}/posts/`).then(
            (res) => {
                this.setState({
                    blogs: res.data
                });
            }
        ).catch((error) => {
            console.log("ha fallado");
            this.setState({
                error:{
                    title:'Error: Fallo peticion REST',
                    message: 'Ha fallado la peticion REST( GET ):\n' + error
                }
            });
        })
    }

    borrar(id) {
        Axios.delete(`${this.URL}/posts/${id}`).then(
            (res) => {
                this.setState({
                    error: {
                        title: 'Registro Borrado',
                        message: 'Se ha borrado el registro con el id: ' + id
                    }
                });
                this.getData();
            }
        ).catch((error) => {
            console.log("ha fallado");
            this.setState({
                error:{
                    title:'Error: Fallo peticion REST',
                    message: 'Ha fallado la peticion REST( POST ):\n' + error
                }
            });
        })
    }

    showError(error) {
        return (
            <div className="ui form error">
                <div className="ui error message">
                    <div className="header">{error.title}</div>
                    <p>{error.message}</p>
                </div>
            </div>
        );
    }

    render(){
        return (
            <div className="blog-list">
                <Header component="BlogList"></Header>

                { this.state.error.title!=='' ? this.showError(this.state.error) : "" }

                <table className="ui celled table">
                <thead>
                    <tr>
                        <th width="3%">id</th>
                        <th width="40%">Title</th>
                        <th width="50%">Author</th>
                        <th width="7%"> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.blogs.map(
                            (item) => (
                                <tr key={item.id}>
                                    <td><Link to={"/blog/"+item.id}>{item.id}</Link></td>
                                    <td><Link to={"/blog/"+item.id}>{item.title}</Link></td>
                                    <td>{item.author}</td>
                                    <td>
                                        <Link to={"/blog/"+item.id}>
                                            <i className="file alternate icon"></i>
                                        </Link>
                                        <Link to={"/blog/edit/"+item.id}>
                                            <i className="edit icon"></i>
                                        </Link>
                                        <Link to="#">
                                            <i className="trash icon" onClick={(v) => {this.borrar(item.id);} }></i>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
                </table>
            </div>
        )
    }
}

export default BlogList;