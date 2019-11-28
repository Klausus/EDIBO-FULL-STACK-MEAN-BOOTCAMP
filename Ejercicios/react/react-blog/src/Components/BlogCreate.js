import React from 'react';
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import Header from './Header';

class BlogCreate extends React.Component {

    API_URL = 'http://localhost:3001/';

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            image: "",
            author: "",
            redirect: false
        }

    }

    changeEverything = e => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    createBlog = e => {
        console.log(this.state);
        axios.post(this.API_URL + "posts/", {
            title:this.state.title,
            author: this.state.author,
            image: this.state.image,
            content: this.state.content
        }).then(res => {
            this.setState(
                {
                    redirect: true
                }
            )
        })
    }

    render() {

        return (
            <div className="blog-create ui container">

                <Header component="BlogCreate"></Header>
                
                {
                    (this.state.redirect ? <Redirect to="/blog"></Redirect> : null)
                }
                
                <form className="ui form">
                    <h4 className="ui dividing header">Crear nuevo entrada</h4>
                    <div className="field">
                        <label>Título</label>
                        <input type="text" name="title" placeholder="Título"
                            value={this.state.title}
                            onChange={this.changeEverything}
                        ></input>
                    </div>
                    <div className="field">
                        <label>Contenido</label>
                        <textarea rows="4" name="content" 
                            value={this.state.content}
                            onChange={this.changeEverything}
                        ></textarea>
                    </div>

                    <div className="field">
                        <label>Autor</label>
                        <input type="text" name="author" 
                        value={this.state.author}
                        onChange={this.changeEverything}
                        placeholder="Autor"></input>
                    </div>  

                    <div className="field">
                        <label>Imagen (URL)</label>
                        <input type="text" name="image" 
                        value={this.state.image} 
                        onChange={this.changeEverything}
                        placeholder="Imagen"></input>
                    </div>
                    
                    <div className="ui submit button" onClick={this.createBlog}>Enviar</div>

                </form>
            </div>
        )
    }
}

export default BlogCreate;