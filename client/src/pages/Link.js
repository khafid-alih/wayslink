import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Form,
    Image
} from "react-bootstrap"

import { API, setAuthToken } from "../config/Axios";
import Sidebar from "../components/navigation/Sidebar";
import NavbarHome from "../components/navigation/NavbarHome";

import linkImage from "../assets/link-image.png"
import viewIcon from "../assets/view.png"
import editIcon from "../assets/edit.png"
import deleteIcon from "../assets/delete.png"


const Link = () =>{
    document.title = "Wayslink"

    localStorage.setItem('path', "/0/my-link")

    const [ link, setLink ] = useState([])
    const [ iddelete, setDelete ] = useState(null)

    const navigate = useNavigate()

    const getMyLink = async () =>{
        try {
            setAuthToken(localStorage.token)
            const response = await API.get("/link")
            setLink(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteMyLink = async (id) =>{
        try {
            setAuthToken(localStorage.token)
            await API.delete("/link/"+id)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getMyLink()
    }, [])

    useEffect(()=>{
        deleteMyLink(iddelete)
        setDelete(null)
        getMyLink()
    }, [iddelete])

    function seeLink(lhink){
      navigate(lhink)
    }

    return (
        <>
            <NavbarHome title="My Link" />
            <div className="d-flex w-100">
                <Sidebar active="Link"/>
                <div className="px-5 py-4 w-100" style={{ backgroundColor: '#E5E5E5' }}>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h1 className="fs-4 mb-4">All Link</h1>
                        </div>
                        <div>
                            <Button className="btn-sm px-2 text-white" variant="warning" style={{ borderRadius: '20px' }} >0</Button>
                        </div>
                        <div style={{ width : '70%' }}>
                            <Form 
                            // onSubmit={hendleOnSubmit}
                            className="mb-4 me-2"
                            >
                                <Form.Group controlId="formBasicName">
                                    <Form.Control 
                                        placeholder="Find Your Search"
                                        type="text" 
                                        name="name"
                                        // onChange={handleChange}
                                        className="w-100 mb-3 fs-6 border-0 border-bottom border-dark rounded-0"
                                        style={{ backgroundColor: '#E5E5E5', fontWeight: '400'}}
                                    />
                                </Form.Group>
                            </Form>
                        </div>
                        <div>
                            <Button className="btn-sm px-4 fs-6 text-white" variant="warning" style={{ borderRadius: '10px', fontWeight: '600'}} >Search</Button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div>
                          {link.map((item) => (
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div className="d-flex align-items-center " style={{ cursor: 'pointer', width: '65%'}}>
                                    <Image src={`http://localhost:4000/uploads/${item.image}`} style={{ maxWidth: '120px', maxHeight: '120px'}}/>
                                    <div className="w-100 ms-4">
                                        <div className="d-flex justify-content-between mb-1">
                                            <h1 className="fs-4">{item.title}</h1>
                                            <h1 className="fs-4">{item.viewCount}</h1>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <h1 className="fs-6" style={{ color: 'rgba(126, 122, 122, 1)'}}>{"http://localhost:3000/link/"+item.id+"/"+item.linkName}</h1>
                                            <h1 className="fs-6" style={{ color: 'rgba(126, 122, 122, 1)'}}>Visit</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="me-4">
                                    <Image className="ms-4" onClick={()=>seeLink(`/link/${item.id}/${item.linkName}`)} style={{ cursor: 'pointer', width: '40px'}} src={viewIcon} />
                                      <Image className="ms-4" style={{ cursor: 'pointer', width: '40px'}} src={editIcon} />
                                    <Image className="ms-4" onClick={()=>setDelete(item.id)} style={{ cursor: 'pointer', width: '40px'}} src={deleteIcon} />
                                </div>
                            </div>
                          ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Link