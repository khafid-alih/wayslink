import { Link } from "react-router-dom";
import { 
    Navbar as NavbarComp,
    Nav,
    Container,
} from "react-bootstrap";

import mainLogo from "../../assets/logo.png"

const NavbarHome = ({title}) =>{

    return (
        <>
            <NavbarComp expand="lg">
            <Container fluid className="mx-5">
                <NavbarComp.Brand as={Link} to="/0/template">
                    <img src={mainLogo} className="img-fluid" alt="brand"/>
                </NavbarComp.Brand>
                <NavbarComp.Toggle aria-controls="basic-navbar-nav" />
                <NavbarComp.Collapse id="basic-navbar-nav">
                    <Nav className="ms-5" style={{ fontWeight: '600'}}>
                        <Nav.Link className="mt-1 me-2 text-black fs-4">{title}</Nav.Link>
                    </Nav>
                </NavbarComp.Collapse>
            </Container>
        </NavbarComp>

        </>
    )
}

export default NavbarHome