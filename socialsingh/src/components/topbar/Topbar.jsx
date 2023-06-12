import "./topbar.css"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import SearchResult from "../searchResult/SearchResult";

const Topbar = () => {
    const { dispatch, user } = useContext(AuthContext)
    const navigate = useNavigate();
    const STATIC = "http://localhost:8002/images/";
    const [input, setInput] = useState("");
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            if (input) {
                const data = await axios.get(`/users/search/${input}`)
                setUsers(data.data)
                console.log("useffect")
            }
        }

        fetchData();
    }, [input])

console.log(users)
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span
                    onClick={() => { navigate("/") }}
                    className="logo">SinghSocial</span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchOutlinedIcon className="searchIcon" />
                    <input
                        type="text"
                        placeholder="search for friend, Post or Video"
                        className="searchInput"
                        onChange={(e) => { setInput(e.target.value) }}
                    />
                </div>
                {input && users.length >= 1 && <div className="searchResultContainer">
                    <div className="results">
                       {users.map(user=>(
                        <SearchResult user={user} key={user._id}/>
                       )) }
                    </div>
                </div>}
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>

                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <PersonIcon />
                        <div className="topbarIconBadge">1</div>
                    </div>
                    <div className="topbarIconItem">
                        <MessageIcon />
                        <div className="topbarIconBadge">1</div>
                    </div>
                    <div className="topbarIconItem">
                        <NotificationsIcon />
                        <div className="topbarIconBadge">1</div>
                    </div>
                    <div className="topbarIconItem">
                        <span
                            onClick={() => { dispatch({ type: "LOGOUT" }) }}
                            className="logout-button">Logout</span>
                    </div>
                </div>
                <img
                    src={user.profilePicture ? STATIC + user.profilePicture : STATIC + "noImage.jpeg"}
                    alt="avatar"
                    onClick={() => { navigate(`/profile/${user._id}`) }}
                    className="topbarImg" />
            </div>
        </div>
    )
}

export default Topbar
