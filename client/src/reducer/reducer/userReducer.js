import { AUTH_SUCCESS, LOGIN, LOGOUT } from "../type";

const userReducer = (state, action)=>{
    const { type, payload } = action

    switch(type){ 
        case LOGIN:
            localStorage.setItem("token", payload.token)
            return{
                isLogin : true,
                user : payload
            }
        case AUTH_SUCCESS:
            return{
                isLogin : true,
                user : payload
            }
        case LOGOUT:
            localStorage.removeItem("token");
            localStorage.removeItem("path");
            return{
                isLogin : false,
                user : {}
            }
        default: 
            throw new Error()
    }
}

export default userReducer 