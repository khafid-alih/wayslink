import { useContext, useEffect, useState } from "react";
import {
    Button,
    Image,
    Form
} from "react-bootstrap"

import { API, setAuthToken } from "../config/Axios";
import userContext from "../reducer/context/userContext"
import { LOGOUT } from "../reducer/type"
import Sidebar from "../components/navigation/Sidebar";
import NavbarHome from "../components/navigation/NavbarHome";
import { useNavigate } from "react-router-dom";

const Profile = () =>{
    document.title = "Wayslink"

    localStorage.setItem('path', "/0/my-profile")

    const [ profile, setProfile ] = useState(null)
    const navigate = useNavigate()
    const [,dispatch] = useContext(userContext)

    const getMyProfile = async () =>{
        try {
            setAuthToken(localStorage.token)
            const response = await API.get("/user")
            setProfile(response.data.data.user)
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteUser(){
      try {
        setAuthToken(localStorage.token)
        await API.delete("/user")

        dispatch({type: LOGOUT})

        navigate('/logout')
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
        getMyProfile()
    }, [])

    return (
        <>
            <NavbarHome title="My Account" />
            <div className="d-flex w-100">
                <Sidebar active="Profile"/>
                <div className="w-100" style={{ backgroundColor: '#E5E5E5' }}>
                    <div className="mx-5 my-4">
                        <h1 className="fs-4 mb-4">My Information</h1>
                        <div className="w-100 p-4" style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                            <Form 
                            // onSubmit={hendleOnSubmit}
                            className="mb-4"
                            >
                            <Form.Group controlId="formBasicName">
                                <Form.Label style={{ color: 'rgba(126, 122, 122, 1)'}}>Name</Form.Label >
                                <Form.Control 
                                    type="text" 
                                    value={profile?.fullName}
                                    name="name"
                                    // onChange={handleChange}
                                    className="w-100 mb-3 fs-4 border-0 border-bottom border-dark rounded-0"
                                    style={{ fontWeight: '400'}}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label style={{ color: 'rgba(126, 122, 122, 1)'}}>Email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    value={profile?.email}
                                    // name="email"
                                    // onChange={handleChange}
                                    className="w-100 mb-3 fs-4 border-0 border-bottom border-dark rounded-0"
                                    style={{ fontWeight: '400'}}
                                />
                            </Form.Group>
                            </Form>
                        </div>
                        <div className="mt-4 d-flex justify-content-end">
                            <Button className="btn-sm px-4 me-4 fs-6 text-white" variant="warning" style={{ borderRadius: '10px', fontWeight: '600'}} >Save Account</Button>
                            <Button className="btn-sm px-4 fs-6" variant="danger" style={{ borderRadius: '10px', fontWeight: '600'}} onClick={deleteUser}>Delete Account</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile