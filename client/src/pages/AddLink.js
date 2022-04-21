import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Image,
  Button,
  Form,
} from "react-bootstrap"

import { API, setAuthToken } from "../config/Axios";
import Sidebar from "../components/navigation/Sidebar";
import NavbarHome from "../components/navigation/NavbarHome";

import firstTemplate from "../assets/template-1.png"
import secondTemplate from "../assets/template-2.png"
import thirdTemplate from "../assets/template-3.png"
import forthTemplate from "../assets/template-4.png"

import blankImage from "../assets/blank-image.png"

const templateLink = [ firstTemplate, secondTemplate, thirdTemplate, forthTemplate ]

const AddLink = () =>{

  const { templateId } = useParams()
  const navigate = useNavigate()

  const [counter, setCounter] = useState(0)
  const [counterArray, setCounterArray] = useState([])

  const [previewMainImage, setPreviewMainImage] = useState(blankImage)
  const [previewImage1, setPreviewImage1] = useState(blankImage)
  const [previewImage2, setPreviewImage2] = useState(blankImage)
  const [previewImage3, setPreviewImage3] = useState(blankImage)
  const [previewImage4, setPreviewImage4] = useState(blankImage)
  const [previewImage5, setPreviewImage5] = useState(blankImage)

  const previewArray = [ previewImage3, previewImage4, previewImage5]

  const handleAddLink = () =>{
    setCounterArray(prevState => [...prevState, "o"])
    setCounter(counter + 1) 
  }

  const [form, setForm] = useState({
    title: "",
    describtion : "",
    mainImage: "",
    title1: "",
    link1: "",
    title2: "",
    link2: "",
    title3: "",
    link3: "",
    title4: "",
    link4: "",
    title5: "",
    link5: "",
    linkImage1: "",
    linkImage2: "",
    linkImage3: "",
    linkImage4: "",
    linkImage5: "",
  });

  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.name === "mainLinkImage") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreviewMainImage(url);
    }
    if (e.target.name === "linkImage1") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreviewImage1(url);
    }
    if (e.target.name === "linkImage2") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreviewImage2(url);
    }
    if (e.target.name === "linkImage3") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreviewImage3(url);
    }
    if (e.target.name === "linkImage4") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreviewImage4(url);
    }
    if (e.target.name === "linkImage5") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreviewImage5(url);
    }
  }

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      if (localStorage.token) {
        setAuthToken(localStorage.token);
        }

      // Configuration
      const config = {
        headers: {
            "Content-type": "multipart/form-data",
          },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("mainLinkImage", form.mainLinkImage[0], form.mainLinkImage[0].name);
      formData.set("title", form.title);
      formData.set("describtion", form.describtion);

      formData.set("linkImage1", form.linkImage1[0], form.linkImage1[0].name);
      formData.set("title1", form.title1);
      formData.set("link1", form.link1);
      
      formData.set("linkImage2", form.linkImage2[0], form.linkImage2[0].name);
      formData.set("title2", form.title2);
      formData.set("link2", form.link2);

      if(counterArray[0]){
        formData.set("index0", 0);
        formData.set("linkImage3", form.linkImage3[0], form.linkImage3[0].name);
        formData.set("title3", form.title3);
        formData.set("link3", form.link3);
      }
      
      if(counterArray[1]){
        formData.set("index1", 1);
        formData.set("linkImage4", form.linkImage4[0], form.linkImage4[0].name);
        formData.set("title4", form.title4);
        formData.set("link4", form.link4);
      }
      
      if(counterArray[2]){
        formData.set("index2", 2);
        formData.set("linkImage5", form.linkImage5[0], form.linkImage5[0].name);
        formData.set("title5", form.title5);
        formData.set("link5", form.link5);
      }

      // Insert product data
      await API.post("/link/"+templateId, formData, config);
      
      navigate('/0/my-link')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarHome title="Template" />
      <div className="d-flex w-100">
        <Sidebar active="Template"/>
        <div className="w-100" style={{ backgroundColor: '#E5E5E5' }}>
          <div className="mx-5 mt-4 mb-2">
            <div className="d-flex justify-content-between">
              <div>
                <h1 className="fs-4 mb-4">Create Link</h1>
              </div>
              <div>
                <Button className="btn-sm px-4 fs-6 text-white" variant="warning" style={{ borderRadius: '10px', fontWeight: '600'}} onClick={handleOnSubmit}>Publish Link</Button>
              </div>
            </div>
            <div className="d-flex">
              <div className="me-5 p-4" style={{ width: '60%', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden'}}>
                <div style={{ maxHeight: '72vh', overflow: 'auto', paddingRight: '300px', marginRight: '-300px', paddingLeft: '300px', marginLeft: '-300px'}}>
                  <div>
                    <Form.Label for="mainLinkImage">
                      { previewMainImage && <Image  src={previewMainImage} style={{ width: "150px", height: "150px", objectFit: "cover", cursor: 'pointer' }} alt="template" />}
                        <p className="btn btn-warning btn-sm px-4 ms-5 fs-6 text-white" variant="warning" style={{ borderRadius: '10px', fontWeight: '600'}} >Upload</p>
                    </Form.Label>
                    <Form.Control 
                        type="file"  
                        id="mainLinkImage"
                        name="mainLinkImage"
                        onChange={handleChange}
                        hidden
                        />
                  </div>
                  <div className="my-4 mb-5">
                    <Form.Group controlId="formBasicTitle">
                      <Form.Label style={{ color: 'rgba(126, 122, 122, 1)'}}>Title</Form.Label >
                      <Form.Control 
                        type="text" 
                        name="title"
                        placeholder="ex. Your Title Link"
                        onChange={handleChange}
                        className="w-100 mb-3 fs-5 border-0 border-bottom border-dark rounded-0"
                        style={{ fontWeight: '400', color: 'black' }}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicDescription">
                      <Form.Label style={{ color: 'rgba(126, 122, 122, 1)'}}>Description</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="describtion"
                        placeholder="ex. Your Description"
                        onChange={handleChange}
                        className="w-100 mb-3 fs-5 border-0 border-bottom border-dark rounded-0"
                        style={{ fontWeight: '400', color: 'black'}}
                      />
                    </Form.Group>
                  </div>
                  <div className="mt-5">
                    {/* {link} */}
                    <div className="m-1 p-3 mt-5 d-flex" style={{ backgroundColor: 'rgba(236, 236, 236, 1)'}}>
                      <div className="me-3">
                        <Form.Label for="linkImage1">
                        { previewImage1 && <Image  src={previewImage1} style={{ width: "150px", height: "150px", objectFit: "cover", cursor: 'pointer' }} alt="template" />}
                        </Form.Label>
                        <Form.Control 
                            type="file"  
                            id="linkImage1"
                            name="linkImage1"
                            onChange={handleChange}
                            hidden
                            />
                      </div>
                      <div className="w-75">
                        <Form.Group controlId="formBasicTitle1">
                          <Form.Label style={{ color: 'rgba(126, 122, 122, 1)'}}>Title Link</Form.Label >
                          <Form.Control 
                            type="text" 
                            name="title1"
                            placeholder="ex. Your Title Link"
                            onChange={handleChange}
                            className="w-100 mb-3 fs-6 text-dark border-0 border-bottom border-dark rounded-0"
                            style={{ fontWeight: '400', backgroundColor: 'rgba(236, 236, 236, 1)' }}
                          />
                        </Form.Group>
                        <Form.Group controlId="formBasicLink1">
                          <Form.Label style={{ color: 'rgba(126, 122, 122, 1)'}}>Link</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="link1"
                            placeholder="ex. Your Link"
                            onChange={handleChange}
                            className="w-100 mb-3 fs-6 border-0 border-bottom border-dark rounded-0"
                            style={{ fontWeight: '400', backgroundColor: 'rgba(236, 236, 236, 1)'}}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="m-1 p-3 mt-4 d-flex" style={{ backgroundColor: 'rgba(236, 236, 236, 1)'}}>
                      <div className="me-3">
                        <Form.Label for="linkImage2">
                        { previewImage2 && <Image  src={previewImage2} style={{ width: "150px", height: "150px", objectFit: "cover", cursor: 'pointer' }} alt="template" />}
                        </Form.Label>
                        <Form.Control 
                            type="file"  
                            id="linkImage2"
                            name="linkImage2"
                            onChange={handleChange}
                            hidden
                            />
                      </div>
                      <div className="w-75">
                        <Form.Group controlId="formBasicTitle2">
                          <Form.Label style={{ color: 'rgba(126, 122, 122, 1)'}}>Title Link</Form.Label >
                          <Form.Control 
                            type="text" 
                            name="title2"
                            placeholder="ex. Your Title"
                            onChange={handleChange}
                            className="w-100 mb-3 fs-6 text-dark border-0 border-bottom border-dark rounded-0"
                            style={{ fontWeight: '400', backgroundColor: 'rgba(236, 236, 236, 1)' }}
                          />
                        </Form.Group>
                        <Form.Group controlId="formBasicLink2">
                          <Form.Label style={{ color: 'rgba(126, 122, 122, 1)'}}>Link</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="link2"
                            placeholder="ex. Your Link"
                            onChange={handleChange}
                            className="w-100 mb-3 fs-6 border-0 border-bottom border-dark rounded-0"
                            style={{ fontWeight: '400', backgroundColor: 'rgba(236, 236, 236, 1)'}}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    {counterArray.map((item, key) => (
                        <div className="m-1 p-3 mt-4 d-flex" style={{ backgroundColor: 'rgba(236, 236, 236, 1)'}}>
                        <div className="me-3">
                          <Form.Label for={"linkImage"+(key+3)}>
                          { previewArray[key] && <Image  src={previewArray[key]} style={{ width: "150px", height: "150px", objectFit: "cover", cursor: 'pointer' }} alt="template" />}
                          </Form.Label>
                          <Form.Control 
                              type="file"  
                              id={"linkImage"+(key+3)}
                              name={"linkImage"+(key+3)}
                              onChange={handleChange}
                              hidden
                              />
                        </div>
                        <div className="w-75">
                          <Form.Group controlId={"formBasicTitle"+(key+3)}>
                            <Form.Label style={{ color: 'rgba(126, 122, 122, 1)'}}>Title Link</Form.Label >
                            <Form.Control 
                              type="text" 
                              name={"title"+(key+3)}
                              placeholder="ex. Your Title"
                              onChange={handleChange}
                              className="w-100 mb-3 fs-6 text-dark border-0 border-bottom border-dark rounded-0"
                              style={{ fontWeight: '400', backgroundColor: 'rgba(236, 236, 236, 1)' }}
                            />
                          </Form.Group>
                          <Form.Group controlId={"formBasicLink"+(key+3)}>
                            <Form.Label style={{ color: 'rgba(126, 122, 122, 1)'}}>Link</Form.Label>
                            <Form.Control 
                              type="text" 
                              name={"link"+(key+3)}
                              placeholder="ex. Your Link"
                              onChange={handleChange}
                              className="w-100 mb-3 fs-6 border-0 border-bottom border-dark rounded-0"
                              style={{ fontWeight: '400', backgroundColor: 'rgba(236, 236, 236, 1)'}}
                            />
                          </Form.Group>
                        </div>
                      </div>
                    ))}
                    <div>
                      { counter !== 3 && <Button className="btn-sm mt-4 px-4 fs-6 w-100 text-white" variant="warning" style={{ borderRadius: '10px', fontWeight: '600'}} onClick={handleAddLink} >Add New Link</Button>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ms-5 mt-5 ps-5">
                <Image  src={templateLink[templateId]} style={{ width: '30vh', cursor: 'pointer'}} alt="template" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddLink