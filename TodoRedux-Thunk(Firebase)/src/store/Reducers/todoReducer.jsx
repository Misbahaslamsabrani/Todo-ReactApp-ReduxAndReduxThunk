import { Types } from "../const/Types"
const initState = {
    todos: [],
    flag: false
}
const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case Types.PervTodos:
            return {
                ...state,
                todos: action.payLoad,
                flag: true
            }
        case Types.Add:
            return state
        case Types.Update:
            return state
        case Types.Delete:
            return state
        case Types.DeleteAll:
            return state
        default:
            return state
    }
}
export default todoReducer;