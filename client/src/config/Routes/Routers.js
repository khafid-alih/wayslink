import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Routes, Route
} from 'react-router-dom'

import { API, setAuthToken } from '../Axios'

import PrivateRoute from "./PrivateRoute";

import { AUTH_SUCCESS } from "../../reducer/type";

import Main from "../../pages/Main"
import Template from "../../pages/Template"
import Profile from "../../pages/Profile"
import Link from "../../pages/Link"
import AddLink from "../../pages/AddLink"
import ViewLink from "../../pages/ViewLink"

import userContext from "../../reducer/context/userContext";

const Routers = () =>{

    document.title = "Wayslink"

    const navigate = useNavigate()

    const [state, dispatch] = useContext(userContext)

    useEffect(() => {
        if (localStorage.token) {
          setAuthToken(localStorage.token);
        }

        if (!state.isLogin) {
          localStorage.setItem('pathNotLogin', window.location.pathname)
          if(localStorage.pathNotLogin){
            navigate(localStorage.pathNotLogin)
          }else{
            navigate("/");
          }
        } else {
          if(localStorage.path){
            navigate(localStorage.path)
          }else{
              navigate("/0/template")
          }
        }

    }, [state]);

    const checkUser = async () => {
        try {
        const response = await API.get("/check-auth");

        // If the token incorrect
        // if (response.status === 404) {
        //     return dispatch({
        //     type: "AUTH_ERROR",
        //     });
        // }
        
        // Get user data
        let payload = response.data.data.user;
        // Get token from local storage
        payload.token = localStorage.token;
        // Send data to useContext
        dispatch({
            type: AUTH_SUCCESS,
            payload,
        });

        } catch (error) {
          console.log(error);
        }
    };

    useEffect(() => {
        checkUser();
    }, [])

    function Logout() {
      dispatch({
        type : "LOGOUT"
      })
      navigate("/")
    }

    return(
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/0" element={<PrivateRoute />}>
                    <Route index path="template" element={<Template />} />
                    <Route path="my-profile" element={<Profile />} />
                    <Route path="my-link" element={<Link />} />
                    <Route path="add-link/:templateId" element={<AddLink />} />
                    {/* <Route path="profile" element={<UserProfile />} />
                    <Route path="subscribe" element={<UserSubcribe />} />
                    <Route path="book/:id" element={<UserDetailBook />} />
                    <Route path="read-book/:id" element={<UserReadBook />} />
                    <Route path="edit-profile" element={<UserEditProfile />} /> */}
                    <Route path="link/:id/:uniq" element={<ViewLink />} />
                </Route>
                <Route path="/link/:id/:uniq" element={<ViewLink />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
    )
}



export default Routers