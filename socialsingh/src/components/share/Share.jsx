import "./share.css"
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef, useState } from "react";
import axios from "axios"

const Share = () => {
    const { user } = useContext(AuthContext);
    const STATIC = "http://localhost:8002/images/"
    const [file, setFile] = useState()
    const descRef = useRef()

    const handlePost = async(e)=>{
        const newPost = {
            userId:user._id,
            desc:descRef.current.value
        }

        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name',filename);
            data.append('file',file)
            newPost.img = filename
            console.log(newPost)
            try{
                await axios.post("/upload", data)
            }catch(error){
                console.log(error)
            }
        }

        try{
            await axios.post("/posts",newPost);
            window.location.reload();
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        src={user.profilePicture ? STATIC + user.profilePicture : STATIC + "noImage.jpeg"}
                        alt="avatar"
                        className="shareProfileImg" />
                    <input
                        type="text"
                        className="shareInput"
                        placeholder={"whats on your mind " + user.username}
                        ref={descRef}
                    />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <AutoAwesomeMotionIcon htmlColor="tomato" className="shareIcon" />
                            <input type="file" id="file" onChange={(e) => { setFile(e.target.files[0]) }} style={{ display: "none" }} />
                            <label htmlFor="file" className="shareOptionText">photos or videos</label>
                        </div>

                        <div className="shareOption">
                            <LabelIcon htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>

                        <div className="shareOption">
                            < LocationOnIcon htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>

                        <div className="shareOption">
                            <TagFacesIcon htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button onClick={handlePost} className="shareButton">
                        share
                    </button>

                </div>
                {file && <div className="bottomContainer">
                    <img src={URL.createObjectURL(file)}  alt="" className="submitImg"/>
                </div>}
            </div>
        </div>
    )
}

export default Share
