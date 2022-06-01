import React from 'react';
import '../Public/css/button.css'
function Button(props) {
    let { text }=props;
    return (
        <button className='dbtn effect01'>
            <span>{text}</span>
        </button>
    )
}

export default Button;
