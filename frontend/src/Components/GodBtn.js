import React from 'react';
import '../Public/css/button.css'
function GodBtn(props) {
    let { text }=props;
    let { pd }=props
    return (
        <button className='god-btn' style={{ "padding": `1rem ${pd}` }}>
            <span>{text}</span>
        </button>
    )
}

export default GodBtn;
