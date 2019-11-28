import React from 'react';

const Image = (props) => {
    return (
        <img className="ui medium rounded image" id={props.id} src={props.imageSrc} alt=""></img>
    );
}

export default Image;