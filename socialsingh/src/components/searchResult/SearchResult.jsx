import { useNavigate } from "react-router-dom";
import "./searchResult.css"

const SearchResult = ({user}) => {
    const STATIC = "http://localhost:8002/images/";
    const navigate = useNavigate();
    return (
        <div className="searchResult">
            <div className="leftUser">
                <img
                    src={user.profilePicture ? STATIC + user.profilePicture : STATIC + "noImage.jpeg"}
                    alt=""
                    className="searchImg"
                />
                <span className="UserName">{user.username}</span>
            </div>
            <div className="rightUser">
                <button 
                className="openButton"
                onClick={()=>{navigate(`/profile/${user._id}`)}}
                >visit Profile</button>
            </div>
        </div>
    )
}

export default SearchResult
