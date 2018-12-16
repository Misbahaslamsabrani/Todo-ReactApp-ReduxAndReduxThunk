const initState = []
const todoReducer = (state = initState, action) => {
    console.log(action)
    if(action.type === "Add"){
        const temArr = [...state]
        temArr.push(action.newtodo)
        return state = temArr;
    }
    else if(action.type === "Edit"){
        const temArr = [...state]
        temArr[action.editIndex] = action.edittodo
        return state = temArr;
    }
    else if(action.type === "Del"){
        const temArr = [...state]
        temArr.splice(action.delIndex, 1)
        return state = temArr;
    }
    else{return state;}
}
export default todoReducer;