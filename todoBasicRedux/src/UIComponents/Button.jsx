import React from 'react';
const Button = (props) => {
    return (
        <button className={props.cn}>{props.text}</button>
    )
}
export default Button;