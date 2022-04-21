import {
    Image,
    Container,
    Row,
    Col,
    Button,
} from "react-bootstrap"

// import { API, setAuthToken } from "../config/Axios";
import Navbar from "../components/navigation/Navbar";

import mainBg from "../assets/index-bg.png"
import mainImage from "../assets/index-image.png"

const Main = () =>{

    return (
        <>
            <Navbar />
            <div className="d-flex align-items-center" 
            style={{ 
                backgroundImage: `url(${mainBg})`, 
                height: '100vh'}}> 
                <Container>
                    <Row>
                        <Col>
                            <h1 className="text-white" style={{ fontSize: '72px'}}>The Only Link You’ll Ever Need</h1>
                            <div className="text-white my-4" style={{ fontSize: '24px'}}>
                                <p className="mb-4">Add a link for your Social Bio and optimize your social media traffic.</p>
                                <p className="mb-4">safe, fast and easy to use</p>
                            </div>
                            <Button className="text-white mt-4 px-4" 
                            style={{ 
                                backgroundColor: 'black', 
                                fontSize: '20px', 
                                border: 'none', 
                                borderRadius: '8px'
                            }}>Get Started For Free</Button>
                        </Col>
                        <Col>
                            <Image src={mainImage} style={{ width: '40vw'}} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Main