import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Modal,
    Form
} from "react-bootstrap"

import { API } from "../../config/Axios";

import userContext from "../../reducer/context/userContext";

import { LOGIN } from "../../reducer/type";

const Login = (props) => {

    const navigate = useNavigate()
    
    function handleSwitch() {
        props.openRegister()
        props.onHide()
    }

    const [, dispatch] = useContext(userContext)

    function handleLogin(){
        dispatch({type : LOGIN})
        navigate("/0/template")
    }

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const { email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    async function hendleOnSubmit(e){
        try {
            e.preventDefault();
      
            // Configuration
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
      
            // Data body
            const body = JSON.stringify(form);
      
            // Insert data for login process
            const response = await API.post("/login", body, config);
      
            // Checking process
            if (response?.status === 200) {
              // Send data to useContext
              dispatch({
                type: "LOGIN",
                payload: response.data.data,
              })

            //   Status check
              navigate("/0")
              
            }
          } catch (error) {
            console.log(error);
          }
    }

    return (
        <>
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                size="md"
                centered
            >
                <Modal.Body>
                    <div className="px-4 py-3">
                        <h1 className="mb-4 fs-2" style={{fontWeight : '700'}}>Sign In</h1>
                        <div>
                        <Form 
                        onSubmit={hendleOnSubmit}
                        >
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control 
                                    type="email" 
                                    placeholder="Email" 
                                    value={email}
                                    name="email"
                                    onChange={handleChange}
                                    className="w-100 mb-3 fs-6"
                                    style={{ backgroundColor: 'rgba(188, 188, 188, 0.25)', border: '0.5px solid rgba(188, 188, 188, 1)', height: '48px'}}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" >
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password}
                                    name="password"
                                    onChange={handleChange}
                                    className="w-100 mb-3 fs-6"
                                    style={{ backgroundColor: 'rgba(188, 188, 188, 0.25)', border: '0.5px solid rgba(188, 188, 188, 1)', height: '48px'}}
                                />
                            </Form.Group>
                            <Button variant="warning" type="submit" className="w-100 fs-5 mt-4 mb-3 py-2 text-white" style={{fontWeight: '600'}}
                            >
                                Sign In
                            </Button>
                            <div className="text-center fs-6" >
                                <p>Already have an account ? Klik 
                                    <a 
                                    onClick={handleSwitch}
                                    style={{
                                        textDecoration : 'none',
                                        cursor : 'pointer',
                                        fontWeight: '700'
                                    }}
                                    > Here</a>                                                            
                                </p>
                            </div>
                            </Form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Login