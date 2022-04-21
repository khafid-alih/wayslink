// import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Image,
} from "react-bootstrap"

// import { API, setAuthToken } from "../config/Axios";
import Sidebar from "../components/navigation/Sidebar";
import NavbarHome from "../components/navigation/NavbarHome";

import firstTemplate from "../assets/template-1.png"
import secondTemplate from "../assets/template-2.png"
import thirdTemplate from "../assets/template-3.png"
import forthTemplate from "../assets/template-4.png"

const Template = () =>{
    document.title = "Wayslink"

    localStorage.setItem('path', "/0/template")

    return (
        <>
            <NavbarHome title="Template" />
            <div className="d-flex w-100">
                <Sidebar active="Template"/>
                <div className="w-100" style={{ backgroundColor: '#E5E5E5' }}>
                    <div className="m-5 d-flex justify-content-between">
                        <Link to="/0/add-link/0">
                            <Image src={firstTemplate} style={{ width: '33.5vh', cursor: 'pointer'}} alt="template-1" />
                        </Link>
                        <Link to="/0/add-link/1">
                            <Image src={secondTemplate} style={{ width: '33.5vh', cursor: 'pointer'}} alt="template-1" />
                        </Link>
                        <Link to="/0/add-link/2">
                            <Image src={thirdTemplate} style={{ width: '33.5vh', cursor: 'pointer'}} alt="template-1" />
                        </Link>
                        <Link to="/0/add-link/3">
                            <Image src={forthTemplate} style={{ width: '33.5vh', cursor: 'pointer'}} alt="template-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Template