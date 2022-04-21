import { useState, useEffect } from "react";
import { Image } from "react-bootstrap"
import { API, setAuthToken } from "../config/Axios";
import image from "../assets/img/eniko-kis-KsLPTsYaqIQ-unsplash.jpg"
import { useNavigate, useParams, Navigate } from "react-router-dom";

const ViewLink = () =>{

  const navigate = useNavigate()
  const { id, uniq } = useParams()

  const [ links, setLinks ] = useState(null)

    const getLink = async () =>{
        try {
            setAuthToken(localStorage.token)
            const response = await API.get("/link/"+id+"/"+uniq)
            setLinks(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const viewerLink = async (id) =>{
        try {
            await API.patch("/view-link/"+id)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
      viewerLink(id)
      getLink()
    }, [])

  return (
      <>
          <div className="d-flex justify-content-center p-5"> 
            <div className="w-50 d-flex p-2 px-4 flex-column align-items-center shadow-lg" >
              <Image src={`http://localhost:4000/uploads/${links?.image}`} className="mb-3" style={{ width: '120px', height: "120px",borderRadius: '150px'}}/>
              <div className="text-center w-75 mb-3">
                <h1 className="fs-5 mb-3">{links?.title}</h1>
                <h1 className="fs-6">{links?.describtion}</h1>
              </div>
              {links?.links?.map((item) => (
                <div className="text-center d-flex w-100 mb-3 p-2 align-items-center" style={{ backgroundColor: 'black'}}>
                    <a href={item.link} target="_blank" className="w-100 text-center" style={{textDecoration:'none'}}>
                    <div className="text-center d-flex w-100 align-items-center">
                      <Image src={`http://localhost:4000/uploads/${item?.image}`} className="ms-3" style={{ width: '50px', height: "50px",borderRadius: '150px'}}/>
                      <div className="w-75 text-center">
                        <h1 className="fs-6 text-white">{item.titleLink}</h1>
                      </div>
                    </div>
                  </a>
                </div>
                ))}
            </div>
          </div>
      </>
  )
}

export default ViewLink