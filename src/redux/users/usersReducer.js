import { 
    FETCH_USERS_FAIL, 
    FETCH_USERS_REQUEST, 
    FETCH_USERS_SUCCESS,
    ADD_USERS_FAIL,
    ADD_USERS_SUCCESS,
    ADD_USERS_REQUEST,
    REMOVE_USERS_FAIL,
    REMOVE_USERS_REQUEST,
    REMOVE_USERS_SUCCESS,
    EDIT_USERS_FAIL,
    EDIT_USERS_REQUEST,
    EDIT_USERS_SUCCESS
} from "./usersTypes"

const initialState = {
    loading: false,
    users: [],
    error: '',
}

const removeUser = (users, id) => {
  
  const usersFiltered = users.filter(user =>  user.id !== id);
  return usersFiltered;
}

const editUser = (users, userUpdated) => {
    const id = parseInt(userUpdated.id)
    const findUserIndex = users.findIndex((user => user.id === (id - 1) ));
    console.log(findUserIndex)
    users[findUserIndex + 1] = userUpdated;
    console.log("ingreso")
    
    return users;
}

const usersReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case FETCH_USERS_REQUEST: return {
            ...state,
            loading: true

        }

        case FETCH_USERS_SUCCESS: return {
            ...state,
            loading: false,
            users: action.payload,
            error: ''

        }
        case FETCH_USERS_FAIL: return {
            ...state,
            loading: false,
            users: [],
            error: action.error

        }
        case ADD_USERS_REQUEST: return {
            ...state,
            loading: true
        }

        case ADD_USERS_SUCCESS: return {
            loading: false,
            users: [...state.users , action.payload],
            error: ''

        }
        case ADD_USERS_FAIL: return {
            ...state,
            loading: false,
            users: state.users,
            error: action.error

        }
        case REMOVE_USERS_REQUEST: return {
            ...state,
            loading: true
        }

        case REMOVE_USERS_SUCCESS: return {
            ...state,
            loading: false,
            users: removeUser(state.users, action.payload),
            error: ''

        }
        case REMOVE_USERS_FAIL: return {
            loading: false,
            users: removeUser(state.users, action.id),
            error: action.error

        }
        case EDIT_USERS_REQUEST: return {
            ...state,
            loading: true
        }

        case EDIT_USERS_SUCCESS: return {
            loading: false,
            users: editUser(state.users, action.payload),
            error: ''

        }
        case EDIT_USERS_FAIL: return {
            ...state,
            loading: false,
            users: editUser(state.users, action.user),
            error: action.error

        }
   
        default: return state
        
    }
}

export default usersReducer