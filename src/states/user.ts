import {UserType} from "../models/user";
// 全局的用户状态
let currentUser: UserType;

const setCurrentUserState = (user: UserType) => {
    currentUser = user;
}

const getCurrentUserState = () : UserType=> {
    return currentUser;
}

export {
    setCurrentUserState,
    getCurrentUserState,
}