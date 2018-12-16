import React from 'react';
const Input = (props) => {
    return(
        <div className="input-field">
        <input type="text" placeholder="Add Item" name={props.name} onChange={props.onChange} value={props.value} id="todo"/>
        {/* <label htmlFor="todo" className="active">Add Item</label> */}
        </div>
    
    )
}
export default Input;