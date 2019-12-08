import { ADVANCED_USER, GENERAL_USER} from './actionType';


export const initialState = {
    auth: 0,              //0：代表未登录，1：代表普通用户，2：代表高级用户
    user: ''
};  

export const reducer = (state, action) => {
    switch (action.type) {
        case ADVANCED_USER:
                return {auth: 1, user: action.user};
        case GENERAL_USER:
            return {auth: 2, user: action.user};
        default: 
            return initialState;
    }
}