import React from 'react';
import EstacionCard from './EstacionCard';

class Estaciones extends React.Component {

    constructor(props){
        console.log('Contructor Estaciones');
        super(props);
        this.state = {
            estacion: 'Desconocida',
            latitud: 'Desconocida',
            fecha: 'Desconocida'
        };
    }

    render(){
        return(
            <div> <EstacionCard estacion={this.state.estacion} latitud={this.state.latitud} fecha={this.state.fecha}></EstacionCard> </div>
        );
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition( (success) => {
            const lat = success.coords.latitude;
            const month = new Date().getMonth() + 1;
            this.setState({
                fecha: new Date().toLocaleDateString(),
                latitud: lat
            });
            if( (lat > 0  && month > 6) || (lat < 0  && month <= 6) ){
                this.setState({ estacion: 'Invierno'});
            } else {
                this.setState({ estacion: 'Verano'});
            }
            console.log(this.state.estacion);
        }, (error) => { 
            console.log(error) 
        } );
    }
}

export default Estaciones;