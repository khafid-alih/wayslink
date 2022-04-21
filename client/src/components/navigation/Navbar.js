import { useState } from "react";
import { Link } from "react-router-dom";
import { 
    Navbar as NavbarComp,
    Nav,
    Container,
    Button,
} from "react-bootstrap";

import Register from "../Modal/Register";
import Login from "../Modal/Login";

import mainLogo from "../../assets/logo.png"

const Navbar = () =>{
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    const openShowLogin = () => setShowLogin(true)
    const closeShowLogin = () => setShowLogin(false)
    const openShowRegister = () => setShowRegister(true)
    const closeShowRegister = () => setShowRegister(false)

    return (
        <>
            <NavbarComp expand="lg">
            <Container>
                <NavbarComp.Brand as={Link} to="/">
                    <img src={mainLogo} className="img-fluid" alt="brand"/>
                </NavbarComp.Brand>
                <NavbarComp.Toggle aria-controls="basic-navbar-nav" />
                <NavbarComp.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto" style={{ fontWeight: '600'}}>
                        <Nav.Link className="mt-1 me-2 text-black fs-6" onClick={openShowLogin}>Login</Nav.Link>
                        <Nav.Link>
                            <Button variant="warning" className="text-white fs-6 btn-sm rounded px-3" onClick={openShowRegister}>Register</Button>
                        </Nav.Link>
                    </Nav>
                </NavbarComp.Collapse>
            </Container>
        </NavbarComp>

        <Login 
            show={showLogin}
            onHide={closeShowLogin}
            openRegister={openShowRegister}
        />

        <Register 
            show={showRegister}
            onHide={closeShowRegister}
            openLogin={openShowLogin}
        />

        </>
    )
}

export default Navbar