import React, { Component } from 'react';
import Input from '../UIComponents/Input';
import Button from '../UIComponents/Button';
import Items from '../UIComponents/DisplayItems'
import { connect } from "react-redux"
class FrontCom extends Component {
    constructor() {
        super()
        this.state = {
            todoItem: '',
            editIndex: null,
        }

    }
    componentDidMount() {
    }
    onAdd = (event) => {
        event.preventDefault();
        if (this.state.todoItem === '') {
            return
        }
        if (this.state.editIndex !== null) {
            this.props.edit(this.state.todoItem, this.state.editIndex)
        }
        else {
            this.props.add(this.state.todoItem)
        }
        this.setState({ todoItem: '', editIndex: null })
    }

    ondelete = (itemIndex) => {
        const selectedItem = this.props.todoItems[itemIndex]
        if (selectedItem === this.state.todoItem) {
            this.setState({ todoItem: '', editIndex: null })
        }
        if(this.state.editIndex > itemIndex){
            let a = this.state.editIndex
            --a;
            this.setState({editIndex: a})
       }
        this.props.delete(itemIndex)
    }
    onEdit = (itemIndex) => {
        const editItem = this.props.todoItems[itemIndex]
        this.setState({ todoItem: editItem, editIndex: itemIndex });
    }

    whenChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }
    render() {
        const { todoItems } = this.props;
        const todosList = todoItems.length > 0 ? (<table>
            <Items todoItems={todoItems} editItem={this.onEdit} delItem={this.ondelete} />
        </table>) : (<div className="center red-text">"No, To-do items"</div>)
        return (
            <div className="container blue lighten-5 mybox">
                <nav className="nav-wrapper indigo">
                    <div className="center"><h3>To-do App</h3></div>
                </nav>
                <br />
                <br />
                <form onSubmit={this.onAdd}>
                    <div className="row">
                        <div className="col s8 m8 l6 offset-l2">
                            <Input name="todoItem" value={this.state.todoItem} onChange={this.whenChange} />
                        </div>
                        <div className="col s2 m2 l2">
                            <Button cn="btn light-blue darken-3" text="Add" />
                        </div>
                    </div>
                </form>
                <br />
                {todosList}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        todoItems: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add: (todoItem) => {return dispatch({type:"Add", newtodo: todoItem})} ,
        edit: (editItem , eid) => {
            return dispatch({type:"Edit", edittodo: editItem, editIndex: eid})},
        delete: (did) => {return dispatch({type:"Del",delIndex: did})},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FrontCom);