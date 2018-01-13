import { NEW_USER, USER_ADDING } from './actionTypes';

const addUser = user => {
    return {
        type : NEW_USER,
        user : user
    }
}

export const newUser = user => {
    return dispatch => {
        let users = localStorage.getItem('users');
        
        if(users != null){
            users = JSON.parse(users);
            users = [...users, user];
        }else{
            users = [user];
        }
        
        localStorage.setItem('users', JSON.stringify(users));

        setTimeout(() => {
            dispatch(addUser(user));
        }, 2000);
    }
}

export const userAdding = adding => {
    return {
        type : USER_ADDING,
        userAdding : adding
    }
}