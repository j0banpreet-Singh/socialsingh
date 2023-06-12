import "./post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {format} from "timeago.js"

const Post = ({ post }) => {
    const navigate = useNavigate();
    const [likes, setLikes] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const[currentUser,setCurrentUser] = useState({})
    const STATIC = "http://localhost:8002/images/"

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await axios.get(`/users/${post.userId}`)
            setCurrentUser(res.data)
        }

        fetchData()
    },[post.userId])
    
    const handleLike = () => {
        console.log(isLiked)
        setLikes(isLiked?likes-1:likes+1)
        setIsLiked(!isLiked)
    }

    const handleRedirect = ()=>{
        navigate(`/profile/${post.userId}`)
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img
                            src= {currentUser.profilePicture?
                                STATIC + currentUser?.profilePicture : STATIC + "noImage.jpeg"
                            }
                            alt="avatar"
                            className="postProfileImg"
                            onClick={handleRedirect}
                            style={{cursor:"pointer"}}
                            />

                        <span className="postUsername">
                            {currentUser?.username}
                        </span>

                        <span className="postDate">
                            {format(post?.createdAt)}
                        </span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    {post.img && <img
                        src={STATIC + post?.img}
                        alt="avatar"
                        className="postImg" />}
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img
                            src="https://image.similarpng.com/very-thumbnail/2020/06/Icon-like-button-transparent-PNG.png"
                            alt=""
                            onClick={handleLike}
                            className="likeIcon" />
                        <img
                            src="https://w7.pngwing.com/pngs/445/535/png-transparent-heart-button-like-icon-social-media-internet-social-communicate-online.png"
                            alt=""
                            onClick={handleLike}
                            className="likeIcon" />
                        <span className="postLikeCounter">
                            {likes} People Liked it
                        </span>
                    </div>

                    <div className="postBottomRIght">
                        <span className="postCommentText">2 comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
