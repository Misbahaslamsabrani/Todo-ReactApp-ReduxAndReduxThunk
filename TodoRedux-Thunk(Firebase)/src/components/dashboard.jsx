import React, { Component } from 'react';
import Input from '../UIComponents/Input';
import Button from '../UIComponents/Button';
import ButtonD from '../UIComponents/ButtonD';
import Items from '../UIComponents/DisplayItems'
import { connect } from "react-redux"
import {AddTodo, UpdateTodo, DeleteTodo, allTodos, deleteAll} from "../store/Actions/todoActions"
class FrontCom extends Component {
    constructor() {
        super()
        this.state = {
            todoItem: '',
            editId: null,
            edit: null,
        }

    }
    componentDidMount() {
        this.props.allTodos()
    }
    onAdd = (event) => {
        event.preventDefault();
        if (this.state.todoItem === '') {
            return
        }
        if (this.state.editId !== null) {
            this.props.edit(this.state.todoItem, this.state.editId)
        }
        else {
            this.props.add(this.state.todoItem)
        }
        this.setState({ todoItem: '', editId: null, edit: null })
    }

    ondelete = (itemId) => {
        const selectedItem = this.props.todoItems.find((item) => {
            return item.id === itemId;
        })
        if(selectedItem.todo === this.state.todoItem){
            this.setState({todoItem: '', editId: null, edit: null})
        }
        this.props.delete(itemId) 
    }
    onEdit = (itemId) => {
        const all = this.props.todoItems
        const editItem = all.find((item) => {
            return item.id === itemId
        })
       this.setState({ todoItem: editItem.todo, editId: itemId , edit: true });
    }
    ondeleteAll = () => {
        this.props.deleteAll()
        this.setState({todoItem: "", editId: null, edit: null})
    }

    whenChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }
    
    render() {
        const { todoItems, flag } = this.props;
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
                            {this.state.edit ? (<Button cn="btn light-blue darken-3" text="Update" />) : (<Button cn="btn light-blue darken-3" text="Add" />)}
                        </div>
                        {todoItems.length > 1 ? (<div className="col s6 m6 l6 offset-s4 offset-m4 offset-l5">
                        <ButtonD cn="btn-small red lighten-2 white-text" oc={this.ondeleteAll} text="Delete All" />
                        </div>) : (null)}
                    </div>
                </form>
                <br />
                {flag ? (todosList) : (
                    <div className="center flow-text red-text">
                    Loading. . . .
                    </div>
                )}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        todoItems: state.todos,
        flag: state.flag
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add: (addItem) => dispatch(AddTodo(addItem)) ,
        edit: (editItem , editid) => dispatch(UpdateTodo(editItem, editid)),
        delete: (did) => dispatch(DeleteTodo(did)),
        allTodos: () => dispatch(allTodos()),
        deleteAll: () => dispatch(deleteAll())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FrontCom);