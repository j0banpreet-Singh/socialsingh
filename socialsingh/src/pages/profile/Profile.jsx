import "./profile.css";
import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed"
import RightBar from "../../components/rightbar/RightBar";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState()
  const [profileFile, setProfileFile] = useState(null);
  const STATIC = "http://localhost:8002/images/"
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.following.includes(id))

  console.log(followed)
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`/users/${id}`)
      setUser(data.data)
    }

    fetchData()
  }, [id])


  useEffect(() => {
    if (profileFile) { }
    const uploadImg = async () => {
      if (profileFile) {
        const data = new FormData();
        const filename = Date.now() + profileFile.name
        data.append('name', filename)
        data.append('file', profileFile)
        const body = {
          profilePicture: filename
        }
        try {
          await axios.post("/upload", data)
          await axios.put(`/users/${id}`, body)
          window.location.reload();
        } catch (error) {
          console.log(error)
        }
      }
    }
    uploadImg()
  }, [profileFile, id])

  const handleProfilePic = (e) => {
    setProfileFile(e.target.files[0])
  }

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${id}/unfollow`, {
          currentUserId: currentUser._id
        });

        dispatch({ type: "UNFOLLOW", payload: id })
      } else {
        await axios.put(`/users/${id}/follow`, {
          currentUserId: currentUser._id
        });
        dispatch({ type: "FOLLOW", payload: id })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <div className="coverContainer">
                <img
                  className="profileCoverImg"
                  src="https://wallpapercave.com/wp/wp6627474.jpg"
                  alt=""
                />
                <label
                  htmlFor="coverfile"
                  className="overlayCover">
                  Change cover photo
                </label>

                <input type="file" id="coverfile" hidden />
              </div>
              <div className="profilePic">
                <img
                  className="profileUserImg"
                  src={user?.profilePicture ? STATIC + user?.profilePicture : STATIC + "noImage.jpeg"}
                  alt="avatar" />
                <label
                  htmlFor="file"
                  className="overlay"
                >
                  <CreateIcon />
                </label>
                <input
                  type="file"
                  onChange={handleProfilePic}
                  id="file"
                  accept="images/*"
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.username}</h4>
              <span className="profileInfoDesc">{user?.desc ? user.desc : " "}</span>
              {
                currentUser._id !== id && <button className="follow" type="text" onClick={handleClick}>
                  {followed ? "Unfollow" : "follow"}
                  {followed ? <RemoveIcon /> : <AddIcon />}
                </button>
              }
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed id={id} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
