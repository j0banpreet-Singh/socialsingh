import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const Feed = ({ id }) => {
  const [post, setPost] = useState([])
  const { user} = useContext(AuthContext)
  useEffect(() => {
    const fetchData = async () => {
      const res = id ?
        await axios.get("/posts/profile/all") :
        await axios.get(`/posts/timeline/all/${user._id}`)

      setPost(res.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }))
    }


    fetchData();
  }, [id, user._id])

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {
          post?.map(post => (
            <Post post={post} key={post._id} />
          ))
        }
      </div>
    </div>
  )
}

export default Feed
