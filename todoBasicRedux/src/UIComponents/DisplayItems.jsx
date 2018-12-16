import React from 'react';
const Items = (props) =>{
    const { todoItems, editItem, delItem} = props;

        return (<tbody>
            {todoItems.map((item, index) => {
                return (<tr key={index} className="">
                    <td>{index+1}.</td>
                    <td>{item}</td>
                    <td> 
                    <button className="btn  blue lighten-1" onClick={
                        () => {editItem(index) }}>
                    Edit</button>
                    </td>
                    <td>
                    <button className="btn deep-orange lighten-3" onClick={
                        () => {delItem(index)}}>
                    Done</button>
                    </td>
                    </tr>)
            })}

        </tbody>)
}
export default Items;