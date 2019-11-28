import React from 'react';

class EstacionCard extends React.Component {
    render(){
        return( 
            // <div className="estacion-card"> {this.props.estacion} </div>
            <div className="ui card">
                <div className="image"><img src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg" /></div>
                <div className="content">
                    <div className="header">{this.props.estacion}</div>
                    <div className="meta">Latitud: {this.props.latitud}</div>
                    <div className="meta">Mes: {this.props.fecha}</div>
                    <div className="description">Estamos en {this.props.estacion}</div>
                </div>
            </div>
        );
    }    
}

export default EstacionCard;