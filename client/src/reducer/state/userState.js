import React, { useReducer} from "react";
import userContext from "../context/userContext";
import userReducer from "../reducer/userReducer";

const UserState = ({children}) =>{
  const initialState = {
    isLogin : false,
    user : {}
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  return(
    <userContext.Provider
      value={[state, dispatch]}
    >
      {children}
    </userContext.Provider>
  )
}   

export default UserState