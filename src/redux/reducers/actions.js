const ADD_DATA="ADD_DATA" ;
const DELETE_DATA="DELETE_DATA" ;
export const add_data = content =>({
    type:ADD_DATA,
    data:content
});
export const delete_data= () =>({
    type:DELETE_DATA,
    data:[]
});