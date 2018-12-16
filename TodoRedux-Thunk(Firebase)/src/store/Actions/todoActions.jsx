import * as firebase from "firebase"
import "../../config/fbdb"
import { Types } from "../const/Types"
export const AddTodo = (additem) => {
    return (dispatch, getState) => {
        firebase.database().ref().child("Todos").push({item: additem})
        dispatch({type: Types.Add, additem})
    }
}
export const UpdateTodo = (edititem,editid ) => {
    return (dispatch, getState) => {
        firebase.database().ref().child(`Todos/${editid}`).update({item: edititem})
        dispatch({type:Types.Update , edittodo: edititem})
    }
}
export const DeleteTodo = (did) => {
    return (dispatch, getState) => {
        firebase.database().ref().child(`Todos/${did}`).remove()
        dispatch({type:Types.Delete})
    }
}

export const allTodos = () => {
    return(dispatch) => {
        firebase.database().ref().child("Todos").on("value",(snapshot) => {
            const todos = snapshot.val()
            const TempArr = [];
            for(let key in todos){
                TempArr.push({id: key,todo: todos[key].item});
            }
            dispatch({type: Types.PervTodos, payLoad: TempArr })
        })
    }
}

export const deleteAll = () => {
    return dispatch => {
        firebase.database().ref().child("Todos").remove()
        dispatch({type: Types.DeleteAll})
    }
}