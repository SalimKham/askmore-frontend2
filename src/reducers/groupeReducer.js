/* eslint-disable import/no-anonymous-default-export */
import { JOIN_GROUPE,GET_GROUPE, GET_GROUPE_LIST, ADD_GROUPE, UPDATE_GROUPE_LIST, ACCEPT_STUDENT_IN_GROUPE, LEAVE_GROUPE } from '../actions/types';

const initialState = {
    groupe: null,
    list: []
};


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_GROUPE_LIST:
            return {
                ...state,
                list: action.payload
            }

        case ADD_GROUPE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case UPDATE_GROUPE_LIST:
            return {
                ...state,
                list: updateList(state, action.payload)
            }
        case GET_GROUPE:
            return {
                ...state,
                groupe: action.payload,
            }

          
        case ACCEPT_STUDENT_IN_GROUPE:
            return {
                ...state,
                list: addStudentToGroupe(state.list, action.payload)
            }
            case JOIN_GROUPE:
                return {
                    ...state,
                    list: joinGroupe(state.list, action.payload)
                }

        case LEAVE_GROUPE:
            return {
                ...state,
                list: LeaveGroupe(state.list, action.payload)
            }
        default:
            return state;
    }
}
export const LeaveGroupe = (list, payload) => {

    let index = 0;
    list.map(g => {
        if (g.id === payload.id) {
           
            list[index] = payload;
            return null;
            
        }
        index++;
        return null;
    })
    
    return list;
}




export const addStudentToGroupe = (list, payload) => {
    let index = 0;
    
    list.map(g => {
        if (g.id === payload.id) {
            list[index] = payload;
            return null;   
        }
        index++;
        return null;
    })
    
    return list;
}
export const joinGroupe = (list, payload) => {
    let index = 0;
    list.map(g => {
        if (g.id === payload.id) {
            list[index] = payload;
            return null;
            
        }
        index++;
        return null;
    })
    
    return list;
}

export const updateList = (state, payload) => {
    switch (payload.state) {
        case 1:
            return state.list.filter(
                groupe => groupe.id !== payload.index
            );
        case 2:
            state.list[payload.index].state = payload.newState;
            break;
        default:
            break;

    }

    return state.list;
}
