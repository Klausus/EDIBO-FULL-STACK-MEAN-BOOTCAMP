import React from 'react';

const Caja = (props) => {
    return (
        <div style={{border:"1px solid black", width:"100%"}}>
            { props.texto }
        </div>
    )
}

export default Caja;