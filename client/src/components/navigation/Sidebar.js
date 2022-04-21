// import { useState } from "react";
import { Link } from "react-router-dom";
import { 
    Image
} from "react-bootstrap";

import templateIcon from "../../assets/cube.png"
import templateIconActive from "../../assets/cube-active.png"
import profileIcon from "../../assets/user.png"
import profileIconActive from "../../assets/user-active.png"
import myLinkIcon from "../../assets/link.png"
import myLinkIconActive from "../../assets/link-active.png"
import logoutIcon from "../../assets/logout.png"

const Sidebar = ({active}) =>{

    return (
        <div fluid className="ms-5 mt-4 " style={{ width: '15%', height: '87.5vh' }}>
            <Link to="/0/template" style={{ textDecoration: 'none' }}>
                {active === "Template" ? 
                <h1 className="fs-5 mb-5 text-warning ms-3"><Image className="me-2" src={templateIconActive} />Template</h1>
                :
                <h1 className="fs-5 mb-5 text-black ms-3"><Image className="me-2" src={templateIcon} />Template</h1>
                }
            </Link>
            <Link to="/0/my-profile" style={{ textDecoration: 'none' }}>
                {active === "Profile" ? 
                <h1 className="fs-5 mb-5 text-warning ms-3"><Image className="me-2" src={profileIconActive} />Profile</h1>
                :
                <h1 className="fs-5 mb-5 text-black ms-3"><Image className="me-2" src={profileIcon} />Profile</h1>
                }
            </Link>
            <Link to="/0/my-link" style={{ textDecoration: 'none' }}>
                {active === "Link" ? 
                <h1 className="fs-5 mb-5 text-warning ms-3"><Image className="me-2" src={myLinkIconActive} />My Link</h1>
                :
                <h1 className="fs-5 mb-5 text-black ms-3" ><Image className="me-2" src={myLinkIcon} />My Link</h1>
                }
            </Link>
            <Link to="/logout" className="" style={{ textDecoration: 'none' }}>
                <h1 className="fs-5 text-black ms-3" style={{ marginTop: '330px' }}><Image className="me-2" src={logoutIcon} />Logout</h1>
            </Link>
        </div>
    )
}

export default Sidebar