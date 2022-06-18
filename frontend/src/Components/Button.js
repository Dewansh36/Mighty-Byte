import React from 'react';
import '../Public/css/button.css'
function Button(props) {
    let { text, height, width }=props;
    return (
        <button className='dbtn effect01 my-2' style={{ height: height, widht: width }}>
            <span>{text}</span>
        </button>
    )
}

export default Button;
