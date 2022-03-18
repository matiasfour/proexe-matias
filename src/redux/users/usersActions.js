import { 
    FETCH_USERS_FAIL, 
    FETCH_USERS_REQUEST, 
    FETCH_USERS_SUCCESS,
    ADD_USERS_FAIL, 
    ADD_USERS_REQUEST, 
    ADD_USERS_SUCCESS,
    REMOVE_USERS_FAIL,
    REMOVE_USERS_REQUEST,
    REMOVE_USERS_SUCCESS,
    EDIT_USERS_FAIL,
    EDIT_USERS_REQUEST,
    EDIT_USERS_SUCCESS
} from "./usersTypes"
import axios from 'axios';


export const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

export const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

export const fetchUsersfail = error => {
    return {
        type: FETCH_USERS_FAIL,
        error: error
    }
}

export const addUserRequest = () => {
    return {
        type: ADD_USERS_REQUEST
    }
}

export const addUserSuccess = user => {
    return {
        type: ADD_USERS_SUCCESS,
        payload: user
    }
}

export const addUserfail = error => {
    return {
        type: ADD_USERS_FAIL,
        error: error
    }
}

export const removeUserRequest = () => {
    return {
        type: REMOVE_USERS_REQUEST
    }
}

export const removeUserSuccess = id => {
    return {
        type: REMOVE_USERS_SUCCESS,
        payload: id
    }
}

export const removeUserfail = (error, id) => {
    return {
        type: REMOVE_USERS_FAIL,
        error: error,
        id: id
    }
}

export const editUserRequest = () => {
    return {
        type: EDIT_USERS_REQUEST
    }
}

export const editUserSuccess = user => {
    return {
        type: EDIT_USERS_SUCCESS,
        payload: user
    }
}

export const editUserfail = (error, user) => {
    return {
        type: EDIT_USERS_FAIL,
        error: error,
        user: user
    }
}


export const addUser = (user) => {

    return async (dispatch) => {
        dispatch(addUserRequest)
        try {
            const response = await axios.post('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data', user, {
                    headers: {'Content-Type': 'application/json;charset=utf-8'}
                }
            );
            dispatch(addUserSuccess(response.data));
        } catch (error) {
            dispatch(addUserfail(error.message));
        }
      
    }
}

export const removeUser = (id) => {

    return async (dispatch) => {
        dispatch(removeUserRequest);
        try {
            const response = await axios.delete(`https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${id}`);
            console.log(response.status)
            //status code 200 only happens if trying to delete one of the 10 items from api
            if(response.status === 200){
                dispatch(removeUserSuccess(id));
            }
            
        } catch (error) {
            //It will also dispatch an error even if user exists in redux store but not exists in server api 
            // so in case you try to delete a created user, id should also be passed in params in case users exists in redux store
            dispatch(removeUserfail(error.message, id));
        }
      
    }
}


export const editUser = (user) => {

    return async (dispatch) => {
        dispatch(editUserRequest);
        try {
            const response = await axios.put(`https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${user.id}`, user);
            console.log(response.status)

            //status code 200 only happens if trying to edit one of the 10 items from api
            if(response.status === 200){
                dispatch(editUserSuccess(response.data));
            }
        } catch (error) {
            //It will also dispatch an error even if user exists in redux store but not exists in server api 
            // so in case you try to edit a created user, user should also be passed in params in case users exists in redux store
            dispatch(editUserfail(error, user));
        }
      
    }
}



export const fetchUsers = () => {
    return async (dispatch) => {
        dispatch(fetchUsersRequest)
        try {
            const response = await axios.get('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data');
            dispatch(fetchUsersSuccess(response.data));
        } catch (error) {
            dispatch(fetchUsersfail(error.message));
        }
      
    }
}