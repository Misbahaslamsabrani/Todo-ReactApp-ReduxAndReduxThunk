import React from 'react';
const ButtonD = (props) => {
    return (
        <button className={props.cn} onClick={props.oc}>{props.text}</button>
    )
}
export default ButtonD;