//import { ADD_TODO, TOGGLE_TODO } from "../actionTypes";
import {add_data,delete_data} from "./actions"
 const initialState = {
    DataEDT: []

};
const ADD_DATA="ADD_DATA" ;
const DELETE_DATA="DELETE_DATA" ;

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_DATA: {
            return {
                DataEDT:action.data

            };
        }
        case DELETE_DATA: {
           return {
               DataEDT:[]
           };
        }
        default:
            return state;
    }
}
